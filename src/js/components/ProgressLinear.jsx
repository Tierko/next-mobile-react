import React from 'react';
import PropTypes from 'prop-types';

const offsetColors = (colorObject, percent) => {
  colorObject.max.forEach((n, i) => {
    colorObject.current[i] = n + ((colorObject.min[i] - n) * percent);
  });
};

const ProgressLinear = ({
  max,
  current,
  className,
}) => {
  const percent = current / max;
  const startColor = {
    min: [129, 246, 188],
    max: [255, 76, 185],
    current: [0, 0, 0, 1],
  };
  const endColor = {
    min: [125, 255, 241],
    max: [255, 42, 99],
    current: [0, 0, 0, 1],
  };

  offsetColors(startColor, percent);
  offsetColors(endColor, percent);

  return (
    <div className={`progress-linear ${className}`}>
      <div
        className="progress-linear__line"
        style={{
          width: `${percent * 100}%`,
          backgroundImage: `linear-gradient(to right, rgba(${startColor.current.join(',')}), rgba(${endColor.current.join(',')}))`,
        }}
      />
    </div>
  );
};

ProgressLinear.propTypes = {
  max: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  className: PropTypes.string,
};

ProgressLinear.defaultProps = {
  className: '',
};

export default ProgressLinear;
