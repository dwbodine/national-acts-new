"use client";

import { toast } from 'react-toastify';
import { useState } from 'react';
import { userPostSubscriber } from '@/hooks/userPostSubscriber';

type EarlyAccessProps = {
  className?: string;
};

const earlyAccessImage =
  'images/early_access.jpg';

const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default function EarlyAccess({ className }: EarlyAccessProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addOrConfirmSubscriber } = userPostSubscriber(email);

  const wrapperClassName = ['early-access', className].filter(Boolean).join(' ');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      toast.warning('Email is required');
      return;
    }
    if (!validateEmail(normalizedEmail)) {
      toast.warning('Must enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    const subscriberResponse = await addOrConfirmSubscriber();

    if (subscriberResponse.success ) {
      if (subscriberResponse.subscriberId !== undefined && subscriberResponse.subscriberId > 0) {
        toast.success('Thank you for already being subscribed!');
      } else {
        toast.success('Thank you for subscribing!');
      }
      
      setEmail('');
    } else {
      toast.error(subscriberResponse.errorMessage || 'An error occurred while subscribing. Please try again later.');
    }

    setIsSubmitting(false); 
  };

  return (
    <section className={wrapperClassName} aria-labelledby="early-access-title">
      <span className="early-access__glow" aria-hidden="true" />
      <div className="early-access__card">
        <div className="early-access__image-wrap" aria-hidden="true">
          <img className="early-access__image" src={earlyAccessImage} alt="" />
          <div className="early-access__image-overlay" />
        </div>

        <div className="early-access__content">
          <div className="early-access__heading">
            <h2 className="early-access__title" id="early-access-title">
              <span className="early-access__title-strong">Be First to Know</span>
              <span className="early-access__title-light">VIP Early Access</span>
            </h2>
            <p className="early-access__description">
              Join the list and unlock <strong>exclusive early access</strong> plus a{' '}
              <strong>special VIP welcome offer</strong>.
              <br />
              <strong>Get early access</strong> to VIP packages before they go
              public.
            </p>
          </div>

          <form className="early-access__form" onSubmit={handleSubmit}>
            <label className="early-access__field" htmlFor="early-access-email">
              <span className="visually-hidden">Enter email address</span>
              <input
                id="early-access-email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={isSubmitting}
              />
            </label>
            <button className="early-access__button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Get Early Access'}
            </button>
          </form>

          <p className="early-access__footnote">
            Exclusive drops, show updates, and limited-run VIP offers.
          </p>
        </div>
      </div>
    </section>
  );
}
