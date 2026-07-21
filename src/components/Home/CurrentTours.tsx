'use client';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { setReloadTours, setTours } from '@/lib/globalSelectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';
import { GetToursResponse } from '@/types/responses';
import Link from 'next/link';
import { RootState } from '@/lib/store';
import { Tour } from '@/types/public';
import { useGetTours } from '@/hooks/useGetTours';
import { useWindowSize } from '@/hooks/useWindowSize';

type CurrentTourCard = {
  alt: string;
  image: string;
  href?: string;
  modifier?: string;
  title: string;
};

type CurrentTourCarouselCard = {
  card: CurrentTourCard;
  duplicatePosition: 'leading' | 'none' | 'trailing';
  originalIndex: number;
};

type CurrentToursProps = {
  className?: string;
};

export default function CurrentTours({ className }: CurrentToursProps) {
  const windowSize = useWindowSize();
  const wrapperClassName = ['current-tours', className].filter(Boolean).join(' ');
  const globalSelection = useSelector((state: RootState) => state.globalSelection);
  const dispatch = useDispatch();
  const { getTours } = useGetTours();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeTourIndex, setActiveTourIndex] = useState(3);
  const [isAnimatingTours, setIsAnimatingTours] = useState(false);
  const [slideOffset, setSlideOffset] = useState(0);

  const SLIDES_PER_VIEW: number = 3;
  const SLIDES_PER_VIEW_MOBILE: number = 2;
  const SLIDES_PER_VIEW_MOBILE_SMALL: number = 1;

  useEffect(() => {
    if (globalSelection.reloadTours) {
      dispatch(setReloadTours(false));
      getTours().then((response: GetToursResponse) => {
        if (response.tours && !response.error) {
          dispatch(setTours(response.tours));
        }
      });
    }
  }, [dispatch, getTours, globalSelection.reloadTours]);

  const currentTourCards: CurrentTourCard[] = useMemo(
    () =>
      globalSelection.tours?.map((tour: Tour) => ({
        alt: tour.sellers?.map((seller) => seller.name).join('/') ?? '',
        href: tour.href ?? '',
        image: tour.coverImage
          ? tour.coverImage?.startsWith('http')
            ? tour.coverImage
            : `${process.env.NEXT_PUBLIC_PREVIEW_URL}${tour.coverImage}`
          : 'images/vipexperience_maskB.png',
        title: tour.sellers?.map((seller) => seller.name).join('/') ?? '',
      })) ?? [],
    [globalSelection.tours],
  );

  let slidesPerView: number = SLIDES_PER_VIEW;
  if (windowSize.width < 767) {
    slidesPerView = SLIDES_PER_VIEW_MOBILE_SMALL;
  } else if (windowSize.width < 991) {
    slidesPerView = SLIDES_PER_VIEW_MOBILE;
  }

  const visibleTourCount = Math.min(currentTourCards.length, slidesPerView);
  const canScrollTours = currentTourCards.length > visibleTourCount;
  const cloneTourCount = Math.min(currentTourCards.length, slidesPerView);
  const tourScrollStep = Math.min(currentTourCards.length, slidesPerView);
  const carouselTourCards = useMemo<CurrentTourCarouselCard[]>(() => {
    if (!currentTourCards.length) {
      return [];
    }

    const leadingCards = currentTourCards.slice(-cloneTourCount).map((card, index) => ({
      card,
      duplicatePosition: 'leading' as const,
      originalIndex: currentTourCards.length - cloneTourCount + index,
    }));
    const realCards = currentTourCards.map((card, originalIndex) => ({
      card,
      duplicatePosition: 'none' as const,
      originalIndex,
    }));
    const trailingCards = currentTourCards
      .slice(0, cloneTourCount)
      .map((card, originalIndex) => ({
        card,
        duplicatePosition: 'trailing' as const,
        originalIndex,
      }));

    return [...leadingCards, ...realCards, ...trailingCards];
  }, [cloneTourCount, currentTourCards]);

  useEffect(() => {
    setIsAnimatingTours(false);
    setActiveTourIndex(cloneTourCount);
  }, [cloneTourCount, currentTourCards.length]);

  useEffect(() => {
    const updateSlideOffset = () => {
      const track = trackRef.current;
      const card = track?.querySelector<HTMLElement>('.current-tours__card');

      if (!track || !card) {
        setSlideOffset(0);
        return;
      }

      const trackStyles = window.getComputedStyle(track);
      const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || '0');

      setSlideOffset(card.offsetWidth + gap);
    };

    updateSlideOffset();

    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(updateSlideOffset);

    if (trackRef.current) {
      resizeObserver?.observe(trackRef.current);
    }

    window.addEventListener('resize', updateSlideOffset);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateSlideOffset);
    };
  }, [carouselTourCards.length]);

  const handlePreviousTour = () => {
    if (!canScrollTours || isAnimatingTours) {
      return;
    }

    setIsAnimatingTours(true);
    setActiveTourIndex((currentIndex) => currentIndex - tourScrollStep);
  };

  const handleNextTour = () => {
    if (!canScrollTours || isAnimatingTours) {
      return;
    }

    setIsAnimatingTours(true);
    setActiveTourIndex((currentIndex) => currentIndex + tourScrollStep);
  };

  const handleTourTransitionEnd = () => {
    if (!canScrollTours) {
      return;
    }

    if (activeTourIndex >= currentTourCards.length + cloneTourCount) {
      setIsAnimatingTours(false);
      setActiveTourIndex(
        cloneTourCount + (activeTourIndex - currentTourCards.length - cloneTourCount),
      );
      return;
    }

    if (activeTourIndex < cloneTourCount) {
      setIsAnimatingTours(false);
      setActiveTourIndex(currentTourCards.length + activeTourIndex);
      return;
    }

    setIsAnimatingTours(false);
  };

  return (
    <section className={wrapperClassName}>
      <div className="current-tours__inner">
        <div className="current-tours__header">
          <h2 className="current-tours__title" id="current-tours-title">
            Current tours
          </h2>
          <p className="current-tours__description">
            Book the most in-demand artist VIP experiences, before they sell out.
          </p>
        </div>

        <div className="current-tours__carousel" aria-labelledby="current-tours-title">
          <button
            className="current-tours__control current-tours__control--previous"
            type="button"
            onClick={handlePreviousTour}
            disabled={!canScrollTours}
            aria-label="Show previous tours"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>

          <div className="current-tours__viewport">
            <div
              ref={trackRef}
              className={[
                'current-tours__grid',
                `current-tours__grid--count-${visibleTourCount}`,
                isAnimatingTours ? 'current-tours__grid--animating' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onTransitionEnd={handleTourTransitionEnd}
              style={{ transform: `translateX(-${activeTourIndex * slideOffset}px)` }}
            >
              {carouselTourCards.map(({ card, duplicatePosition, originalIndex }) => {
                const isDuplicateCard = duplicatePosition !== 'none';

                return (
                  <article
                    key={`${duplicatePosition}-${card.title}-${originalIndex}`}
                    className={['current-tours__card', card.modifier]
                      .filter(Boolean)
                      .join(' ')}
                    aria-hidden={isDuplicateCard}
                  >
                    <a
                      className="current-tours__card-link"
                      href={card.href}
                      tabIndex={isDuplicateCard ? -1 : undefined}
                    >
                      <img
                        className="current-tours__image"
                        src={card.image}
                        alt={card.alt}
                      />
                      <div className="current-tours__overlay" aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>

          <button
            className="current-tours__control current-tours__control--next"
            type="button"
            onClick={handleNextTour}
            disabled={!canScrollTours}
            aria-label="Show next tours"
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>

        <Link className="current-tours__button" href="/vipclients">
          View all current tours
        </Link>
      </div>
    </section>
  );
}
