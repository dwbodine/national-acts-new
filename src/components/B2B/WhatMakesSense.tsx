import Link from 'next/link';
import { MouseEvent } from 'react';

type CalendlyWindow = Window & {
  Calendly?: {
    initPopupWidget: (options: { url: string }) => void;
  };
};

type WhatMakesSenseProps = {
  className?: string;
  overviewHref?: string;
  onConversationClick?: () => void;
  calendlyUrl?: string;
};

export default function WhatMakesSense({
  className,
  overviewHref = '/one-pager',
  onConversationClick,
  calendlyUrl = 'https://calendly.com/tj-nationalactsvip/30min',
}: WhatMakesSenseProps) {
  const wrapperClassName = ['what-makes-sense', className].filter(Boolean).join(' ');

  const handleDemoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const calendly = (window as CalendlyWindow).Calendly;

    if (calendly) {
      event.preventDefault();
      calendly.initPopupWidget({ url: calendlyUrl });
    }
  };

  const handleConversationClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onConversationClick) {
      return;
    }

    event.preventDefault();
    onConversationClick();
  };

  return (
    <section className={wrapperClassName} aria-labelledby="what-makes-sense-title">
      <div className="what-makes-sense__graphics" aria-hidden="true">
        <span className="what-makes-sense__ring what-makes-sense__ring--outer" />
        <span className="what-makes-sense__ring what-makes-sense__ring--middle" />
        <span className="what-makes-sense__ring what-makes-sense__ring--inner" />
        <img src="/images/b2b/what-makes-sense-logo.webp" alt="" />
      </div>

      <div className="what-makes-sense__inner">
        <header className="what-makes-sense__header">
          <h2 className="what-makes-sense__title" id="what-makes-sense-title">
            Let&apos;s Talk Through What Makes Sense
          </h2>
          <div className="what-makes-sense__description">
            <p>Every tour is different. Every artist is different.</p>
            <p>We&apos;d rather have a real conversation than oversell a solution.</p>
          </div>
        </header>

        <div className="what-makes-sense__actions">
          <Link
            className="what-makes-sense__button what-makes-sense__button--primary"
            href="#"
            onClick={handleConversationClick}
          >
            Start a Conversation
          </Link>
          <Link
            className="what-makes-sense__button what-makes-sense__button--secondary"
            href={overviewHref}
          >
            How We Work
          </Link>
          <Link
            className="what-makes-sense__button what-makes-sense__button--secondary"
            href={calendlyUrl}
            onClick={handleDemoClick}
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
