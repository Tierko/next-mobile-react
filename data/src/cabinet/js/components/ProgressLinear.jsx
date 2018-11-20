import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';


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
      max: maxValue,
      current,
      className,
      dashed,
      x,
    } = this.props;
    const percent = (current > maxValue || maxValue === 0) ? 100 : (current / maxValue) * 100;
    const { show } = this.state;
    const color = percent > 10 ? '#211f5e' : '#ff5500';

    return (
      <div className={cs(`progress-linear ${className}`, { 'progress-linear_dashed': dashed })}>
        {
          !dashed &&
          <div
            className="progress-linear__line"
            style={{
              width: `${show ? percent : 0}%`,
              backgroundColor: color,
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
  max: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  className: PropTypes.string,
  dashed: PropTypes.bool,
  x: PropTypes.bool,
};

ProgressLinear.defaultProps = {
  className: '',
  dashed: false,
  x: false,
};

export default ProgressLinear;
