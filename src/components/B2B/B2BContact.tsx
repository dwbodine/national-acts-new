'use client';

import { FormEvent, useEffect, useState } from 'react';
import { EmailMessage } from '@/types/public';
import { GetContactMessageResponse } from '@/types/responses';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useSendContactEmail } from '@/hooks/useSendContactEmail';

type B2BContactProps = {
  className?: string;
  dialogRequest?: B2BContactDialogRequest;
};

export type B2BContactConversationType =
  | 'Let\'s Talk B2B'
  | 'Start a Conversation B2B';

export type B2BContactDialogRequest = {
  id: number;
  type: B2BContactConversationType;
};

const roleOptions = [
  'Artist',
  'Manager',
  'Management Company',
  'Agent',
  'Label',
  'Other',
];

const annualShowOptions = [
  'Under 25',
  '25–50',
  '50–100',
  '100+',
  'Touring is still being planned',
];

const vipExperienceOptions = [
  'Yes — We manage them in-house',
  'Yes — We work with another company',
  "No — We'd like to start offering VIPs",
];

const decisionTimelineOptions = [
  'Immediately',
  '2-3 weeks',
  '60 - 90 days',
  'Within the year',
  'Not sure, just want to learn more',
];

const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default function B2BContact({ className, dialogRequest }: B2BContactProps) {
  const wrapperClassName = ['b2b-contact', className].filter(Boolean).join(' ');
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { sendContactEmail } = useSendContactEmail();

  const [showDialog, setShowDialog] = useState(false);
  const [conversationType, setConversationType] =
    useState<B2BContactConversationType>('Start a Conversation B2B');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [annualShows, setAnnualShows] = useState('');
  const [vipExperiences, setVipExperiences] = useState('');
  const [decisionTimeline, setDecisionTimeline] = useState('');
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
      toast.warning('Artist / Company name is required');
      return false;
    }

    if (!role) {
      toast.warning('Your role is required');
      return false;
    }

    if (!website.trim()) {
      toast.warning('Website / Social Media is required');
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

    if (!phone.trim()) {
      toast.warning('Phone is required');
      return false;
    }

    if (!annualShows) {
      toast.warning('Please select how many shows the artist performs each year');
      return false;
    }

    if (!vipExperiences) {
      toast.warning('Please select whether you currently offer VIP Experiences');
      return false;
    }

    if (!decisionTimeline) {
      toast.warning('Please select when you are looking to make a decision');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFullName('');
    setOrganization('');
    setRole('');
    setWebsite('');
    setEmail('');
    setPhone('');
    setAnnualShows('');
    setVipExperiences('');
    setDecisionTimeline('');
  };

  const sendMessage = async () => {
    const contactEmail = `${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`;
    const htmlMsg = [
      '<html><body>',
      `<p><b>Inquiry type:</b> ${conversationType}</p>`,
      `<p><b>Full name:</b> ${fullName}</p>`,
      `<p><b>Artist / Company Name:</b> ${organization}</p>`,
      `<p><b>Your Role:</b> ${role}</p>`,
      `<p><b>Website / Social Media:</b> ${website}</p>`,
      `<p><b>Best Email:</b> ${email}</p>`,
      `<p><b>Best phone number:</b> ${phone}</p>`,
      `<p><b>Shows performed each year:</b> ${annualShows}</p>`,
      `<p><b>Currently offers VIP Experiences:</b> ${vipExperiences}</p>`,
      `<p><b>Decision timeline:</b> ${decisionTimeline}</p>`,
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
    <section className={wrapperClassName} aria-labelledby="b2b-contact-title">
      <Modal
        show={showDialog}
        onHide={closeDialog}
        centered
        dialogClassName="b2b-contact-dialog"
        contentClassName="b2b-contact-dialog__content"
      >
        <Modal.Body className="b2b-contact-dialog__body">
          <button
            className="b2b-contact-dialog__close"
            type="button"
            onClick={closeDialog}
            aria-label="Close contact form"
          >
            &times;
          </button>

          <h3 className="b2b-contact-dialog__title">
            Let&apos;s Talk Through What Makes Sense
          </h3>

          <form className="b2b-contact-dialog__form" onSubmit={handleSubmit}>
            <div className="b2b-contact-dialog__field">
              <label htmlFor="b2b-contact-full-name">Full name</label>
              <input
                id="b2b-contact-full-name"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.currentTarget.value)}
                required
              />
            </div>

            <div className="b2b-contact-dialog__field">
              <label htmlFor="b2b-contact-organization">Artist / Company Name</label>
              <input
                id="b2b-contact-organization"
                type="text"
                value={organization}
                onChange={(event) => setOrganization(event.currentTarget.value)}
                required
              />
            </div>

            <div className="b2b-contact-dialog__field">
              <label htmlFor="b2b-contact-role">Your Role</label>
              <select id="b2b-contact-role" value={role} onChange={(event) => setRole(event.currentTarget.value)} required>
                <option value="">Select your role</option>
                {roleOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>

            <div className="b2b-contact-dialog__field">
              <label htmlFor="b2b-contact-website">Website / Social Media</label>
              <input
                id="b2b-contact-website"
                type="text"
                value={website}
                onChange={(event) => setWebsite(event.currentTarget.value)}
                required
              />
            </div>

            <div className="b2b-contact-dialog__field">
              <label htmlFor="b2b-contact-email">Best Email</label>
              <input
                id="b2b-contact-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                required
              />
            </div>

            <div className="b2b-contact-dialog__field">
              <label htmlFor="b2b-contact-phone">Best phone number (including country code)</label>
              <input id="b2b-contact-phone" type="tel" value={phone} onChange={(event) => setPhone(event.currentTarget.value)} required />
            </div>

            <div className="b2b-contact-dialog__field">
              <label htmlFor="b2b-contact-annual-shows">How many shows does this artist perform each year?</label>
              <select id="b2b-contact-annual-shows" value={annualShows} onChange={(event) => setAnnualShows(event.currentTarget.value)} required>
                <option value="">Select an answer</option>
                {annualShowOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>

            <div className="b2b-contact-dialog__field">
              <label htmlFor="b2b-contact-vip-experiences">Do you currently offer VIP Experiences?</label>
              <select id="b2b-contact-vip-experiences" value={vipExperiences} onChange={(event) => setVipExperiences(event.currentTarget.value)} required>
                <option value="">Select an answer</option>
                {vipExperienceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>

            <div className="b2b-contact-dialog__field">
              <label htmlFor="b2b-contact-decision-timeline">When are you looking to make a decision?</label>
              <select id="b2b-contact-decision-timeline" value={decisionTimeline} onChange={(event) => setDecisionTimeline(event.currentTarget.value)} required>
                <option value="">Select an answer</option>
                {decisionTimelineOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>

            <button
              className="b2b-contact-dialog__submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send now'}
            </button>
            <p className="b2b-contact-dialog__recaptcha-disclosure">
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
