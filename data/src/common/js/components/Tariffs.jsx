import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TariffsItem from './TariffsItem';

const localTariffs = [{
  id: 37,
  title: 'СуперВИП',
  payment: 3000,
  internet: 32,
  nextCalls: 'Безлимит',
  calls: 700,
  sms: 'Безлимит',
  transition: 0,
  over: {
    internet: 3,
    sms: 3,
    calls: 3,
  },
}, {
  id: 38,
  current: false,
  title: 'Премиум',
  payment: 2000,
  internet: 16,
  calls: 700,
  nextCalls: 700,
  sms: 'Безлимит',
  transition: 0,
  over: {
    internet: 2,
    sms: 2,
    calls: 2,
  },
}, {
  id: 39,
  current: false,
  title: 'Лайт',
  payment: 1500,
  internet: 8,
  calls: 700,
  nextCalls: 700,
  sms: 'Безлимит',
  transition: 0,
  over: {
    internet: 1,
    sms: 1,
    calls: 1,
  },
}];


class TariffTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: props.mode,
    };
  }

  state = {
    mode: 'short',
  };

  toggleMode = () => {
    const { mode } = this.state;

    this.setState({
      mode: mode === 'short' ? 'detail' : 'short',
    });
  };

  filter = (current, all) => {
    const min = all.reduce((acc, item) => {
      if (acc === -1) {
        return item.payment;
      }

      if (item.payment < acc) {
        return item.payment;
      }

      return acc;
    }, -1);
    const filtered = all.filter(t => t.id !== current.id);

    filtered.sort();

    if (current.payment === min) {
      filtered.reverse();
    }

    return [current, ...filtered];
  };

  render() {
    const { toggleMode, filter } = this;
    const {
      current,
      onChange,
      home,
      tariff,
      className,
      data,
    } = this.props;
    const isDetail = this.state.mode === 'detail';
    const tariffs = data || localTariffs;
    const currentTariff = tariffs.find(d => d.id === current);
    const dataFiltered = currentTariff ? filter(currentTariff, tariffs) : tariffs;

    return (
      <div className={`tariffs ${className}`}>
        <div className="tariffs__inner">
          <div className="tariffs__wrapper">
            <div className="tariffs__items">
              {
                dataFiltered.map((t, i) => (
                  <TariffsItem
                    key={t.id}
                    onClick={onChange}
                    isDetail={isDetail}
                    data={t}
                    current={currentTariff}
                    index={i}
                  />
                ))
              }
            </div>
          </div>
          {
            !home && !tariff &&
            <div className="tariff-table__toggle" onClick={toggleMode}>
              {
                isDetail ? 'Краткая информация' : 'Подробная информация'
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

TariffTable.propTypes = {
  current: PropTypes.number,
  onChange: PropTypes.func,
  home: PropTypes.bool,
  tariff: PropTypes.bool,
  mode: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
};

TariffTable.defaultProps = {
  current: -1,
  onChange: null,
  home: false,
  tariff: false,
  mode: 'short',
  className: '',
  data: null,
};

export default TariffTable;
