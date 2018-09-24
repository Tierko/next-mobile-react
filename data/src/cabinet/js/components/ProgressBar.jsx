import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const convertSteps = (step, number, tariff) => {
  if (step === 'phone') {
    return 1;
  }

  if (tariff && number === 'current' && step === 'personal') {
    return 2;
  }

  if (tariff && number === 'current' && step === 'delivery-date') {
    return 3;
  }

  if (tariff && number === 'new' && step === 'choose-number') {
    return 2;
  }

  if (tariff && number === 'new' && step === 'personal') {
    return 3;
  }

  if (tariff && number === 'new' && step === 'delivery-date') {
    return 4;
  }

  if (tariff && number === 'new' && step === 'delivery-address') {
    return 5;
  }

  if (tariff && number === 'current' && step === 'delivery-address') {
    return 4;
  }

  if (!number && step === 'personal') {
    return 2;
  }

  if (!number && step === 'delivery-date') {
    return 3;
  }

  if (!number && step === 'delivery-address') {
    return 4;
  }

  if (number && step === 'choose-tariff') {
    return 2;
  }

  if (number === 'current' && step === 'personal') {
    return 3;
  }

  if (number === 'current' && step === 'delivery-date') {
    return 4;
  }

  if (number === 'current' && step === 'delivery-address') {
    return 5;
  }

  if (number === 'new' && step === 'choose-number') {
    return 3;
  }

  if (number === 'new' && step === 'personal') {
    return 4;
  }

  if (number === 'new' && step === 'delivery-date') {
    return 5;
  }

  if (number === 'new' && step === 'delivery-address') {
    return 6;
  }

  return 0;
};

const getCount = (number, tariff) => {
  if (tariff && number === 'current') {
    return 4;
  }

  if (tariff && number === 'new') {
    return 5;
  }

  if (!number) {
    return 4;
  }

  if (number === 'current') {
    return 5;
  }

  return 6;
};

const ProgressBar = ({
  step,
  className,
  number,
  tariff,
}) => {
  const count = getCount(number, tariff);
  const current = convertSteps(step, number, tariff);
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
  step: PropTypes.string,
  className: PropTypes.string,
  number: PropTypes.string,
  tariff: PropTypes.string,
};

ProgressBar.defaultProps = {
  step: '',
  className: '',
  number: '',
  tariff: '',
};

export default ProgressBar;
