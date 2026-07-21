import Link from 'next/link';
import { MouseEvent } from 'react';
import Script from 'next/script';

type TouringRealityProps = {
  className?: string;
  howWeWorkHref?: string;
  onConversationClick?: () => void;
};

export default function TouringReality({
  className,
  howWeWorkHref = '/one-pager',
  onConversationClick,
}: TouringRealityProps) {
  const wrapperClassName = ['touring-reality', className].filter(Boolean).join(' ');

  const handleConversationClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onConversationClick) {
      return;
    }

    event.preventDefault();
    onConversationClick();
  };

  return (
    <section className={wrapperClassName} aria-labelledby="touring-reality-title">
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <div className="touring-reality__copy">
        <p className="touring-reality__eyebrow">
          Flexible by design. Built to work whether it&apos;s one show or an entire run.
        </p>
        <h2 className="touring-reality__title" id="touring-reality-title">
          <span className="touring-reality__title-desktop">
            Built for Touring Reality
          </span>
          <span className="touring-reality__title-mobile">
            VIP, Built for Touring Reality
          </span>
        </h2>
        <p className="touring-reality__description">
          National Acts designs and operates VIP experiences for artists, managers, and
          agents&mdash;across tours, venues, and global markets.
        </p>
      </div>

      <div className="touring-reality__actions">
        <Link
          className="touring-reality__button touring-reality__button--primary"
          href="#"
          onClick={handleConversationClick}
        >
          <span className="touring-reality__cta-desktop">Start a Conversation</span>
          <span className="touring-reality__cta-mobile">Start a Conversation</span>
        </Link>
        <Link
          className="touring-reality__button touring-reality__button--secondary"
          href={howWeWorkHref}
        >
          How We Work
        </Link>
      </div>
    </section>
  );
}
