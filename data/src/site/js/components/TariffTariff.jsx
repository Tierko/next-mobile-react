import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from '../components/SelectCalls';
import Tariffs from '../../../common/js/components/Tariffs';

import Button from '../../../common/js/components/Button';

export function dataBuffer() {
  const interCallsData = {
    groups: {},
    items: [],
    rand: 0,
  };

  return (countries, interCalls) => {
    if (!interCallsData.items.length && countries.length && interCalls.items && interCalls.items.length) {
      return {
        groups: Object.assign({}, interCalls.groups),
        items: interCalls.items.map((item) => {
          const country = countries.find(c => c.properties.code === item.code);

          if (country) {
            item.code = country.properties.code;
            item.name = country.properties.name;
          }

          return item;
        }),
      };
    }

    return interCallsData;
  };
}

const mergeDate = dataBuffer();

class TariffTariff extends Component {
  state = {
    country: {},
  };

  componentDidMount() {
    this.setState({
      rand: Math.floor(Math.random() * (100)),
    });
  }

  onChange = (country) => {
    this.setState({ country });
  };

  render() {
    const {
      to,
      toTariff,
      r,
      tariffs,
      translate,
      interCalls,
      countries,
    } = this.props;
    const { header, btn, note } = translate;
    const { onChange } = this;
    const { country, rand } = this.state;
    const data = mergeDate(countries, interCalls);
    const countriesFiltered = data.items.filter(c => !!c.name);

    if (!header || !btn || !note) {
      return false;
    }

    return (
      <div className="tariff-tariff">
        <div
          className="tariff-tariff__header"
          dangerouslySetInnerHTML={{ __html: header }}
        />
        <Tariffs
          data={tariffs}
          mode="detail"
          showTabs={false}
          className="tariffs_tariffs"
          onChange={toTariff}
          allFocus
          unSelectable={r === 1}
        />
        {
          r === 1 &&
          <Fragment>

            <Button onClick={to} primary>
              <span dangerouslySetInnerHTML={{ __html: btn }} />
            </Button>
            <div
              className="tariff-tariff__note"
              dangerouslySetInnerHTML={{ __html: note }}
            />
          </Fragment>
        }
        <div className="tariff-tariff__inter-calls">
          <div className="tariff-tariff__inter-calls-title">Звонки за границу:</div>
          <Select onSelect={onChange} value={country}  data={data} />
        </div>
        {
          countriesFiltered && !!countriesFiltered.length && country.code &&
          <div className="tariff-tariff__random">
            {
              countriesFiltered.slice(rand, rand + 3).map(c => {
                const cost = data.groups && c.group ? `${data.groups[c.group].price} ₽/мин.` : ' ';

                return (
                  <div className="tariff-tariff__random-item">
                    <img src={`/media/flags/${c.code}.svg`} alt="" />
                    {c.name.ru} <span>{cost}</span>
                  </div>
                );
              })
            }
            <div className="tariff-tariff__random-note">
              и еще {countriesFiltered.length - 3} стран
            </div>
          </div>
        }
      </div>
    );
  }
}

TariffTariff.propTypes = {
  to: PropTypes.func.isRequired,
  toTariff: PropTypes.func,
  r: PropTypes.number,
  tariffs: PropTypes.arrayOf(PropTypes.shape()),
  translate: PropTypes.shape(),
  interCalls: PropTypes.shape().isRequired,
  countries: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

TariffTariff.defaultProps = {
  toTariff: null,
  r: 0,
  tariffs: [],
  translate: {},
};

export default TariffTariff;
