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
              <strong>VIP experience</strong>&nbsp;design and package strategy
            </li>
            <li>
              <strong>Ticketing and VIP integrations</strong>&nbsp;with major platforms
            </li>
            <li>
              <strong>Secure</strong>&nbsp;payments, fraud <strong>&nbsp;protection</strong>, and customer&nbsp;
              <strong>support</strong>
            </li>
            <li>
              Fan&nbsp;<strong>communication</strong>,&nbsp;<strong>check-in</strong>, and&nbsp;
              <strong>on-site</strong>&nbsp;workflows
            </li>
            <li>
              Venue&nbsp;<strong>coordination</strong>&nbsp;and show-day&nbsp;<strong>alignment</strong>
            </li>
            <li>
              <strong>Visibility</strong>,&nbsp;<strong>reporting</strong>, and post-show&nbsp;
              <strong>follow-through</strong>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
