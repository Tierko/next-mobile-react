import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { formatCost, getData } from '../utils';
import { Pages } from '../constants';
import { showChatAction } from '../actions/App';
import { showNoticeAction } from '../actions/Notice';

class Aside extends Component {
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
    to: Pages.FAQ,
    title: 'FAQ',
    modifier: 'faq',
  }, {
    to: Pages.Exit,
    title: 'Выход',
    modifier: 'exit',
  }];

  render() {
    const {
      hideLink,
      hideNav,
      showChat,
      showNotice,
    } = this.props;
    const { items } = this;
    const traffic = getData('remain')[0].current.toString().replace('.', ',');
    const calls = getData('remain')[1].current;

    return (
      <div className="aside">
        <div className="aside__logo">
          <img src="/media/images/logo-aside.svg" alt="Next Mobile" />
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
            <div className="aside__control">
              <div className="aside__button aside__button_notice" onClick={showNotice} />
              <div className="aside__button aside__button_chat" onClick={showChat} />
            </div>
            <nav className="aside__nav">
              {
                items.map(i => (
                  <div key={i.modifier} className={`aside__nav-item aside__nav-item_${i.modifier}`}>
                    <NavLink
                      to={i.to}
                      className="aside__link"
                      exact
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
  showChat: PropTypes.func.isRequired,
  showNotice: PropTypes.func.isRequired,
};

Aside.defaultProps = {
  hideLink: false,
  hideNav: false,
};

function mapDispatchToProps(dispatch) {
  return {
    showChat: () => dispatch(showChatAction()),
    showNotice: () => dispatch(showNoticeAction()),
  };
}

export default connect(null, mapDispatchToProps)(Aside);
