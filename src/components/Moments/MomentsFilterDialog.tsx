"use client";

import {
  FaCalendarAlt,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import type { MomentsFilterOption } from '@/types/moments';
import React from 'react';

export type MomentsFilterValues = {
  date: string;
  location: string;
};

type MomentsFilterDialogProps = {
  activeDates?: string[];
  initialValues?: MomentsFilterValues;
  locationOptions?: MomentsFilterOption[];
  onApply?: (values: MomentsFilterValues) => void;
  onHide: () => void;
  show: boolean;
};

const emptyFilterValues: MomentsFilterValues = {
  date: '',
  location: '',
};

const calendarDayCount = 42;
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getMonthStart = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const parseCalendarDate = (dateValue: string): Date | undefined => {
  const dateParts = dateValue.split('-').map((datePart) => Number(datePart));
  const [year, month, day] = dateParts;

  if (!year || !month || !day) {
    return undefined;
  }

  return new Date(year, month - 1, day);
};

const formatCalendarDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (dateValue: string): string => {
  const date = parseCalendarDate(dateValue);

  if (!date) {
    return 'Select date';
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const formatMonthLabel = (date: Date): string =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);

const getCalendarDays = (visibleMonth: Date): Date[] => {
  const firstVisibleDate = new Date(visibleMonth);
  firstVisibleDate.setDate(firstVisibleDate.getDate() - firstVisibleDate.getDay());

  return Array.from({ length: calendarDayCount }, (_unused, index) => {
    const date = new Date(firstVisibleDate);
    date.setDate(firstVisibleDate.getDate() + index);
    return date;
  });
};

export default function MomentsFilterDialog({
  activeDates = [],
  initialValues = emptyFilterValues,
  locationOptions = [],
  onApply,
  onHide,
  show,
}: MomentsFilterDialogProps) {
  const [values, setValues] = React.useState<MomentsFilterValues>(initialValues);
  const [visibleMonth, setVisibleMonth] = React.useState<Date>(() =>
    getMonthStart(new Date()),
  );
  const activeDateSet = React.useMemo(() => new Set(activeDates), [activeDates]);

  React.useEffect(() => {
    if (show) {
      setValues(initialValues);
      setVisibleMonth(
        getMonthStart(
          parseCalendarDate(initialValues.date || activeDates[0] || '') ?? new Date(),
        ),
      );
    }
  }, [activeDates, initialValues, show]);

  const updateValue = (key: keyof MomentsFilterValues, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setValues(emptyFilterValues);
  };

  const applyFilters = () => {
    onApply?.(values);
    onHide();
  };

  const changeVisibleMonth = (monthOffset: number) => {
    setVisibleMonth(
      (currentVisibleMonth) =>
        new Date(
          currentVisibleMonth.getFullYear(),
          currentVisibleMonth.getMonth() + monthOffset,
          1,
        ),
    );
  };

  const selectDate = (dateValue: string) => {
    if (activeDateSet.has(dateValue)) {
      updateValue('date', dateValue);
    }
  };

  const calendarDays = getCalendarDays(visibleMonth);

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName="fan-moments-filter-dialog"
      contentClassName="fan-moments-filter-dialog__content"
    >
      <Modal.Body className="fan-moments-filter-dialog__body">
        <div className="fan-moments-filter-dialog__header">
          <h3 className="fan-moments-filter-dialog__title">Filter</h3>
          <button
            className="fan-moments-filter-dialog__reset"
            type="button"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>

        <div className="fan-moments-filter-dialog__fields">
          <label className="fan-moments-filter-dialog__field" htmlFor="fan-moments-filter-location">
            <span>Location</span>
            <span className="fan-moments-filter-dialog__select-shell">
              <select
                id="fan-moments-filter-location"
                value={values.location}
                onChange={(event) => updateValue('location', event.currentTarget.value)}
              >
                <option value="">-- Select One --</option>
                {locationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FaChevronDown aria-hidden="true" />
            </span>
          </label>

          <div className="fan-moments-filter-dialog__field">
            <span>Date</span>
            <div className="fan-moments-filter-dialog__calendar">
              <div className="fan-moments-filter-dialog__date-shell">
                <FaCalendarAlt aria-hidden="true" />
                <span className="fan-moments-filter-dialog__date-value">
                  {values.date ? formatDisplayDate(values.date) : 'Select date'}
                </span>
              </div>
              <div className="fan-moments-filter-dialog__calendar-header">
                <button
                  aria-label="Previous month"
                  className="fan-moments-filter-dialog__calendar-nav"
                  type="button"
                  onClick={() => changeVisibleMonth(-1)}
                >
                  <FaChevronLeft aria-hidden="true" />
                </button>
                <span className="fan-moments-filter-dialog__calendar-title">
                  {formatMonthLabel(visibleMonth)}
                </span>
                <button
                  aria-label="Next month"
                  className="fan-moments-filter-dialog__calendar-nav"
                  type="button"
                  onClick={() => changeVisibleMonth(1)}
                >
                  <FaChevronRight aria-hidden="true" />
                </button>
              </div>
              <div className="fan-moments-filter-dialog__calendar-weekdays">
                {weekDays.map((weekDay) => (
                  <span key={weekDay}>{weekDay}</span>
                ))}
              </div>
              <div className="fan-moments-filter-dialog__calendar-grid">
                {calendarDays.map((date) => {
                  const dateValue = formatCalendarDate(date);
                  const isActive = activeDateSet.has(dateValue);
                  const isSelected = values.date === dateValue;
                  const isOutsideMonth = date.getMonth() !== visibleMonth.getMonth();
                  const dayClassName = [
                    'fan-moments-filter-dialog__calendar-day',
                    isOutsideMonth
                      ? 'fan-moments-filter-dialog__calendar-day--outside'
                      : '',
                    isSelected ? 'fan-moments-filter-dialog__calendar-day--selected' : '',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <button
                      key={dateValue}
                      aria-pressed={isSelected}
                      className={dayClassName}
                      disabled={!isActive}
                      type="button"
                      onClick={() => selectDate(dateValue)}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="fan-moments-filter-dialog__actions">
          <button
            className="fan-moments-filter-dialog__action moments-filter-dialog__action--secondary"
            type="button"
            onClick={onHide}
          >
            Cancel
          </button>
          <button
            className="fan-moments-filter-dialog__action moments-filter-dialog__action--primary"
            type="button"
            onClick={applyFilters}
          >
            Apply
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
