import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import Header from '../../../common/js/components/Header';
import Button from '../components/Button';
import Transitions from '../components/Transitions';
import { Pages, TITLES } from '../constants';

const Conditions = ({ history }) => (
  <DocumentMeta title={TITLES.CONDITIONS}>
    <Transitions>
      <div className="welcome">
        <Header back={`${Pages.SIGN_UP}/promo`} />
        <Transitions classNames="slide">
          <div className="welcome__content conditions">
            <div className="conditions__header">Условия перехода</div>
            <div>Номер оформлен на ваше имя</div>
            <div>Нет задолженности перед оператором</div>
            <div>Вы не меняли оператора за последние 2 месяца</div>
            <div className="conditions__desc">Если хоть одно из условий не выполняется, обратитесь в <Link to={Pages.SUPPORT} className="link">службу поддержки</Link> — и мы подскажем, что делать</div>
            <Button className="button_conditions" onClick={() => { history.push(`${Pages.SIGN_UP}/step/1`); }}>Далее</Button>
            <div className="conditions__note">К началу заполнения заявки</div>
          </div>
        </Transitions>
      </div>
    </Transitions>
  </DocumentMeta>
);

Conditions.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Conditions;
