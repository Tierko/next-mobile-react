import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { hsl2rgb } from '../utils';

const offsetColors = (colorObject, percent) => {
  colorObject.max.forEach((n, i) => {
    colorObject.current[i] = n + ((colorObject.min[i] - n) * percent);
  });
};

class ProgressLinear extends Component {
  state = {
    show: false,
  };

  componentDidMount() {
    setTimeout(() => (
      this.setState({
        show: true,
      })
    ), 300);
  }

  render() {
    const {
      colorStart,
      colorEnd,
      max: maxValue,
      current,
      className,
      tall,
      dashed,
      x,
    } = this.props;
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
    const { show } = this.state;

    offsetColors(startColor, percent);
    offsetColors(endColor, percent);

    let min = startColor.current;
    let max = endColor.current;
    min = hsl2rgb(min[0], min[1], min[2]);
    max = hsl2rgb(max[0], max[1], max[2]);
    min = colorStart || `rgb(${min.r}, ${min.g}, ${min.b})`;
    max = colorEnd || `rgb(${max.r}, ${max.g}, ${max.b})`;

    return (
      <div className={cs(`progress-linear ${className}`, { 'progress-linear_tall': tall, 'progress-linear_dashed': dashed })}>
        {
          !dashed &&
          <div
            className={cs('progress-linear__line', { 'progress-linear__line_tall': tall })}
            style={{
              width: `${show ? percent * 100 : 0}%`,
              backgroundImage: `linear-gradient(to right, ${min}, ${max})`,
            }}
          />
        }
        <div className={cs('progress-linear__empty', {
          'progress-linear__empty_show': current <= 0 && maxValue > 0 && x,
        })}
        />
      </div>
    );
  }
}

ProgressLinear.propTypes = {
  colorStart: PropTypes.string,
  colorEnd: PropTypes.string,
  max: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  className: PropTypes.string,
  tall: PropTypes.bool,
  dashed: PropTypes.bool,
  x: PropTypes.bool,
};

ProgressLinear.defaultProps = {
  colorStart: '',
  colorEnd: '',
  className: '',
  tall: false,
  dashed: false,
  x: false,
};

export default ProgressLinear;
