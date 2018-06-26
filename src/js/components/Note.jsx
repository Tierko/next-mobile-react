import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

class Note extends Component {
  timer = null;

  createTimer = () => {
    const { timer } = this;
    const { onFadeOut, timeOut } = this.props;

    if (!timer) {
      this.timer = setTimeout(() => {
        onFadeOut();
        clearTimeout(this.timer);
        this.timer = null;
      }, timeOut);
    }
  };

  render() {
    const {
      className,
      message,
      color,
      show,
    } = this.props;

    this.createTimer();

    return (
      <div className={cs(`note ${className}`, { note_show: show })}>
        <div className={`note__message note__message_${color}`}>
          {message}
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['red', 'green', 'blue', 'purple']).isRequired,
  onFadeOut: PropTypes.func.isRequired,
  timeOut: PropTypes.number,
  show: PropTypes.bool.isRequired,
};

Note.defaultProps = {
  className: '',
  timeOut: 3000,
};

export default Note;
