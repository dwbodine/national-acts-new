type StartsProps = {
  className?: string;
};

const steps = [
  {
    description: 'We understand the artist, the tour, and what VIP should—and shouldn’t—be.',
    title: 'Align',
  },
  {
    description: 'Packages and logistics are shaped using proven structures, tailored as needed.',
    title: 'Build',
  },
  {
    description: 'We run point on VIP operations while your team runs the tour.',
    title: 'Execute',
  },
];

export default function Starts({ className }: StartsProps) {
  const wrapperClassName = ['b2b-starts', className].filter(Boolean).join(' ');

  return (
    <section className={wrapperClassName} aria-labelledby="b2b-starts-title">
      <header className="b2b-starts__header">
        <h2 className="b2b-starts__title" id="b2b-starts-title">
          How It Typically Starts
        </h2>
      </header>

      <div className="b2b-starts__process">
        <div className="b2b-starts__visual" aria-hidden="true">
          <img src="/images/b2b/starts.webp" alt="" />
        </div>

        <ol className="b2b-starts__steps">
          {steps.map((step, index) => (
            <li
              className={[
                'b2b-starts__step',
                index === 0 ? 'b2b-starts__step--active' : null,
              ]
                .filter(Boolean)
                .join(' ')}
              key={step.title}
            >
              <span className="b2b-starts__node" aria-hidden="true" />
              <article className="b2b-starts__card">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            </li>
          ))}
        </ol>

        <p className="b2b-starts__note">
          The details get worked out in conversation—not buried on a webpage.
        </p>
      </div>
    </section>
  );
}
