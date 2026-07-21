"use client";

import Link from 'next/link';

type MomentCard = {
  alt: string;
  backgroundImage: string;
  foregroundImage: string;
  foregroundHeight: number;
  foregroundWidth: number;
};

type HomeMomentsProps = {
  className?: string;
};

const momentsCards: MomentCard[] = [
  {
    alt: 'Testament',
    backgroundImage: 'images/moments/testament_bg.jpg',
    foregroundHeight: 430,
    foregroundImage: 'images/moments/testament_fg.jpg',
    foregroundWidth: 322.5,
  },
  {
    alt: 'Orpheum',
    backgroundImage: 'images/moments/orpheum_bg.jpg',
    foregroundHeight: 479,
    foregroundImage: 'images/moments/orpheum_fg.jpg',
    foregroundWidth: 498.562,
  },
  {
    alt: 'Lord of the Lost',
    backgroundImage: 'images/moments/lordofthelost_bg.jpg',
    foregroundHeight: 429,
    foregroundImage: 'images/moments/lordofthelost_fg.jpg',
    foregroundWidth: 644.171,
  },
  {
    alt: 'Exodus',
    backgroundImage: 'images/moments/exodus_bg.jpg',
    foregroundHeight: 512,
    foregroundImage: 'images/moments/exodus_fg.jpg',
    foregroundWidth: 683.933,
  },
  {
    alt: 'Exodus',
    backgroundImage: 'images/moments/exodus2_bg.jpg',
    foregroundHeight: 564,
    foregroundImage: 'images/moments/exodus2_fg.jpg',
    foregroundWidth: 752,
  },
  {
    alt: 'Lord of the Lost',
    backgroundImage: 'images/moments/lordofthelost2_bg.jpg',
    foregroundHeight: 960,
    foregroundImage: 'images/moments/lordofthelost2_fg.jpg',
    foregroundWidth: 1440,
  },
  {
    alt: 'Death to All',
    backgroundImage: 'images/moments/deathtoall_bg.jpg',
    foregroundHeight: 620,
    foregroundImage: 'images/moments/deathtoall_fg.jpg',
    foregroundWidth: 826.667,
  },
  {
    alt: 'Testament',
    backgroundImage: 'images/moments/testament3_bg.jpg',
    foregroundHeight: 496,
    foregroundImage: 'images/moments/testament3_fg.jpg',
    foregroundWidth: 372,
  },
];

export default function HomeMoments({ className }: HomeMomentsProps) {
  const wrapperClassName = ['moments', className].filter(Boolean).join(' ');

  return (
    <section className={wrapperClassName} aria-labelledby="moments-title">
      <span className="moments__orb moments__orb--left" aria-hidden="true" />
      <span className="moments__orb moments__orb--right" aria-hidden="true" />
      <span className="moments__ring moments__ring--inner" aria-hidden="true" />
      <span className="moments__ring moments__ring--outer" aria-hidden="true" />

      <div className="moments__inner">
        <div className="moments__header">
          <h2 className="moments__title" id="moments-title">
            Real Fans. Real Moments.
          </h2>
          <p className="moments__description">
            From backstage hangs to front-row access- see what VIP looks like.
          </p>
        </div>

        <div className="moments__grid">
          {momentsCards.map((card) => (
            <article key={card.foregroundImage} className="moments__card">
              <img
                className="moments__card-image moments__card-image--background"
                src={card.backgroundImage}
                alt={card.alt}
              />
              <img
                className="moments__card-image moments__card-image--foreground"
                src={card.foregroundImage}
                alt=""
                aria-hidden="true"
                style={{
                  height: `${card.foregroundHeight}px`,
                  width: `${card.foregroundWidth}px`,
                }}
              />
              <div className="moments__card-overlay" aria-hidden="true" />
            </article>
          ))}
          <div className="moments__grid-fade" aria-hidden="true" />
        </div>

        <Link className="moments__button" href="/moments">
          Explore fan moments
        </Link>
      </div>
    </section>
  );
}
