"use client";

import { FaFilter, FaSearch } from 'react-icons/fa';
import type { ChangeEvent } from 'react';

type MomentsFilterProps = {
  className?: string;
  defaultValue?: string;
  filterLabel?: string;
  onFilterClick?: () => void;
  onSearchChange?: (value: string) => void;
  placeholder?: string;
  searchLabel?: string;
  value?: string;
};

export default function MomentsFilter({
  className,
  defaultValue,
  filterLabel = 'Filter',
  onFilterClick,
  onSearchChange,
  placeholder = 'Search',
  searchLabel = 'Search moments',
  value,
}: MomentsFilterProps) {
  const wrapperClassName = ['fan-moments-filter', className].filter(Boolean).join(' ');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(event.target.value);
  };

  return (
    <div className={wrapperClassName} role="search">
      <label className="fan-moments-filter__search" aria-label={searchLabel}>
        <input
          className="fan-moments-filter__input"
          defaultValue={defaultValue}
          onChange={handleSearchChange}
          placeholder={placeholder}
          type="search"
          value={value}
        />
        <span className="fan-moments-filter__search-icon" aria-hidden="true">
          <FaSearch />
        </span>
      </label>

      <button className="fan-moments-filter__button" type="button" onClick={onFilterClick}>
        <FaFilter className="fan-moments-filter__button-icon" aria-hidden="true" />
        <span>{filterLabel}</span>
      </button>
    </div>
  );
}
