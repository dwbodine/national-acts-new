type TouringBenefit = {
  description: string;
  title: string;
};

type BuiltForTouringProps = {
  className?: string;
};

const benefits: TouringBenefit[] = [
  {
    description:
      'VIP experiences are shaped collaboratively, with clear boundaries and respect for the artist’s time, brand, and audience.',
    title: 'Artist-First by Design',
  },
  {
    description:
      'We work inside real touring workflows—no added chaos, no reinvention. Backed by 15+ years running VIP on the road, we know how these programs actually move from show to show.',
    title: 'Operationally Fluent',
  },
  {
    description:
      'Our team comes from the touring world itself. We’ve lived the pace, the pressure, and the trade-offs of life on the road—which is why our VIP programs are built around the artist’s real-world touring demands.',
    title: 'By Artists, For Artists',
  },
  {
    description:
      'Our model is built so the value stays where it belongs—with clear structures, no backend surprises, and no unnecessary layers.',
    title: 'Transparent, Artist-Forward Economics',
  },
];

export default function BuiltForTouring({ className }: BuiltForTouringProps) {
  const wrapperClassName = ['built-for-touring', className].filter(Boolean).join(' ');

  return (
    <section className={wrapperClassName} aria-labelledby="built-for-touring-title">
      <div className="built-for-touring__background" aria-hidden="true" />
      <div className="built-for-touring__inner">
        <header className="built-for-touring__header">
          <h2 className="built-for-touring__title" id="built-for-touring-title">
            Built for How Touring Actually Works
          </h2>
          <div className="built-for-touring__intro">
            <p>
              VIP isn&apos;t hard to imagine, it&apos;s hard to execute cleanly at scale—without
              creating friction for artists or touring staff.
            </p>
            <p>This is where National Acts comes in.</p>
          </div>
        </header>

        <div className="built-for-touring__benefits">
          {benefits.map((benefit) => (
            <article className="built-for-touring__card" key={benefit.title}>
              <h3 className="built-for-touring__card-title">{benefit.title}</h3>
              <p className="built-for-touring__card-description">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
