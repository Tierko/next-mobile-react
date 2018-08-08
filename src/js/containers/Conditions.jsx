import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavLobby from '../components/NavLobby';
import Button from '../components/Button';
import PageFade from '../components/PageFade';
import { Pages } from '../constants';

const Conditions = ({ history }) => (
  <div className="welcome">
    <NavLobby back={`${Pages.SIGN_UP}/promo`} />
    <div className="welcome__content conditions">
      <div className="conditions__header">Условия перехода</div>
      <div>Номер оформлен на ваше имя</div>
      <div>Нет задолженности перед оператором</div>
      <div>Вы не меняли оператора в последние 2 месяца</div>
      <div className="conditions__desc">Если хоть один пункт нарушен – обратитесь <Link to={Pages.SUPPORT} className="link">в поддержку</Link>, и мы подскажем, что делать</div>
      <Button className="button_conditions" onClick={() => { history.push(`${Pages.SIGN_UP}/step/1`); }}>Далее</Button>
      <div className="conditions__note">К заполнению заявки</div>
    </div>
  </div>
);

Conditions.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default PageFade(Conditions);
