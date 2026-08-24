'use client';

import {
  LuArrowRight,
  LuCircleAlert,
  LuClock3,
  LuMail,
  LuMessageCircle,
  LuSend,
} from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { EmailMessage } from '@/types/public';
import { GetContactMessageResponse } from '@/types/responses';
import Link from 'next/link';
import { PageProps } from '@/types/props';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useSendContactEmail } from '@/hooks/useSendContactEmail';

export default function Contact({ page }: PageProps) {
  const [emailSent, setEmailSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [bandName, setBandName] = useState('');
  const [venue, setVenue] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');
  const { sendContactEmail } = useSendContactEmail();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const contactEmail = `${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`;

  useEffect(() => {
    document.title = page?.title;
  }, [page?.title]);

  const validateForm = () => {
    if (!name) {
      toast.warning('Name is required');
      return false;
    }
    if (!email) {
      toast.warning('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.warning('Must enter a valid email address');
      return false;
    }
    if (!subject) {
      toast.warning('Subject is required');
      return false;
    }
    if (!bandName) {
      toast.warning('Artist is required');
      return false;
    }
    if (!venue) {
      toast.warning('Venue is required');
      return false;
    }
    if (!eventDate) {
      toast.warning('Event date is required');
      return false;
    }
    if (!message) {
      toast.warning('Message is required');
      return false;
    }
    return true;
  };

  const sendMessage = async () => {
    if (!validateForm()) return;
    const html = `<html><body><p><b>Full name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Order number:</b> ${orderNumber || 'N/A'}</p><p><b>Artist:</b> ${bandName}</p><p><b>Subject:</b> ${subject}</p><p><b>Date of Event:</b> ${moment(eventDate).format('MM/DD/YYYY')}</p><p><b>Venue:</b> ${venue}</p><p><b>Message:</b> ${message}</p></body></html>`;
    const emailMsg: EmailMessage = {
      fromName: 'National Acts VIP',
      html,
      replyTo: email,
      replyToName: name,
      subject: `New Inquiry From - ${name} - ${email}`,
      to: contactEmail,
      toName: 'National Acts VIP',
    };
    const response: GetContactMessageResponse = await sendContactEmail(emailMsg);
    if (response.error) toast.error(response.error);
    else setEmailSent(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!executeRecaptcha) return;
    const token = await executeRecaptcha('contact');
    const response = await fetch('/api/verify-recaptcha', {
      body: JSON.stringify({ token }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    const data = await response.json();
    if (data.success) await sendMessage();
    else toast.error('Unable to verify sender');
  };

  return (
    <main className="contact-page">
      <header className="contact-page__hero">
        <div>
          <p className="contact-page__breadcrumb">
            Guest Support <span>/</span> Contact Us
          </p>
          <h1>Need a Hand?</h1>
          <p>
            We&apos;re here to help. Reach out and our support team will get back to you
            as soon as possible.
          </p>
        </div>
      </header>

      <div className="contact-page__layout" hidden={emailSent}>
        <aside className="contact-page__sidebar">
          <article className="contact-page__info-card">
            <span>
              <LuMail />
            </span>
            <h2>Contacting National Acts</h2>
            <p>
              Please note that all tickets and VIP packages are sold on a final-sale basis
              and are nonrefundable unless the event is canceled. Service fees are
              nonrefundable under all circumstances, including event cancellations. Refund
              requests for events that have not been canceled cannot be accommodated and
              will not receive a response.
            </p>
            <p>
              For more information on our refund policy,  <Link className="contact-link" href="/refunds/">click here</Link>
            </p>
            <p>
              <strong>
                For all other questions, please use the contact form on this page.
              </strong>
            </p>
          </article>
          <article className="contact-page__info-card">
            <span>
              <LuMessageCircle />
            </span>
            <h2>Before You Reach Out</h2>
            <p>
              Many questions are answered in our FAQ. Check there first for the fastest
              response.
            </p>
            <Link href="/faq">
              Browse FAQ <LuArrowRight />
            </Link>
          </article>
          <article className="contact-page__info-card">
            <span>
              <LuClock3 />
            </span>
            <h2>Response Times</h2>
            <p>
              We aim to respond to all inquiries within <strong>24-48 hours</strong>.
              During peak tour periods, response times may be slightly longer.
            </p>
          </article>
          <div className="contact-page__notice">
            <LuCircleAlert />
            <div>
              <strong>Need to resend a confirmation?</strong>
              <p>
                Include your name, last 4 digits of the card used, order ID, and the event
                name.
              </p>
            </div>
          </div>
        </aside>

        <form className="contact-page__form" onSubmit={handleSubmit}>
          <h2>Send Us a Message</h2>
          <div className="contact-page__fields">
            <label>
              Full Name *
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                required
              />
            </label>
            <label>
              Email Address *
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
                required
                type="email"
              />
            </label>
            <label>
              Order Number
              <input
                value={orderNumber}
                onChange={(event) => setOrderNumber(event.target.value)}
                placeholder="If applicable"
              />
            </label>
            <label>
              Subject *
              <select
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                required
              >
                <option value="">Select a subject</option>
                <option>VIP Package Question</option>
                <option>Ticket Question</option>
                <option>Order or Payment Issue</option>
                <option>Event Information</option>
                <option>Confirmation Request</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Artist *
              <input
                value={bandName}
                onChange={(event) => setBandName(event.target.value)}
                placeholder="If applicable"
                required
              />
            </label>
            <label>
              Venue *
              <input
                value={venue}
                onChange={(event) => setVenue(event.target.value)}
                placeholder="If applicable"
                required
              />
            </label>
            <label>
              Event Date *
              <input
                value={eventDate}
                onChange={(event) => setEventDate(event.target.value)}
                required
                type="date"
              />
            </label>
            <label className="contact-page__message">
              Message *
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Please provide as much detail as possible so we can help you quickly."
                required
                rows={6}
              />
            </label>
          </div>
          <button className="contact-page__submit" type="submit">
            <LuSend /> Send Message
          </button>
          <p className="recaptcha-disclosure">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
            <a href="https://policies.google.com/terms">Terms of Service</a> apply.
          </p>
        </form>
      </div>

      <section className="contact-page__success" hidden={!emailSent}>
        <span>
          <LuMail />
        </span>
        <h2>Message received</h2>
        <p>
          Thanks for reaching out. Our support team typically responds within 24-48 hours.
        </p>
        <Link href="/faq">Browse frequently asked questions</Link>
      </section>
    </main>
  );
}
