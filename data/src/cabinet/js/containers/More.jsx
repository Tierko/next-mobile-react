import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import InterCalls from '../../../common/js/components/InterCalls';
import Breadcrumbs from '../components/Breadcrumbs';
import Transitions from '../components/Transitions';
import Notice from '../components/Notice';
import { Pages, TITLES } from '../constants';
import { dataBuffer, getData } from '../utils';

const mergeDate = dataBuffer();

const More = ({ countries, interCalls, match: { params: { type } } }) => {
  const data = mergeDate(countries, interCalls.data);
  const remain = getData('remain');

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

  const calls = remain[1].current;
  let internet = remain[0].current;
  let internetPackage = 0;

  if (remain[0].packages) {
    internetPackage = remain[0].packages.reduce((acc, i) => (acc + i.current), 0);
  }

  internet += internetPackage;

  return (
    <DocumentMeta {...meta}>
      <HeaderMobile />
      <MobileNav key="nav" type="dashboard" />
      <Notice />
      <div key="dashboard" className="dashboard">
        <Aside />
        <Transitions>
          <div className="dashboard__content dashboard__content_white">
            <Breadcrumbs items={[{ title: 'Обзор', link: Pages.OVERVIEW }]} />
            <div>
              {
                type === 'calls' &&
                <Fragment>
                  <div className="dashboard__header">Звонки по&nbsp;тарифу &laquo;СуперВИП&raquo;</div>
                  <div className="more__items">
                    <div className="more__row">
                      <div className="more__title">Количество минут для звонков на&nbsp;номера всех операторов по&nbsp;Москве и&nbsp;на&nbsp;номера Next Mobile по&nbsp;России</div>
                      <div className="more__value">{calls}&nbsp;мин.</div>
                    </div>
                    <div className="more__row">
                      <div className="more__title">Стоимость звонков на&nbsp;номера Next Mobile по&nbsp;России</div>
                      <div className="more__value">0&nbsp;₽</div>
                    </div>
                    {
                      remain[1].packages && remain[1].packages.map(p => (
                        <div className="more__row">
                          <div className="more__title">
                            Дополнительный пакет
                            <div className="small">Количество минут для звонков на&nbsp;номера всех операторов по&nbsp;Москве и&nbsp;на&nbsp;номера Next Mobile по&nbsp;России</div>
                          </div>
                          <div className="more__value">{p.current}&nbsp;мин.</div>
                        </div>
                      ))
                    }
                    <div className="more__row">
                      <div className="more__title">
                        Звонки за границу
                      </div>
                      <div className="more__select">
                        <InterCalls more className="inter-calls_more" data={data} />
                      </div>
                    </div>
                  </div>
                  <Link className="button button_primary button_more" to={Pages.ADD_PACKAGE}>Докупить минуты</Link>
                </Fragment>
              }
              {
                type === 'internet' &&
                <Fragment>
                  <div className="dashboard__header">Интернет-доступ по&nbsp;тарифу &laquo;СуперВИП&raquo;</div>
                  <div className="more__items">
                    <div className="more__row">
                      <div className="more__title">Объем трафика в месяц</div>
                      <div className="more__value">{internet}&nbsp;ГБ</div>
                    </div>
                    {
                      remain[0].packages && remain[0].packages.map(p => (
                        <div
                          className="more__row"
                          key={`${p.current}${p.max}${p.until}`}
                        >
                          <div className="more__title">
                            Дополнительный пакет
                            <div className="small">действует {p.until}</div>
                          </div>
                          <div className="more__value">{p.current}&nbsp;ГБ</div>
                        </div>
                      ))
                    }
                  </div>
                  <Link className="button button_primary button_more" to={Pages.ADD_PACKAGE}>Докупить интернет</Link>
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
