import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InterCalls from '../../../common/js/components/InterCalls';

class EarthTariff extends Component {
  render() {
    const { home, tariff, className } = this.props;

    return (
      <div className={`earth-tariff ${className}`}>
        <div>
          {
            home && <div className="earth-tariff__header">Выгодный и&nbsp;понятный роуминг</div>
          }
          {
            home && <div className="earth-tariff__text">Выезжая в&nbsp;командировку или на&nbsp;отдых, вы&nbsp;сразу увидите текущую стоимость связи и&nbsp;сможете легко проследить за&nbsp;расходами</div>
          }
          <InterCalls className="inter-calls_home" home={home} tariff={tariff} />
        </div>
        <div className="earth-tariff__numbers">
          <div className="earth-tariff__row">
            <div className="earth-tariff__cell earth-tariff__cell_small">Интернет</div>
            <div className="earth-tariff__cell earth-tariff__cell_big">14 ₽ / Мб</div>
            <div className="earth-tariff__cell earth-tariff__cell_small">Или 2000 ₽ / 1 ГБ</div>
          </div>
          <div className="earth-tariff__row">
            <div className="earth-tariff__cell earth-tariff__cell_small">Звонки</div>
            <div className="earth-tariff__cell earth-tariff__cell_big">200 ₽ / мин.</div>
          </div>
          <div className="earth-tariff__row">
            <div className="earth-tariff__cell earth-tariff__cell_small">Сообщения</div>
            <div className="earth-tariff__cell earth-tariff__cell_big">7 ₽ / СМС</div>
          </div>
        </div>
      </div>
    );
  }
}

EarthTariff.propTypes = {
  home: PropTypes.bool,
  tariff: PropTypes.bool,
  className: PropTypes.string,
};

EarthTariff.defaultProps = {
  home: false,
  tariff: false,
  className: '',
};

export default EarthTariff;
