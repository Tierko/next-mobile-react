import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import InterCalls from '../../../common/js/components/InterCalls';
import Breadcrumbs from '../components/Breadcrumbs';
import Transitions from '../components/Transitions';
import { Pages, TITLES } from '../constants';
import { dataBuffer } from '../utils';

const mergeDate = dataBuffer();

const More = ({ countries, interCalls, match: { params: { type } } }) => {
  const data = mergeDate(countries, interCalls.data);
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
            <Breadcrumbs items={[{ title: 'Обзор', link: Pages.OVERVIEW }]} />
            <div>
              {
                type === 'calls' &&
                <Fragment>
                  <div className="dashboard__header dashboard__header_more">Звонки по&nbsp;тарифу &laquo;СуперВИП&raquo;</div>
                  <div className="more__text">Количество минут для звонков на&nbsp;номера всех операторов по&nbsp;Москве и&nbsp;на&nbsp;номера Next Mobile по&nbsp;России</div>
                  <div className="more__subtitle">550&nbsp;мин.&nbsp;/ мес.</div>
                  <div className="more__text">Стоимость звонков на&nbsp;номера Next Mobile по&nbsp;России</div>
                  <div className="more__subtitle">0&nbsp;₽&nbsp;/ мин.</div>
                  <InterCalls more className="inter-calls_more" data={data} />
                  <div className="dashboard__header dashboard__header_more">Дополнительный пакет</div>
                  <div className="more__subtitle">До&nbsp;12&nbsp;сентбря</div>
                  <div className="more__text">Количество минут для звонков на&nbsp;номера всех операторов по&nbsp;Москве и&nbsp;на&nbsp;номера Next Mobile по&nbsp;России</div>
                  <div className="more__subtitle">550&nbsp;мин.&nbsp;/ мес.</div>
                  <div className="more__text">Стоимость звонков на&nbsp;номера Next Mobile по&nbsp;России</div>
                  <div className="more__subtitle">0&nbsp;₽&nbsp;/ мин.</div>
                </Fragment>
              }
              {
                type === 'internet' &&
                <Fragment>
                  <div className="dashboard__header dashboard__header_more">Интернет-доступ по&nbsp;тарифу &laquo;СуперВИП&raquo;</div>
                  <div className="more__text">Объем трафика</div>
                  <div className="more__subtitle">18&nbsp;ГБ&nbsp;/ мес.</div>
                  <div className="dashboard__header dashboard__header_more">Дополнительный пакет</div>
                  <div className="more__subtitle">До&nbsp;12&nbsp;сентбря</div>
                  <div className="more__text">Объем купленного трафика</div>
                  <div className="more__subtitle">2&nbsp;ГБ</div>
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
  countries: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  interCalls: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return {
    countries: state.Roaming.features.items,
    interCalls: state.InterCalls,
  };
}

export default connect(mapStateToProps)(More);
