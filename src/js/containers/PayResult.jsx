import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import PageFade from '../components/PageFade';
import { Pages } from '../constants';

const PayResult = ({ match: { params } }) => {
  const type = params.type || 'error';

  return [
    <MobileNav key="nav" type="dashboard" />,
    <div key="dashboard" className="dashboard">
      <Aside />
      <div className="dashboard__content">
        <div className="pay-result">
          {
            type === 'success' &&
            <Fragment>
              <div className="status status_ok">
                <span>Оплата прошла успешно</span>
              </div>
              <div>На ваш счет зачислено 1 000 ₽ c карты Сбербанка *6728</div>
              <div className="pay-result__auto-pay">
                <Link className="link-light" to={Pages.AutoPay}>Сделать платеж регулярным</Link>
              </div>
            </Fragment>
          }
          {
            type === 'error' &&
            <Fragment>
              <div className="status status_error">
                <span>Ошибка оплаты</span>
              </div>
            </Fragment>
          }
          <div className="pay-result__overview">
            <Link className="link-light" to={Pages.Overview}>Вернуться на главную</Link>
          </div>
        </div>
      </div>
    </div>,
  ];
};

export default PageFade(PayResult);
