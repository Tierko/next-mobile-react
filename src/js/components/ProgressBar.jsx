import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const ProgressBar = ({ count, current, className }) => {
  const steps = Array((count * 2) - 1).fill(null);
  const elements = steps.map((_, i) => {
    if (i % 2 === 0) {
      return (
        <div
          key={i}
          data-i={i / 2}
          className={cs('progress-bar__point', {
            'progress-bar__point_active': i / 2 === (current * 1) - 1,
            'progress-bar__point_filled': i / 2 < (current * 1) - 1,
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
  count: PropTypes.number.isRequired,
  current: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  className: PropTypes.string,
};

ProgressBar.defaultProps = {
  className: '',
};

export default ProgressBar;
