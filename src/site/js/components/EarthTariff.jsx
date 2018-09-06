import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InterCalls from '../../../common/js/components/InterCalls';

class EarthTariff extends Component {
  render() {
    const { home } = this.props;

    return (
      <div className="earth-tariff">
        <div>
          {
            home && <div className="earth-tariff__header">Выгодный и&nbsp;понятный роуминг</div>
          }
          <div className="earth-tariff__text">Выезжая в&nbsp;командировку или на&nbsp;отдых, вы&nbsp;сразу увидите текущую стоимость связи и&nbsp;сможете легко проследить за&nbsp;расходами</div>
          <InterCalls className="inter-calls_home" home />
        </div>
        <div className="earth-tariff__numbers">
          <div className="earth-tariff__row">
            <div className="earth-tariff__cell">Интернет</div>
            <div className="earth-tariff__cell earth-tariff__cell_big">14 ₽ / Мб</div>
            <div className="earth-tariff__cell">Или 2000 ₽ / 1 ГБ</div>
          </div>
          <div className="earth-tariff__row">
            <div className="earth-tariff__cell">Звонки</div>
            <div className="earth-tariff__cell earth-tariff__cell_big">200 ₽ / мин.</div>
          </div>
          <div className="earth-tariff__row">
            <div className="earth-tariff__cell">Сообщения</div>
            <div className="earth-tariff__cell earth-tariff__cell_big">7 ₽ / СМС</div>
          </div>
        </div>
      </div>
    );
  }
}

EarthTariff.propTypes = {
  home: PropTypes.bool,
};

EarthTariff.defaultProps = {
  home: false,
};

export default EarthTariff;
