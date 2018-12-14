import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Select from '../components/SelectCalls';
import Earth from './Earth';

function dataBuffer() {
  const data = [];

  return (countries) => {
    if (!data.length && countries.length) {
      return countries
        .filter(c => !c.properties.exclude)
        .map(c => ({
          name: c.properties.name,
          code: c.properties.code,
        }));
    }

    return data;
  };
}

const filteredData = dataBuffer();

class EarthTariff extends Component {
  constructor(props) {
    super(props);
    const { countries } = props;
    const rand = Math.floor(Math.random() * countries.length);
    let country = {};

    if (countries[rand]) {
      country = {
        name: countries[rand].properties.name,
        code: countries[rand].properties.code,
      };
    }

    this.state = {
      country,
      animate: true,
    };
  }

  onChange = (country) => {
    this.setState({
      country,
      animate: false,
    });
  };

  render() {
    const {
      className,
      type,
      size,
      home,
      translate: { header, text },
      countries,
      roaming,
    } = this.props;
    const { onChange } = this;
    const { country, animate } = this.state;
    const autoCompleteCountries = filteredData(countries);
    let currentRoaming = country.code && roaming.find(r => r.code === country.code);
    currentRoaming = currentRoaming || {};

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
          <Select
            className="select_roaming"
            onSelect={onChange}
            data={{ items: autoCompleteCountries }}
            value={country}
          />
        </div>
        <div
          className={cs('earth-tariff__numbers', {
            'earth-tariff__numbers_show': !!country.code,
          })}
        >
          {
            currentRoaming.internet &&
            <div className="earth-tariff__row">
              <div className="earth-tariff__cell earth-tariff__cell_small">Интернет</div>
              <div className="earth-tariff__cell earth-tariff__cell_big">
                {currentRoaming.internet.mb.price} ₽ / МБ
              </div>
              <div className="earth-tariff__cell earth-tariff__cell_small">
                Или {
                  currentRoaming.internet.packet.price
                } ₽ / {currentRoaming.internet.packet.size} ГБ
              </div>
            </div>
          }
          {
            currentRoaming.calls &&
            <div className="earth-tariff__row">
              <div className="earth-tariff__cell earth-tariff__cell_small">Звонки</div>
              <div className="earth-tariff__cell earth-tariff__cell_big">
                {currentRoaming.calls.price} ₽ / мин.
              </div>
            </div>
          }
          {
            currentRoaming.sms &&
            <div className="earth-tariff__row">
              <div className="earth-tariff__cell earth-tariff__cell_small">Сообщения</div>
              <div className="earth-tariff__cell earth-tariff__cell_big">
                {currentRoaming.sms.price} ₽ / СМС
              </div>
            </div>
          }
        </div>
        <Earth style={type} size={size} country={animate ? {} : country} features={countries} />
      </div>
    );
  }
}

EarthTariff.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  home: PropTypes.bool,
  translate: PropTypes.shape(),
  countries: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  roaming: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

EarthTariff.defaultProps = {
  className: '',
  home: false,
  translate: {},
};

export default EarthTariff;
