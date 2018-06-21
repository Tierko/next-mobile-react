import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cs from 'classnames';
import { Pages } from '../constants';

class MobileNav extends Component {
  state = {
    open: false,
  };

  enter = [{
    id: 1,
    url: Pages.SignIn,
    icon: 'enter.svg',
    title: 'Вход',
  }, {
    id: 2,
    url: Pages.SignUp,
    icon: 'reg.svg',
    title: 'Регистрация',
  }, {
    id: 3,
    url: Pages.Support,
    icon: 'support.svg',
    title: 'Поддержка',
  }, {
    id: 4,
    url: Pages.RequestStatus,
    icon: 'status.svg',
    title: 'Статус заявки',
  }];

  dashboard = [{
    id: 1,
    url: Pages.Overview,
    icon: 'overview.svg',
    title: 'Обзор',
  }, {
    id: 2,
    url: Pages.Services,
    icon: 'prices.svg',
    title: 'Тарифы',
  }, {
    id: 3,
    url: Pages.Payment,
    icon: 'plus.svg',
    title: 'Пополнение',
  }, {
    id: 4,
    url: Pages.Roaming,
    icon: 'roaming.svg',
    title: 'Роуминг',
  }, {
    id: 5,
    url: Pages.History,
    icon: 'history.svg',
    title: 'История',
  }, {
    id: 6,
    url: Pages.Support,
    icon: 'support.svg',
    title: 'Чат',
  }, {
    id: 7,
    url: Pages.Settings,
    icon: 'settings.svg',
    title: 'Настройки',
  }, {
    id: 8,
    url: Pages.Exit,
    icon: 'exit.svg',
    title: 'Выйти',
  }];

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
    const { toggle } = this;
    const items = this[type];

    return (
      <div className="mobile-nav" ref={(e) => { this.nav = e; }}>
        <div onClick={toggle} className={cs('mobile-nav__button', { 'mobile-nav__button_open': open })} />
        <div className={cs('mobile-nav__list', { 'mobile-nav__list_open': open })}>
          <div className="mobile-nav__list-inner">
            {
              items.map(i => (
                <NavLink key={i.id} className="mobile-nav__link" to={i.url}>
                  <img src={`/media/icons/${i.icon}`} alt={i.title} />
                  {i.title}
                </NavLink>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

MobileNav.propTypes = {
  type: PropTypes.string.isRequired,
};

export default MobileNav;
