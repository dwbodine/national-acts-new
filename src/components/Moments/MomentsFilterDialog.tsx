"use client";

import { FaCalendarAlt, FaChevronDown } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

export type MomentsFilterValues = {
  band: string;
  date: string;
  location: string;
};

type MomentsFilterOption = {
  label: string;
  value: string;
};

type MomentsFilterDialogProps = {
  bandOptions?: MomentsFilterOption[];
  initialValues?: MomentsFilterValues;
  locationOptions?: MomentsFilterOption[];
  onApply?: (values: MomentsFilterValues) => void;
  onHide: () => void;
  show: boolean;
};

const emptyFilterValues: MomentsFilterValues = {
  band: '',
  date: '',
  location: '',
};

export default function MomentsFilterDialog({
  bandOptions = [],
  initialValues = emptyFilterValues,
  locationOptions = [],
  onApply,
  onHide,
  show,
}: MomentsFilterDialogProps) {
  const [values, setValues] = React.useState<MomentsFilterValues>(initialValues);

  React.useEffect(() => {
    if (show) {
      setValues(initialValues);
    }
  }, [initialValues, show]);

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
                <option value="">Text goes here</option>
                {locationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FaChevronDown aria-hidden="true" />
            </span>
          </label>

          <label className="fan-moments-filter-dialog__field" htmlFor="fan-moments-filter-band">
            <span>Band</span>
            <span className="fan-moments-filter-dialog__select-shell">
              <select
                id="fan-moments-filter-band"
                value={values.band}
                onChange={(event) => updateValue('band', event.currentTarget.value)}
              >
                <option value="">Text goes here</option>
                {bandOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FaChevronDown aria-hidden="true" />
            </span>
          </label>

          <label className="fan-moments-filter-dialog__field" htmlFor="fan-moments-filter-date">
            <span>Date</span>
            <span
              className={`fan-moments-filter-dialog__date-shell${
                values.date ? '' : ' fan-moments-filter-dialog__date-shell--empty'
              }`}
            >
              <FaCalendarAlt aria-hidden="true" />
              <span className="fan-moments-filter-dialog__date-placeholder">
                Select date
              </span>
              <input
                id="fan-moments-filter-date"
                type="date"
                value={values.date}
                onChange={(event) => updateValue('date', event.currentTarget.value)}
              />
            </span>
          </label>
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
