import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Link } from 'react-router-dom';

class TariffTable extends Component {
  state = {
    mode: 'short',
  };

  rows = [{
    id: 1,
    title: 'Абонентская плата',
    unit: '₽ / месяц',
    field: 'payment',
  }, {
    id: 2,
    title: 'Интернет',
    unit: 'ГБ',
    field: 'internet',
  }, {
    id: 3,
    title: 'Звонков на «Next» по России',
    unit: 'МИН',
    field: 'nextCalls',
    shortHide: true,
  }, {
    id: 4,
    title: 'Звонков на всех операторов Москвы по всей России',
    unit: 'МИН',
    field: 'calls',
  }, {
    id: 5,
    title: 'СМС на всех операторов Москвы по всей России',
    unit: 'СМС',
    field: 'sms',
  }];

  RenderRow = (data, row, isDetail) => {
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
              <div className="tariff-table__cell">{d[row.field]} {row.unit}</div>
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
    const { data } = this.props;
    const isDetail = this.state.mode === 'detail';

    return (
      <div className="tariff-table">
        <div className="tariff-table__inner">
          <div className="tariff-table__row">
            <div className="tariff-table__names">
              {
                data.map(d => (
                  <div className={cs('tariff-table__name', { 'tariff-table__name_active': d.current })}>
                    <span>{d.title}</span>
                  </div>
                ))
              }
            </div>
            <div className="tariff-table__actions">
              {
                data.map(d => (
                  <div className="tariff-table__action">
                    {d.current ? 'Текущий тариф' : <Link className="link-light" to="#">Перейти</Link>}
                  </div>
                ))
              }
            </div>
          </div>
          {
            rows.map(r => RenderRow(data, r, isDetail))
          }
          <div className="tariff-table__toggle" onClick={toggleMode}>Подробная информация</div>
        </div>
      </div>
    );
  }
}

TariffTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default TariffTable;
