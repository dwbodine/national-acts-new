type FocusProps = {
  className?: string;
};

export default function Focus({ className }: FocusProps) {
  const wrapperClassName = ['b2b-focus', className].filter(Boolean).join(' ');

  return (
    <section className={wrapperClassName} aria-labelledby="b2b-focus-title">
      <header className="b2b-focus__header">
        <h2 className="b2b-focus__title" id="b2b-focus-title">
          We Handle the Details. You Focus on the Show.
        </h2>
        <p className="b2b-focus__description">
          National Acts operates the full VIP lifecycle—from setup through execution—so your
          team isn&apos;t managing logistics, fan communication, payments, or edge cases on the
          road.
        </p>
      </header>

      <div className="b2b-focus__content">
        <div className="b2b-focus__visual" aria-hidden="true">
          <img src="/images/b2b/focus-crowd.webp" alt="" />
        </div>

        <div className="b2b-focus__details">
          <h3 className="b2b-focus__details-title">At a high level, that includes:</h3>
          <ul className="b2b-focus__list">
            <li>
              <p>
                <strong>VIP experience</strong> design and package strategy
              </p>
            </li>
            <li>
              <p>
                <strong>Ticketing and VIP integrations</strong> with major platforms
              </p>
            </li>
            <li>
              <p>
                <strong>Secure</strong> payments, fraud <strong>protection</strong>, and customer{' '}
                <strong>support</strong>
              </p>
            </li>
            <li>
              <p>
                Fan <strong>communication</strong>, <strong>check-in</strong>, and{' '}
                <strong>on-site</strong> workflows
              </p>
            </li>
            <li>
              <p>
                Venue <strong>coordination</strong> and show-day <strong>alignment</strong>
              </p>
            </li>
            <li>
              <p>
                <strong>Visibility</strong>, <strong>reporting</strong>, and post-show{' '}
                <strong>follow-through</strong>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
