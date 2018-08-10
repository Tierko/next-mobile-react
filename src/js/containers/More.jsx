import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import InterCalls from '../components/InterCalls';
import LinkBack from '../components/LinkBack';
import { Pages } from '../constants';

class More extends Component {
  render() {
    const { match: { params: { type } } } = this.props;

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <LinkBack className="link-back_offset-bottom" href={Pages.OVERVIEW} />
          {
            type === 'calls' &&
            <Fragment>
              <div className="dashboard__header">Звонки по тарифу Супервип</div>
              <div className="more__text">На номера Next всей России дома и в поездках по стране</div>
              <div className="more__subtitle">0 ₽ / мин</div>
              <div className="more__text">На номера всех операторов Москвы и на Next по всей России </div>
              <div className="more__subtitle">550 мин / месяц </div>
              <InterCalls more className="inter-calls_more" />
              <div className="dashboard__header dashboard__header_more">Дополнительный пакет</div>
              <div className="more__subtitle">До 12 сентбря</div>
              <div className="more__text">На номера всех операторов Москвы и на Next по всей России </div>
              <div className="more__subtitle">550 мин / месяц </div>
              <div className="more__text">На номера Next всей России дома и в поездках по стране</div>
              <div className="more__subtitle">0 ₽ / мин</div>
            </Fragment>
          }
          {
            type === 'internet' &&
            <Fragment>
              <div className="dashboard__header">Интернет по тарифу Супервип</div>
              <div className="more__text">Объем трафика</div>
              <div className="more__subtitle">18 Гб / месяц</div>
              <div className="dashboard__header dashboard__header_more">Дополнительный пакет</div>
              <div className="more__subtitle">До 12 сентбря</div>
              <div className="more__text">Объем купленного трафика</div>
              <div className="more__subtitle">2 Гб</div>
            </Fragment>
          }
        </div>
      </div>,
    ]);
  }
}

More.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default More;
