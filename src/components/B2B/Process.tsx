type ProcessProps = {
  className?: string;
};

export default function Process({ className }: ProcessProps) {
  const wrapperClassName = ['b2b-process', className].filter(Boolean).join(' ');

  return (
    <section className={wrapperClassName} aria-label="Our process">
      <p className="b2b-process__statement">
        If it <span className="b2b-process__highlight">touches the fan</span> or{' '}
        <span className="b2b-process__highlight">shows up on show day</span>,
        <br className="b2b-process__line-break" /> it&apos;s already built into the process.
      </p>
    </section>
  );
}
