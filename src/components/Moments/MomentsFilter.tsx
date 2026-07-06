"use client";

import { FaFilter, FaUndo } from 'react-icons/fa';

type MomentsFilterProps = {
  className?: string;
  defaultValue?: string;
  filterLabel?: string;
  onFilterClick?: () => void;
  onResetClick?: () => void;
  onSearchChange?: (value: string) => void;
  placeholder?: string;
  resetLabel?: string;
  searchLabel?: string;
  value?: string;
};

export default function MomentsFilter({
  className,
  filterLabel = 'Filter',
  onFilterClick,
  onResetClick,
  resetLabel = 'Reset',
}: MomentsFilterProps) {
  const wrapperClassName = ['fan-moments-filter', className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClassName} role="search">
      <button className="fan-moments-filter__button" type="button" onClick={onFilterClick}>
        <FaFilter className="fan-moments-filter__button-icon" aria-hidden="true" />
        <span>{filterLabel}</span>
      </button>
      <button className="fan-moments-filter__button" type="button" onClick={onResetClick}>
        <FaUndo className="fan-moments-filter__button-icon" aria-hidden="true" />
        <span>{resetLabel}</span>
      </button>
    </div>
  );
}
