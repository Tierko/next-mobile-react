import React from 'react';
import { Link } from 'react-router-dom';

const Cabinet = () => (
  <div className="cabinet">
    <div className="cabinet__image">
      <img className="cabinet__img" src="/media/images/phones.png" />
    </div>
    <div className="cabinet__desc">
      <div className="cabinet__header">
        Удобный <Link className="home__link" to="#">личный кабинет</Link> и&nbsp;приложение
      </div>
      <div className="cabinet__text">Следите за&nbsp;счетом, остатками по&nbsp;тарифу, подключайте роуминг и&nbsp;узнавайте стоимоить связи в&nbsp;любом уголке мира</div>
      <div className="cabinet__stores">
        <a className="cabinet__store" href="#">
          <img className="cabinet__store-img" src="/media/images/as.png" alt="App Store" />
        </a>
        <a className="cabinet__store" href="#">
          <img className="cabinet__store-img" src="/media/images/gp.png" alt="Google play" />
        </a>
      </div>
    </div>
  </div>
);

export default Cabinet;
