import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import cs from 'classnames';
import { formatCost, getData } from '../utils';
import { Pages } from '../constants';

class Aside extends Component {
  state = {
    current: '',
  };

  setActiveLink = (match, modifier) => {
    const { current } = this.state;

    if (modifier === 'exit') {
      return false;
    }

    if (match && !match.isExact && current !== modifier) {
      this.setState({
        current: modifier,
      });
    }

    if (match && match.isExact && current) {
      this.setState({
        current: '',
      });
    }

    return !!match;
  };

  items = [{
    to: Pages.OVERVIEW,
    title: 'Обзор',
    modifier: 'overview',
  }, {
    to: Pages.PAY,
    title: 'Пополнение',
    modifier: 'pay',
  }, {
    to: Pages.SERVICES,
    title: 'Тарифы и услуги',
    modifier: 'services',
  }, {
    to: Pages.ROAMING,
    title: 'Роуминг',
    modifier: 'roaming',
  }, {
    to: Pages.HISTORY,
    title: 'История',
    modifier: 'history',
  }, {
    to: Pages.SETTINGS,
    title: 'Настройки',
    modifier: 'settings',
  }, {
    to: Pages.SUPPORT_DASHBOARD,
    title: 'Поддержка',
    modifier: 'support-dashboard',
  }, {
    to: Pages.Exit,
    title: 'Выход',
    modifier: 'exit',
  }];

  render() {
    const { hideLink, hideNav } = this.props;
    const { setActiveLink, items } = this;
    const { current } = this.state;
    const traffic = getData('remain')[0].current.toString().replace('.', ',');
    const calls = getData('remain')[1].current;

    return (
      <div className="aside">
        <div className="aside__logo">
          <img src="/media/images/logo-aside.png" alt="Next Mobile" />
          {
            !hideLink && <Link className="aside__home" to={Pages.OVERVIEW} />
          }
        </div>
        {
          !hideNav &&
          <div className="aside__inner">
            <div className="aside__phone">+ 7 905 123-23-44</div>
            <div className="aside__info">
              <div>
                <span>Баланс:</span> {formatCost(getData('balance'))}
              </div>
              <div>
                <span>По России: </span>
                <div>{traffic} ГБ, {calls} мин., БЕЗЛИМИТ СМС</div>
              </div>
            </div>
            <nav className="aside__nav">
              {
                items.map(i => (
                  <div key={i.modifier} className={`aside__nav-item aside__nav-item_${i.modifier}`}>
                    <NavLink
                      to={i.to}
                      isActive={e => setActiveLink(e, i.modifier)}
                      className={cs('aside__link', { 'aside__link_not-exact': current === i.modifier })}
                    >
                      <span>{i.title}</span>
                    </NavLink>
                  </div>
                ))
              }
            </nav>
          </div>
        }
      </div>
    );
  }
}

Aside.propTypes = {
  hideLink: PropTypes.bool,
  hideNav: PropTypes.bool,
};

Aside.defaultProps = {
  hideLink: false,
  hideNav: false,
};

export default Aside;
