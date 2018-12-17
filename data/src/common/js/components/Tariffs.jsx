import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TariffsItem from './TariffsItem';
import Tabs from '../../../cabinet/js/components/Tabs';

const localTariffs = [{
  id: 37,
  title: 'СуперВИП',
  payment: 3000,
  internet: 32,
  nextCalls: 'Безлимит',
  calls: 700,
  sms: 'Безлимит',
  transition: 0,
  over: [3, 3, 3],
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
  over: [5, 5, 5],
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
  over: [7, 7, 7],
}];


class TariffTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: props.mode,
      selected: 1,
    };
  }

  onSelect = (selected) => {
    this.setState({
      selected,
    });
  };

  toggleMode = (mode) => {
    this.setState({
      mode,
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

  tabs = [{
    title: 'Краткая информация',
    id: 'short',
  }, {
    title: 'Подробная информация',
    id: 'detail',
  }];

  render() {
    const { toggleMode, filter, onSelect, tabs } = this;
    const {
      current,
      onChange,
      className,
      data,
      showTabs,
      allFocus,
      unSelectable,
    } = this.props;
    const { mode, selected } = this.state;
    const isDetail = mode === 'detail';
    const tariffs = data || localTariffs;
    const currentTariff = tariffs.find(d => d.id === current);
    const dataFiltered = currentTariff ? filter(currentTariff, tariffs) : tariffs;

    return (
      <div className={`tariffs ${className}`}>
        {
          showTabs &&
          <Tabs className="tabs_tariffs" onChange={toggleMode} items={tabs} tab={mode} />
        }
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
                    selected={selected}
                    onSelect={onSelect}
                    allFocus={allFocus}
                    unSelectable={unSelectable}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TariffTable.propTypes = {
  current: PropTypes.number,
  onChange: PropTypes.func,
  mode: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape()),
  showTabs: PropTypes.bool,
  allFocus: PropTypes.bool,
  unSelectable: PropTypes.bool,
};

TariffTable.defaultProps = {
  current: -1,
  onChange: () => {},
  mode: 'short',
  className: '',
  data: null,
  showTabs: true,
  allFocus: false,
  unSelectable: false,
};

export default TariffTable;
