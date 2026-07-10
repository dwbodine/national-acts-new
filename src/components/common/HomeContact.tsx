'use client';

import { FormEvent, useEffect, useState } from 'react';
import { EmailMessage } from '@/types/public';
import { GetContactMessageResponse } from '@/types/responses';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useSendContactEmail } from '@/hooks/useSendContactEmail';

type HomeContactProps = {
  className?: string;
  dialogRequest?: HomeContactDialogRequest;
};

export type HomeContactConversationType =
  | 'Start a Conversation'
  | 'Request a VIP Overview'
  | 'Let\'s Talk B2B'
  | 'Start a Conversation B2B';

export type HomeContactDialogRequest = {
  id: number;
  type: HomeContactConversationType;
};

const countryOptions = [
  { label: 'United States', value: '+1' },
  { label: 'Canada', value: '+1 Canada' },
  { label: 'United Kingdom', value: '+44' },
  { label: 'Australia', value: '+61' },
  { label: 'Other', value: 'Other' },
];

const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default function HomeContact({ className, dialogRequest }: HomeContactProps) {
  const wrapperClassName = ['home-contact', className].filter(Boolean).join(' ');
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { sendContactEmail } = useSendContactEmail();

  const [showDialog, setShowDialog] = useState(false);
  const [conversationType, setConversationType] =
    useState<HomeContactConversationType>('Start a Conversation');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (dialogRequest) {
      setConversationType(dialogRequest.type);
      setShowDialog(true);
    }
  }, [dialogRequest]);

  const closeDialog = () => {
    if (!isSubmitting) {
      setShowDialog(false);
    }
  };

  const validateForm = () => {
    if (!fullName.trim()) {
      toast.warning('Full name is required');
      return false;
    }

    if (!organization.trim()) {
      toast.warning('Artist/Organization is required');
      return false;
    }

    if (!email.trim()) {
      toast.warning('Email is required');
      return false;
    }

    if (!validateEmail(email)) {
      toast.warning('Must enter a valid email address');
      return false;
    }

    if (!countryCode || !phone.trim()) {
      toast.warning('Phone is required');
      return false;
    }

    if (!message.trim()) {
      toast.warning('Message is required');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFullName('');
    setOrganization('');
    setEmail('');
    setCountryCode('');
    setPhone('');
    setMessage('');
  };

  const sendMessage = async () => {
    const contactEmail = `${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`;
    const htmlMsg = [
      '<html><body>',
      `<p><b>Inquiry type:</b> ${conversationType}</p>`,
      `<p><b>Full name:</b> ${fullName}</p>`,
      `<p><b>Artist/Organization:</b> ${organization}</p>`,
      `<p><b>Email:</b> ${email}</p>`,
      `<p><b>Phone:</b> ${countryCode} ${phone}</p>`,
      `<p><b>Message:</b> ${message}</p>`,
      '</body></html>',
    ].join('');

    const emailMsg: EmailMessage = {
      fromName: 'National Acts VIP',
      html: htmlMsg,
      replyTo: email,
      replyToName: fullName,
      subject: `${conversationType} - ${fullName} - ${email}`,
      to: contactEmail,
      toName: 'National Acts VIP',
    };

    const response: GetContactMessageResponse = await sendContactEmail(emailMsg);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success('Thanks. We received your message.');
    resetForm();
    setShowDialog(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!executeRecaptcha) {
      toast.error('Unable to verify sender');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await executeRecaptcha('home_contact');
      const res = await fetch('/api/verify-recaptcha', {
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
      const data = await res.json();

      if (data.success) {
        await sendMessage();
      } else {
        toast.error('Unable to verify sender');
      }
    } catch {
      toast.error('Unable to send your message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={wrapperClassName} aria-labelledby="home-contact-title">
      <Modal
        show={showDialog}
        onHide={closeDialog}
        centered
        dialogClassName="home-contact-dialog"
        contentClassName="home-contact-dialog__content"
      >
        <Modal.Body className="home-contact-dialog__body">
          <button
            className="home-contact-dialog__close"
            type="button"
            onClick={closeDialog}
            aria-label="Close contact form"
          >
            &times;
          </button>

          <h3 className="home-contact-dialog__title">
            Let&apos;s Talk Through What Makes Sense
          </h3>

          <form className="home-contact-dialog__form" onSubmit={handleSubmit}>
            <div className="home-contact-dialog__field">
              <label htmlFor="home-contact-full-name">Full name</label>
              <input
                id="home-contact-full-name"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.currentTarget.value)}
                required
              />
            </div>

            <div className="home-contact-dialog__field">
              <label htmlFor="home-contact-organization">Artist/Organization</label>
              <input
                id="home-contact-organization"
                type="text"
                value={organization}
                onChange={(event) => setOrganization(event.currentTarget.value)}
                required
              />
            </div>

            <div className="home-contact-dialog__field">
              <label htmlFor="home-contact-email">Email</label>
              <input
                id="home-contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                required
              />
            </div>

            <div className="home-contact-dialog__phone">
              <div className="home-contact-dialog__field">
                <label htmlFor="home-contact-country">Phone</label>
                <select
                  id="home-contact-country"
                  value={countryCode}
                  onChange={(event) => setCountryCode(event.currentTarget.value)}
                  required
                >
                  <option value="">Select country</option>
                  {countryOptions.map((country) => (
                    <option key={country.label} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="home-contact-dialog__field home-contact-dialog__field--phone-number">
                <label className="visually-hidden" htmlFor="home-contact-phone">
                  Phone number
                </label>
                <input
                  id="home-contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.currentTarget.value)}
                  required
                />
              </div>
            </div>

            <div className="home-contact-dialog__field">
              <label htmlFor="home-contact-message">Message</label>
              <textarea
                id="home-contact-message"
                value={message}
                onChange={(event) => setMessage(event.currentTarget.value)}
                required
              />
            </div>

            <button
              className="home-contact-dialog__submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send now'}
            </button>
            <p className="home-contact-dialog__recaptcha-disclosure">
              This site is protected by reCAPTCHA and the Google{' '}
              <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
              <a href="https://policies.google.com/terms">Terms of Service</a> apply.
            </p>
          </form>
        </Modal.Body>
      </Modal>
    </section>
  );
}
