import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import InterCalls from '../../../common/js/components/InterCalls';
import Earth from './Earth';

function dataBuffer() {
  const data = [];

  return (countries) => {
    if (!data.length && countries.length) {
      return countries.map(c => ({
        name: c.properties.name,
        code: c.properties.code,
      }));
    }

    return data;
  };
}

const filteredData = dataBuffer();

class EarthTariff extends Component {
  state = {
    country: null,
  };

  onChange = (country) => {
    this.setState({
      country,
    });
  };

  render() {
    const {
      tariff,
      className,
      type,
      size,
      home,
      translate: { header, text },
      countries,
    } = this.props;
    const { onChange } = this;
    const { country } = this.state;
    const autoCompleteCountries = filteredData(countries);

    if (home && (!header || !text || !countries.length)) {
      return false;
    }

    return (
      <div className={`earth-tariff ${className}`}>
        <div className="earth-tariff__other">
          {
            home &&
            <div
              className="earth-tariff__header"
              dangerouslySetInnerHTML={{ __html: header }}
            />
          }
          {
            home &&
            <div
              className="earth-tariff__text"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          }
          <InterCalls
            className="inter-calls_home"
            home={home}
            tariff={tariff}
            onChange={onChange}
            hidePrice
            data={{ items: autoCompleteCountries }}
          />
        </div>
        <div
          className={cs('earth-tariff__numbers', {
            'earth-tariff__numbers_show': !!country,
          })}
        >
          <div className="earth-tariff__row">
            <div className="earth-tariff__cell earth-tariff__cell_small">Интернет</div>
            <div className="earth-tariff__cell earth-tariff__cell_big">14 ₽ / МБ</div>
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
        <Earth style={type} size={size} country={country} features={countries} />
      </div>
    );
  }
}

EarthTariff.propTypes = {
  tariff: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  home: PropTypes.bool,
  translate: PropTypes.shape(),
  countries: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

EarthTariff.defaultProps = {
  tariff: false,
  className: '',
  home: false,
  translate: {},
};

export default EarthTariff;
