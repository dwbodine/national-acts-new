import Link from 'next/link';

type TouringRealityProps = {
  className?: string;
  howWeWorkHref?: string;
  letsTalkHref?: string;
};

export default function TouringReality({
  className,
  howWeWorkHref = '#how-we-work',
  letsTalkHref = '/contact',
}: TouringRealityProps) {
  const wrapperClassName = ['touring-reality', className].filter(Boolean).join(' ');

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
          href={letsTalkHref}
        >
          <span className="touring-reality__cta-desktop">Let&apos;s Talk</span>
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
