import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import MobileNavEnter from '../components/MobileNavEnter';
import MobileNavDashboard from '../components/MobileNavDashboard';

class MobileNav extends Component {
  state = {
    open: false,
  };

  toggle = () => {
    const { open } = this.state;

    this.setState({
      open: !open,
    });
  };

  outsideClick = (e) => {
    if (!this.nav.contains(e.target)) {
      this.setState({
        open: false,
      });
    }
  };

  toggleScroll = (isOpen) => {
    const html = document.documentElement;
    const { body } = document;

    if (isOpen) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
    } else {
      html.removeAttribute('style');
      body.removeAttribute('style');
    }
  };

  componentWillMount() {
    const { outsideClick } = this;
    document.addEventListener('click', outsideClick);
  }

  componentWillUnmount() {
    const { outsideClick } = this;
    document.removeEventListener('click', outsideClick);
  }

  render() {
    const { open } = this.state;
    const { type } = this.props;
    const { toggle, toggleScroll } = this;

    toggleScroll(open);

    return (
      <Fragment>
        <div className={cs('mobile-nav__drawer', { 'mobile-nav__drawer_show': open })} />
        <div className="mobile-nav" ref={(e) => { this.nav = e; }}>
          <div onClick={toggle} className={cs('mobile-nav__button', { 'mobile-nav__button_open': open })} />
          <div className={cs('mobile-nav__list', { 'mobile-nav__list_open': open })}>
            {
              type === 'enter' &&
              <MobileNavEnter />
            }
            {
              type === 'dashboard' &&
              <MobileNavDashboard />
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

MobileNav.propTypes = {
  type: PropTypes.string.isRequired,
};

export default MobileNav;
