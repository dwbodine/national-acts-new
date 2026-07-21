"use client";

import type { CSSProperties } from 'react';

type HomeTickerLogo =
  | {
      alt: string;
      height: number;
      href?: string;
      kind?: 'image';
      src: string;
      width: number;
    }
  | {
      alt: string;
      href: string;
      height: number;
      kind: 'mask';
      maskHeight: number;
      maskOffsetLeft?: number;
      maskOffsetTop: number;
      maskWidth: number;
      src: string;
      width: number;
    };

type HomeTickerProps = {
  className?: string;
  logoSetRepeats?: number;
};

const tickerLogos: HomeTickerLogo[] = [
  {
    alt: 'Ticketmaster',
    height: 54,
    src: 'images/ticker/ticketmaster.png',
    width: 250,
  },
  {
    alt: 'Live Nation',
    height: 72,
    src: 'images/ticker/ln-logo-white.svg',
    width: 276,
  },
  {
    alt: 'FM Music Management',
    height: 64,
    src: 'images/ticker/fm.png',
    width: 140,
  },
  {
    alt: 'BSA',
    height: 92,
    src: 'images/ticker/bsa.png',
    width: 92,
  },
  {
    alt: 'M7 Entertainment',
    height: 64,
    src: 'images/ticker/m7ent.png',
    width: 120,
  },
  {
    alt: 'Artist Worldwide Agency',
    height: 83,
    src: 'images/ticker/awa.png',
    width: 138,
  }
];

const renderTickerLogo = (logo: HomeTickerLogo, index: number, duplicate = false) => {
  const key = `${logo.alt}-${duplicate ? 'copy' : 'base'}-${index}`;
  const itemStyle = {
    height: logo.height,
    width: logo.width,
  } as CSSProperties;

  if (logo.kind === 'mask') {
    const maskStyle = {
      height: logo.height,
      ['--home-ticker-mask-image' as string]: `url('${logo.src}')`,
      ['--home-ticker-mask-height' as string]: `${logo.maskHeight}px`,
      ['--home-ticker-mask-offset-left' as string]: `${logo.maskOffsetLeft ?? 0}px`,
      ['--home-ticker-mask-offset-top' as string]: `${logo.maskOffsetTop}px`,
      ['--home-ticker-mask-width' as string]: `${logo.maskWidth}px`,
      width: logo.width,
    } as CSSProperties;

    const mask = (
      <span className="home-ticker__mask" style={maskStyle} />
    );

    return logo.href ? (
      <a key={key} className="home-ticker__item" href={logo.href} style={itemStyle}>
        {mask}
      </a>
    ) : (
      <span key={key} className="home-ticker__item" style={itemStyle}>
        {mask}
      </span>
    );
  }

  const image = (
    <img
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      loading="eager"
      decoding="async"
    />
  );

  return logo.href ? (
    <a key={key} className="home-ticker__item" href={logo.href} style={itemStyle}>
      {image}
    </a>
  ) : (
    <span key={key} className="home-ticker__item" style={itemStyle}>
      {image}
    </span>
  );
};

export default function HomeTicker({ className, logoSetRepeats = 1 }: HomeTickerProps) {
  const wrapperClassName = ['home-ticker', className].filter(Boolean).join(' ');
  const normalizedLogoSetRepeats = Math.max(1, Math.floor(logoSetRepeats));
  const repeatedTickerLogos = Array.from(
    { length: normalizedLogoSetRepeats },
    () => tickerLogos,
  ).flat();
  const trackStyle = {
    ['--home-ticker-logo-set-repeats' as string]: normalizedLogoSetRepeats,
  } as CSSProperties;

  return (
    <section className={wrapperClassName} aria-label="Trusted by">
      <p className="home-ticker__label">Trusted by</p>
      <div className="home-ticker__viewport">
        <div className="home-ticker__track" style={trackStyle}>
          <div className="home-ticker__group">
            {repeatedTickerLogos.map((logo, index) => renderTickerLogo(logo, index))}
          </div>
          <div className="home-ticker__group" aria-hidden="true">
            {repeatedTickerLogos.map((logo, index) => renderTickerLogo(logo, index, true))}
          </div>
        </div>
      </div>
    </section>
  );
}
