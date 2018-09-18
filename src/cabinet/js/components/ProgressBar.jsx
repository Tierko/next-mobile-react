import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const convertSteps = (step, mode) => {
  if (!mode && step === 'phone') {
    return 1;
  }

  if (!mode && step === 'personal') {
    return 2;
  }

  if (!mode && step === 'delivery-address') {
    return 3;
  }

  if (!mode && step === 'delivery-date') {
    return 4;
  }

  return 0;
};

const getCount = (mode) => {
  if (!mode) {
    return 4;
  }

  return 6;
};

const ProgressBar = ({ mode, step, className }) => {
  const count = getCount(mode);
  const current = convertSteps(step, mode);
  const steps = Array((count * 2) - 1).fill(null);
  const elements = steps.map((_, i) => {
    if (i % 2 === 0) {
      return (
        <div
          key={i}
          data-i={i / 2}
          className={cs('progress-bar__point', {
            'progress-bar__point_active': i / 2 === current - 1,
            'progress-bar__point_filled': i / 2 < current - 1,
          })}
        />
      );
    }

    return (
      <div key={i} className="progress-bar__line" />
    );
  });

  return (
    <div className={`progress-bar ${className}`}>
      {elements}
    </div>
  );
};

ProgressBar.propTypes = {
  step: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
  className: PropTypes.string,
};

ProgressBar.defaultProps = {
  className: '',
};

export default ProgressBar;
