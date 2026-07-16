import Link from 'next/link';

type ConcertExperiencesProps = {
  className?: string;
  hidden?: boolean;
};

const maskA = '/images/vipexperience_maskA.svg';
const maskB = '/images/vipexperience_maskB.png';

export default function ConcertExperiences({ className, hidden }: ConcertExperiencesProps) {
  const sectionClassName = ['concert-experiences', className].filter(Boolean).join(' ');

  return (
    <section hidden={hidden} className={sectionClassName} aria-labelledby="concert-experiences-title">
      <span
        className="concert-experiences__texture"
        style={
          {
            ['--concert-experiences-mask-a' as string]: `url('${maskA}')`,
            ['--concert-experiences-mask-b' as string]: `url('${maskB}')`,
          } as React.CSSProperties
        }
        aria-hidden="true"
      />
      <span className="concert-experiences__ring concert-experiences__ring--outer" aria-hidden="true" />
      <span className="concert-experiences__ring concert-experiences__ring--middle" aria-hidden="true" />
      <span className="concert-experiences__ring concert-experiences__ring--inner" aria-hidden="true" />
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
