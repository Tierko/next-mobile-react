import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

class Note extends Component {
  timer = null;

  createTimer = () => {
    const { timer } = this;
    const { onFadeOut, timeOut } = this.props;

    if (!timer && timeOut > 0 && onFadeOut) {
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
      hideCont,
    } = this.props;

    this.createTimer();

    return (
      <div className={cs(`note ${className}`, { note_show: show, 'note_hide-cont': hideCont && !show })}>
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
  onFadeOut: PropTypes.func,
  timeOut: PropTypes.number,
  show: PropTypes.bool.isRequired,
  hideCont: PropTypes.bool,
};

Note.defaultProps = {
  className: '',
  timeOut: 3000,
  onFadeOut: null,
  hideCont: false,
};

export default Note;
