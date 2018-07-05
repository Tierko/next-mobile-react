import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

class Popup extends Component {
  componentDidMount() {
    const { outsideClick } = this;

    document.addEventListener('click', outsideClick);
  }

  componentWillUnmount() {
    const { outsideClick } = this;

    document.removeEventListener('click', outsideClick);
  }

  outsideClick = ({ target }) => {
    const { onClose } = this.props;
    const { content } = this;

    if (!content.contains(target)) {
      onClose();
    }
  };

  render() {
    const { show, children } = this.props;

    return (
      <div className={cs('popup', { popup_show: show })}>
        <div className="popup__inner">
          <div className="popup__content" ref={(e) => { this.content = e; }}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
