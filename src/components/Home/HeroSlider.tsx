'use client';

import { setFeaturedArtists, setReloadFeaturedArtists } from '@/lib/globalSelectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GetFeaturedArtistsResponse } from '@/types/responses';
import { RootState } from '@/lib/store';
import { useEffect } from 'react';
import { useGetFeaturedArtists } from '@/hooks/useGetFeaturedArtists';

type HeroSliderCard = {
  backgroundImage: string;
  logoImage: string;
  modifier: string;
  title: string;
  href: string;
};

type HeroSliderProps = {
  className?: string;
};

const rowDirections = ['up', 'down', 'up'] as const;
const rowModifiers = ['left', 'middle', 'right'] as const;

const HeroSliderCard = ({ card }: { card: HeroSliderCard }) => (
  <div className={`hero-slider__card ${card.modifier}`}>
    <a href={card.href} title={card.title}>
      <img className="hero-slider__image" src={card.backgroundImage} alt={card.title} />
      <img className="hero-slider__logo" src={card.logoImage} alt="" aria-hidden="true" />
    </a>
  </div>
);

export default function HeroSlider({ className }: HeroSliderProps) {
  const wrapperClassName = ['hero-slider', className].filter(Boolean).join(' ');
  const globalSelection = useSelector((state: RootState) => state.globalSelection);
  const dispatch = useDispatch();
  const { getFeaturedArtists } = useGetFeaturedArtists();
  let heroSliderRows: HeroSliderCard[][] = [];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!globalSelection.featuredArtists && globalSelection.reloadFeaturedArtists) {
        dispatch(setReloadFeaturedArtists(false));
        getFeaturedArtists().then((response: GetFeaturedArtistsResponse) => {
          if (response.featuredArtists && !response.error) {
            dispatch(setFeaturedArtists(response.featuredArtists));
          }
        });
      }
    }, 250);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    dispatch,
    getFeaturedArtists,
    globalSelection.featuredArtists,
    globalSelection.reloadFeaturedArtists,
  ]);

  if (globalSelection.featuredArtists && globalSelection.featuredArtists.length > 0) {
    const heroSliderCards = globalSelection.featuredArtists.map((artist, index) => ({
      backgroundImage: artist.backgroundImage
        ? `${process.env.NEXT_PUBLIC_FEATURED_ARTISTS_URL}${artist.backgroundImage}`
        : `${process.env.NEXT_PUBLIC_PREVIEW_URL}${artist.previewImage}`,
      href: artist.href,
      logoImage: `${process.env.NEXT_PUBLIC_LOGOS_URL}${artist.logoImage}`,
      modifier: `hero-slider__card--${index + 1}`,
      title: artist.title,
    }));

    heroSliderRows = [
      heroSliderCards.filter((_, index) => index % 3 === 0),
      heroSliderCards.filter((_, index) => index % 3 === 1),
      heroSliderCards.filter((_, index) => index % 3 === 2),
    ];
  }

  return (
    <div className={wrapperClassName} aria-label="Featured artists">
      <div className="featured-artists__title">
        <h2>Featured artists</h2>
      </div>
      {heroSliderRows.length &&
        heroSliderRows.map((row, rowIndex) => (
          <div
            key={rowModifiers[rowIndex]}
            className={`hero-slider__row hero-slider__row--${rowModifiers[rowIndex]} ${rowDirections[rowIndex]}`}
          >
            <div className="hero-slider__track">
              <div className="hero-slider__set">
                {row.map((card) => (
                  <HeroSliderCard key={card.modifier} card={card} />
                ))}
              </div>
              <div
                className="hero-slider__set hero-slider__set--duplicate"
                aria-hidden="true"
              >
                {row.map((card) => (
                  <HeroSliderCard key={`${card.modifier}-duplicate`} card={card} />
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
