import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import MobileNavEnter from './MobileNavEnter';
import MobileNavDashboard from './MobileNavDashboard';
import MobileNavHome from './MobileNavHome';

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

  hide = () => {
    this.setState({
      open: false,
    });
  };

  outsideClick = (e) => {
    if (this.nav && !this.nav.contains(e.target)) {
      this.setState({
        open: false,
      });
    }
  };

  toggleScroll = (isOpen) => {
    const html = document.documentElement;
    const { body } = document;
    const scrolled = body.scrollTop || html.scrollTop;

    if (isOpen) {
      body.style.position = 'fixed';
      body.style.top = `${-scrolled}px`;
      body.style.right = 0;
      body.style.left = 0;
      html.style.overflow = 'hidden';
      html.style.position = 'relative';
      html.style.height = '100%';
      this.scrolled = scrolled;
    } else {
      const { position } = body.style;
      body.removeAttribute('style');
      html.removeAttribute('style');

      if (position === 'fixed') {
        window.scroll(0, this.scrolled || 0);
      }
    }
  };

  onClick = ({ target }) => {
    if (!target || !target.classList) {
      return;
    }

    if (target.classList.contains('mobile-nav__link') && target.classList.contains('active')) {
      this.setState({
        open: false,
      });
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
    const {
      type,
      r,
      hideSpot,
      translate,
      dark,
    } = this.props;
    const {
      toggle,
      toggleScroll,
      hide,
      onClick,
    } = this;

    toggleScroll(open);

    return (
      <Fragment>
        <div className={cs('mobile-nav__drawer', { 'mobile-nav__drawer_show': open })} onClick={hide} />
        <div className="mobile-nav" ref={(e) => { this.nav = e; }}>
          <div
            onClick={toggle}
            className={cs('mobile-nav__menu', {
              'mobile-nav__menu_mask': !hideSpot,
              'mobile-nav__menu_dark': dark,
            })}
          />
          <div
            className={cs('mobile-nav__list', { 'mobile-nav__list_open': open })}
            onClick={onClick}
          >
            <div className="mobile-nav__list-inner">
              <div
                onClick={toggle}
                className="mobile-nav__close"
              />
              {
                type === 'enter' &&
                <MobileNavEnter />
              }
              {
                type === 'dashboard' &&
                <MobileNavDashboard />
              }
              {
                type === 'home' &&
                <MobileNavHome r={r} translate={translate} />
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

MobileNav.propTypes = {
  type: PropTypes.string.isRequired,
  r: PropTypes.number,
  hideSpot: PropTypes.bool,
  translate: PropTypes.shape(),
  dark: PropTypes.bool,
};

MobileNav.defaultProps = {
  r: 1,
  hideSpot: false,
  translate: {},
  dark: false,
};

export default MobileNav;
