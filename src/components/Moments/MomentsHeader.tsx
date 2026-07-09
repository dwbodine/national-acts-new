"use client";

type MomentsHeaderProps = {
  className?: string;
  description?: string;
  title?: string;
  titleId?: string;
  caption?: string;
};

export default function MomentsHeader({
  className,
  description = 'From backstage hangs to front-row access- see what VIP looks like.',
  title = 'Real Fans. Real Moments.',
  titleId = 'fan-moments-title',
  caption = 'Click on an artist logo to continue'
}: MomentsHeaderProps) {
  const wrapperClassName = ['fan-moments__header', className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassName}>
      <h2 className="fan-moments__title" id={titleId}>
        {title}
      </h2>
      <p className="fan-moments__description">{description}</p>
      <p className="fan-moments__caption">{caption}</p>
    </div>
  );
}
