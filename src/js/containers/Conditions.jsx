import React from 'react';
import { Link } from 'react-router-dom';
import NavLobby from '../components/NavLobby';
import Button from '../components/Button';
import { Pages } from '../constants';

const Conditions = () => (
  <div className="welcome">
    <NavLobby back={`${Pages.SignUp}/step/1`} />
    <div className="welcome__content conditions">
      <div className="conditions__header">Условия перехода</div>
      <div>Номер оформлен на ваше имя</div>
      <div>Нет задолженности перед оператором</div>
      <div>Вы не меняли оператора в последние 2 месяца</div>
      <div className="conditions__desc">Если хоть один пункт нарушен – обратитесь <Link to={Pages.Support} className="link">в поддержку</Link>, и мы подскажем, что делать</div>
      <Button className="button_conditions" onClick={()=>{}}>Далее</Button>
      <div className="conditions__note">К заполнению заявки</div>
    </div>
  </div>
);

export default Conditions;
