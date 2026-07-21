import Link from 'next/link';

type ConcertExperiencesProps = {
  className?: string;
  hidden?: boolean;
};

export default function ConcertExperiences({ className, hidden }: ConcertExperiencesProps) {
  const sectionClassName = ['concert-experiences', className].filter(Boolean).join(' ');

  return (
    <section hidden={hidden} className={sectionClassName} aria-labelledby="concert-experiences-title">
      <div className="concert-experiences__graphics" aria-hidden="true">
        <span className="concert-experiences__ring concert-experiences__ring--outer" />
        <span className="concert-experiences__ring concert-experiences__ring--middle" />
        <span className="concert-experiences__ring concert-experiences__ring--inner" />
        <img src="/images/b2b/what-makes-sense-logo.webp" alt="" />
      </div>
      <span className="concert-experiences__fade" aria-hidden="true" />

      <div className="concert-experiences__content">
        <h2 className="concert-experiences__title" id="concert-experiences-title">
          Bring Your Concert Experience to Life
        </h2>
        <Link className="concert-experiences__button" href="/events">
          Find VIP Experiences
        </Link>
      </div>
    </section>
  );
}
