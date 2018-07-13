import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const offsetColors = (colorObject, percent) => {
  colorObject.max.forEach((n, i) => {
    colorObject.current[i] = n + ((colorObject.min[i] - n) * percent);
  });
};

const ProgressLinear = ({
  max: maxValue,
  current,
  className,
  tall,
  dashed,
}) => {
  const percent = (current > maxValue || maxValue === 0) ? 1 : current / maxValue;
  const startColor = {
    max: [323, 100, 70],
    min: [150, 95, 50],
    current: [0, 0, 0],
  };
  const endColor = {
    max: [345, 100, 85],
    min: [190, 95, 50],
    current: [0, 0, 0],
  };

  offsetColors(startColor, percent);
  offsetColors(endColor, percent);

  const min = startColor.current;
  const max = endColor.current;

  return (
    <div className={cs(`progress-linear ${className}`, { 'progress-linear_tall': tall, 'progress-linear_dashed': dashed })}>
      {
        !dashed &&
        <div
          className={cs('progress-linear__line', { 'progress-linear__line_tall': tall })}
          style={{
            width: `${percent * 100}%`,
            backgroundImage: `linear-gradient(to right, hsl(${min[0]}, ${min[1]}%, ${min[2]}%), hsl(${max[0]}, ${max[1]}%, ${max[2]}%)`,
          }}
        />
      }
    </div>
  );
};

ProgressLinear.propTypes = {
  max: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  className: PropTypes.string,
  tall: PropTypes.bool,
  dashed: PropTypes.bool,
};

ProgressLinear.defaultProps = {
  className: '',
  tall: false,
  dashed: false,
};

export default ProgressLinear;
