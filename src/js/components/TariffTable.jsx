import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Button from '../components/Button';
import { formatCost } from '../utils';

class TariffTable extends Component {
  state = {
    mode: 'short',
  };

  rows = [{
    id: 1,
    title: 'Абонентская плата',
    unit: ' / месяц',
    field: 'payment',
  }, {
    id: 2,
    title: 'Интернет',
    unit: 'ГБ',
    field: 'internet',
  }, {
    id: 3,
    title: 'Звонков на «Next» по России',
    unit: 'мин.',
    field: 'nextCalls',
    shortHide: true,
  }, {
    id: 4,
    title: 'Звонков на всех операторов Москвы по всей России',
    unit: 'мин.',
    field: 'calls',
  }, {
    id: 5,
    title: 'СМС на всех операторов Москвы по всей России',
    unit: 'СМС',
    field: 'sms',
  }];

  RenderRow = ({ data, row, isDetail }) => {
    if (row.shortHide) {
      return null;
    }

    return (
      <div className={cs('tariff-table__row', { 'tariff-table__row_detail': isDetail })}>
        <div className={cs('tariff-table__title', { 'tariff-table__title_show': isDetail })}>
          {row.title}
        </div>
        <div className="tariff-table__cells">
          {
            data.map(d => (
              <div key={d.id} className="tariff-table__cell">
                {row.field === 'payment' ? formatCost(d[row.field]) : d[row.field]} {row.unit}
              </div>
            ))
          }
        </div>
      </div>
    );
  };

  toggleMode = () => {
    const { mode } = this.state;

    this.setState({
      mode: mode === 'short' ? 'detail' : 'short',
    });
  };

  render() {
    const { toggleMode, rows, RenderRow } = this;
    const { data, current, onChange } = this.props;
    const isDetail = this.state.mode === 'detail';
    const currentTariff = data.find(d => d.id === current);
    const dataFiltered = [currentTariff, ...data.filter(d => d.id !== current)];

    return (
      <div className="tariff-table">
        <div className="tariff-table__inner">
          <div className="tariff-table__row">
            <div className="tariff-table__names">
              {
                dataFiltered.map(d => (
                  <div key={d.id} className={cs('tariff-table__name', { 'tariff-table__name_active': d.id === current })}>
                    <span>{d.title}</span>
                  </div>
                ))
              }
            </div>
            <div className="tariff-table__actions">
              {
                dataFiltered.map(d => (
                  <div key={d.id} className="tariff-table__action">
                    {
                      d.id === current ? 'Текущий тариф' :
                        <Button className="button_tariff-change" onClick={() => onChange(d.id)} borderless>Перейти</Button>
                    }
                  </div>
                ))
              }
            </div>
          </div>
          {
            rows.map(r => (
              <RenderRow key={r.id} data={dataFiltered} row={r} isDetail={isDetail} />
            ))
          }
          <div className="tariff-table__toggle" onClick={toggleMode}>
            {
              isDetail ? 'Краткая информация' : 'Подробная информация'
            }
          </div>
        </div>
      </div>
    );
  }
}

TariffTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TariffTable;
