"use client";

import Link from 'next/link';

type HeroHeadlineProps = {
  className?: string;
  description?: string;
  eyebrow?: string;
  title?: string;
};

export default function HeroHeadline({
  className
}: HeroHeadlineProps) {
  const wrapperClassName = ['hero-headline', className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassName}>
      <div className="hero-headline__copy" data-name="Headline">
        <p className="hero-headline__eyebrow">
          Official VIP Access to the Artists you love
        </p>
        <h1 className="hero-headline__title">
          Authentic, verified VIP experiences with guaranteed access.
        </h1>
      </div>

      <p className="hero-headline__description">
        Skip the uncertainty. Book secure, legitimate VIP experiences backed by artist partnerships and industry leaders.
      </p>

      <div className="hero-headline__actions" data-name="Button">
        <Link
          className="hero-headline__button hero-headline__button--primary"
          href="/events"
        >
          Browse VIP Experiences
        </Link>
        <Link
          className="hero-headline__button hero-headline__button--secondary"
          href="/my-account"
        >
          My VIPs
        </Link>
      </div>
    </div>
  );
}
