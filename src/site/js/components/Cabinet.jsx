import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Cabinet = ({ to }) => (
  <div className="cabinet">
    <div className="cabinet__image">
      <img className="cabinet__img cabinet__img_desktop" src="/media/images/phones.png" />
      <img className="cabinet__img cabinet__img_mobile" src="/media/images/phones-mobile.png" />
    </div>
    <div className="cabinet__desc">
      <div className="cabinet__header">
        Удобный <span className="home__link" onClick={to}>личный кабинет</span> и&nbsp;приложение
      </div>
      <div className="cabinet__text">Следите за&nbsp;счетом, остатками по&nbsp;тарифу, подключайте роуминг и&nbsp;узнавайте стоимоить связи в&nbsp;любом уголке мира</div>
      <div className="cabinet__stores">
        <a className="cabinet__store" href="#">
          <img className="cabinet__store-img" src="/media/images/as.svg" alt="App Store" />
        </a>
        <a className="cabinet__store" href="#">
          <img className="cabinet__store-img" src="/media/images/gp.svg" alt="Google play" />
        </a>
      </div>
    </div>
  </div>
);

export default Cabinet;
