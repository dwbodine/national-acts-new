"use client";

import Link from 'next/link';

type WhyUsProps = {
  className?: string;
};

type WhyUsStep = {
  active?: boolean;
  label: string;
};

const whyUsShowcaseImage = '/images/whyus.png';

const whyUsSteps: WhyUsStep[] = [
  {
    active: true,
    label: 'Pick Your Artist & Show',
  },
  {
    label: 'Select your VIP Experience',
  },
  {
    label: 'Receive your VIP itinerary',
  },
  {
    label: 'Prepare for the show',
  },
];

export default function WhyUs({ className }: WhyUsProps) {
  const wrapperClassName = ['why-us', className].filter(Boolean).join(' ');

  return (
    <section className={wrapperClassName} aria-labelledby="why-us-title">
      <div className="why-us__inner">
        <div className="why-us__copy">
          <h2 className="why-us__title" id="why-us-title">
            Why VIP Through Us
          </h2>
          <p className="why-us__description">
            We&apos;re the bridge between fans, artists, and world-class venues - delivering
            secure access, curated experiences, and exceptional service every step of the way.
          </p>
        </div>

        <div className="why-us__showcase">
          <div className="why-us__showcase-panel">
            <div className="why-us__timeline" aria-label="How it works">
              <div className="why-us__timeline-line" aria-hidden="true" />
              {whyUsSteps.map((step) => (
                <div key={step.label} className="why-us__step-row">
                  <span
                    className={[
                      'why-us__step-node',
                      step.active ? 'why-us__step-node--active' : null,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-hidden="true"
                  />
                  <div className="why-us__step-card">
                    <p className="why-us__step-label">{step.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="why-us__visual" aria-hidden="true">
              <img className="why-us__visual-image" src={whyUsShowcaseImage} alt="" />
            </div>
          </div>

          <div className="why-us__actions">
            <Link className="why-us__button" href="/events">
              Browse all Events
              <span className="why-us__button-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
            <p className="why-us__footnote">
              *Most VIP packages do not include a ticket to the show. Tickets are sold
              separately unless otherwise noted.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
