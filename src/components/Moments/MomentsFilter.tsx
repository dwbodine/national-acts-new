"use client";

import { FaFilter, FaUndo } from 'react-icons/fa';
import type { MomentsFilterOption, MomentsFilterOptionsResponse } from '@/types/moments';
import { useEffect, useState } from 'react';

const logosBaseUrl = process.env.NEXT_PUBLIC_LOGOS_URL ?? '';
const momentsBaseUrl = process.env.NEXT_PUBLIC_MOMENTS_URL ?? '';

const getBandFilterOptions = async (): Promise<MomentsFilterOption[]> => {
  const response = await fetch('/api/moments/filter-options?type=bands');

  if (!response.ok) {
    return [];
  }

  const filterOptions = (await response.json()) as MomentsFilterOptionsResponse;

  return filterOptions.bandOptions;
};

const getLogoUrl = (logo?: string): string | undefined => {
  const trimmedLogo = logo?.trim();

  if (!trimmedLogo) {
    return undefined;
  }

  if (/^(?:https?:)?\/\//u.test(trimmedLogo) || trimmedLogo.startsWith('/')) {
    return trimmedLogo;
  }

  return `${logosBaseUrl.replace(/\/$/u, '')}/${trimmedLogo.replace(/^\//u, '')}`;
};

const getTileImageUrl = (image?: string): string | undefined => {
  const trimmedImage = image?.trim();

  if (!trimmedImage) {
    return undefined;
  }

  if (/^(?:https?:)?\/\//u.test(trimmedImage) || trimmedImage.startsWith('/')) {
    return trimmedImage;
  }

  return `${momentsBaseUrl.replace(/\/$/u, '')}/${trimmedImage.replace(/^\//u, '')}`;
};

type MomentsFilterProps = {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  filterLabel?: string;
  onBandSelect?: (sellerId: string) => void;
  onFilterClick?: () => void;
  onResetClick?: () => void;
  onSearchChange?: (value: string) => void;
  placeholder?: string;
  resetLabel?: string;
  searchLabel?: string;
  selectedBand?: string;
  value?: string;
};

export default function MomentsFilter({
  className,
  disabled = false,
  filterLabel = 'Filter',
  onBandSelect,
  onFilterClick,
  onResetClick,
  resetLabel = 'Reset',
  selectedBand = '',
}: MomentsFilterProps) {
  const [bandOptions, setBandOptions] = useState<MomentsFilterOption[]>([]);
  const [isLoadingBands, setIsLoadingBands] = useState(true);
  const wrapperClassName = ['fan-moments-filter', className].filter(Boolean).join(' ');
  const isDisabled = disabled || isLoadingBands;
  const selectedBandOption = bandOptions.find((bandOption) => bandOption.value === selectedBand);
  const selectedBandLogoUrl = getLogoUrl(selectedBandOption?.logo);
  const showBandTiles = !selectedBand;
  const showMomentControls = Boolean(selectedBand);

  useEffect(() => {
    let shouldUpdate = true;

    const loadBandOptions = async () => {
      setIsLoadingBands(true);

      try {
        const loadedBandOptions = await getBandFilterOptions();

        if (shouldUpdate) {
          setBandOptions(loadedBandOptions);
        }
      } finally {
        if (shouldUpdate) {
          setIsLoadingBands(false);
        }
      }
    };

    loadBandOptions().catch(() => undefined);

    return () => {
      shouldUpdate = false;
    };
  }, []);

  return (
    <div className={wrapperClassName}>
      {showMomentControls ? (
        <>
          {selectedBandOption ? (
            <div className="fan-moments-filter__selected-band">
              {selectedBandLogoUrl ? (
                <img
                  className="fan-moments-filter__selected-band-logo"
                  src={selectedBandLogoUrl}
                  alt={`${selectedBandOption.label} logo`}
                />
              ) : (
                <span className="fan-moments-filter__selected-band-fallback" aria-hidden="true">
                  {selectedBandOption.label.slice(0, 1)}
                </span>
              )}
            </div>
          ) : null}
          <div className="fan-moments-filter__actions" role="search">
            <button
              className="fan-moments-filter__button"
              disabled={isDisabled}
              type="button"
              onClick={onFilterClick}
            >
              <FaFilter className="fan-moments-filter__button-icon" aria-hidden="true" />
              <span>{filterLabel}</span>
            </button>
            <button
              className="fan-moments-filter__button"
              disabled={isDisabled}
              type="button"
              onClick={onResetClick}
            >
              <FaUndo className="fan-moments-filter__button-icon" aria-hidden="true" />
              <span>{resetLabel}</span>
            </button>
          </div>
        </>
      ) : null}
      {showBandTiles ? (
        <div className="fan-moments-filter__bands" aria-label="Bands with moments">
          {bandOptions.map((bandOption) => {
            const logoUrl = getLogoUrl(bandOption.logo);
            const tileImageUrl = getTileImageUrl(bandOption.image);

            return (
              <button
                key={bandOption.value}
                className="fan-moments-filter__band-tile"
                disabled={isDisabled}
                aria-label={bandOption.label}
                style={
                  tileImageUrl
                    ? { backgroundImage: `url(${JSON.stringify(tileImageUrl)})` }
                    : undefined
                }
                type="button"
                onClick={() => onBandSelect?.(bandOption.value)}
              >
                {logoUrl ? (
                  <img
                    className="fan-moments-filter__band-logo"
                    src={logoUrl}
                    alt=""
                    aria-hidden="true"
                  />
                ) : (
                  <span className="fan-moments-filter__band-fallback" aria-hidden="true">
                    {bandOption.label.slice(0, 1)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
