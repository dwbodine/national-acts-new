import Link from 'next/link';
import { MouseEvent } from 'react';

type TouringRealityProps = {
  className?: string;
  howWeWorkHref?: string;
  onLetsTalkClick?: () => void;
};

export default function TouringReality({
  className,
  howWeWorkHref = '#how-we-work',
  onLetsTalkClick,
}: TouringRealityProps) {
  const wrapperClassName = ['touring-reality', className].filter(Boolean).join(' ');

  const handleLetsTalkClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (!onLetsTalkClick) {
          return;
        }
    
        event.preventDefault();
        onLetsTalkClick();
      };

  return (
    <section className={wrapperClassName} aria-labelledby="touring-reality-title">
      <div className="touring-reality__copy">
        <p className="touring-reality__eyebrow">
          Flexible by design. Built to work whether it&apos;s one show or an entire run.
        </p>
        <h2 className="touring-reality__title" id="touring-reality-title">
          <span className="touring-reality__title-desktop">Built for Touring Reality</span>
          <span className="touring-reality__title-mobile">VIP, Built for Touring Reality</span>
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
          onClick={handleLetsTalkClick}
        >
          <span className="touring-reality__cta-desktop">Let&apos;s Talk</span>
          <span className="touring-reality__cta-mobile">Start a Conversation</span>
        </Link>
        <Link hidden={true}
          className="touring-reality__button touring-reality__button--secondary"
          href={howWeWorkHref}
        >
          How We Work
        </Link>
      </div>
    </section>
  );
}
