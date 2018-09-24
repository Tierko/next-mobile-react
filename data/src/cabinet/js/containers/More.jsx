import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import InterCalls from '../../../common/js/components/InterCalls';
import LinkBack from '../components/LinkBack';
import Transitions from '../components/Transitions';
import { Pages, TITLES } from '../constants';

const More = ({ match: { params: { type } } }) => {
  let title;

  switch (type) {
  case 'calls':
    title = TITLES.MORE_CALLS;
    break;
  case 'internet':
    title = TITLES.MORE_INTERNET;
    break;
  default:
    title = '';
  }

  const meta = {
    title,
  };

  return (
    <DocumentMeta {...meta}>
      <HeaderMobile />
      <MobileNav key="nav" type="dashboard" />
      <div key="dashboard" className="dashboard">
        <Aside />
        <Transitions>
          <div className="dashboard__content">
            <LinkBack className="link-back_offset-bottom" href={Pages.OVERVIEW} />
            <div>
              {
                type === 'calls' &&
                <Fragment>
                  <div className="dashboard__header dashboard__header_more">Звонки по тарифу «СуперВИП»</div>
                  <div className="more__text">Количество минут для звонков на номера всех операторов по Москве и на номера Next Mobile по России</div>
                  <div className="more__subtitle">550 мин. / мес.</div>
                  <div className="more__text">Стоимость звонков на номера Next Mobile по России</div>
                  <div className="more__subtitle">0 ₽ / мин.</div>
                  <InterCalls more className="inter-calls_more" />
                  <div className="dashboard__header dashboard__header_more">Дополнительный пакет</div>
                  <div className="more__subtitle">До 12 сентбря</div>
                  <div className="more__text">Количество минут для звонков на номера всех операторов по Москве и на номера Next Mobile по России</div>
                  <div className="more__subtitle">550 мин. / мес.</div>
                  <div className="more__text">Стоимость звонков на номера Next Mobile по России</div>
                  <div className="more__subtitle">0 ₽ / мин.</div>
                </Fragment>
              }
              {
                type === 'internet' &&
                <Fragment>
                  <div className="dashboard__header dashboard__header_more">Интернет-доступ по тарифу «СуперВИП»</div>
                  <div className="more__text">Объем трафика</div>
                  <div className="more__subtitle">18 ГБ / мес.</div>
                  <div className="dashboard__header dashboard__header_more">Дополнительный пакет</div>
                  <div className="more__subtitle">До 12 сентбря</div>
                  <div className="more__text">Объем купленного трафика</div>
                  <div className="more__subtitle">2 ГБ</div>
                </Fragment>
              }
            </div>
          </div>
        </Transitions>
      </div>
    </DocumentMeta>
  );
};

More.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default More;
