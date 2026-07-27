"use client";

import {
  FaChevronDown,
} from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import type { MomentsFilterOption } from '@/types/moments';
import React from 'react';

export type MomentsFilterValues = {
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
  location: '',
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
  
  React.useEffect(() => {
    if (show) {
      setValues(initialValues);
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
