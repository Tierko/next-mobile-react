import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import Header from '../../../common/js/components/Header';
import Button from '../../../common/js/components/Button';
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
            <div className="conditions__item">Номер оформлен на&nbsp;ваше имя</div>
            <div className="conditions__item">Нет задолженности перед оператором</div>
            <div className="conditions__item">Вы&nbsp;не&nbsp;меняли оператора за&nbsp;последние 2&nbsp;месяца</div>
            <div className="conditions__desc">Если хоть одно из&nbsp;условий не&nbsp;выполняется, нужно связаться с нами в&nbsp;<Link to={Pages.SUPPORT} className="link">чате</Link> — и&nbsp;мы&nbsp;подскажем, что делать</div>
            <Button
              className="button_conditions"
              onClick={() => { history.push(`${Pages.SIGN_UP}/step/phone`); }}
              primary
            >
              Далее
            </Button>
            <div className="conditions__note">К&nbsp;началу заполнения заявки</div>
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
