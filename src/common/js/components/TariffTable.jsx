import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Link } from 'react-router-dom';
import Button from './Button';
import { formatCost } from '../../../cabinet/js/utils';

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

  rows = [{
    id: 1,
    title: 'Абонентская плата',
    unit: ' / мес.',
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
    title: 'Минуты разговора при звонках на номера Next Mobile по России',
    unit: 'мин. / мес.',
    field: 'calls',
  }, {
    id: 5,
    title: 'СМС на номера всех операторов по России',
    unit: '',
    field: 'sms',
  }];

  RenderRow = ({
    data,
    row,
    isDetail,
    isHome,
  }) => {
    if (row.shortHide) {
      return null;
    }

    return (
      <div className={cs('tariff-table__row', {
        'tariff-table__row_detail': isDetail,
        'tariff-table__row_home': isHome,
      })}
      >
        <div className={cs('tariff-table__title', { 'tariff-table__title_show': isDetail })}>
          {row.title}
        </div>
        <div className="tariff-table__cells">
          {
            data.map(d => (
              <div key={d.id} className="tariff-table__cell">
                {
                  row.field === 'payment' ?
                    <span className={cs('tariff-table__cost', { 'tariff-table__cost_home': isHome })}>
                      {formatCost(d[row.field])}
                    </span> :
                    d[row.field]
                } {row.unit}
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
    const {
      data,
      current,
      onChange,
      home,
      tariff,
    } = this.props;
    const isDetail = this.state.mode === 'detail';
    const currentTariff = data.find(d => d.id === current);
    const dataFiltered = currentTariff ?
      [currentTariff, ...data.filter(d => d.id !== current)] : data;

    return (
      <div className={cs('tariff-table', { 'tariff-table_home': home })}>
        <div className="tariff-table__inner">
          <div className="tariff-table__row">
            <div className={cs('tariff-table__names', { 'tariff-table__names_tariff': tariff })}>
              {
                dataFiltered.map(d => (
                  home ?
                    <div key={d.id} className="tariff-table__name tariff-table__name_home">
                      <Link to="#" className="home__link">
                        {d.title}
                      </Link>
                    </div> :
                    <div
                      key={d.id}
                      className={cs('tariff-table__name', {
                        'tariff-table__name_active': d.id === current,
                      })}
                    >
                      <span>{d.title}</span>
                    </div>
                ))
              }
            </div>
            {
              !home && !tariff &&
              <div className="tariff-table__actions">
                {
                  dataFiltered.map(d => (
                    <div key={d.id} className="tariff-table__action">
                      {
                        d.id === current ? 'Ваш тариф' :
                          <Button className="button_tariff-change" onClick={() => onChange && onChange(d.id)} borderless>Перейти</Button>
                      }
                    </div>
                  ))
                }
              </div>
            }
          </div>
          {
            rows.map(r => (
              <RenderRow key={r.id} data={dataFiltered} row={r} isDetail={isDetail} isHome={home} />
            ))
          }
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
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  current: PropTypes.number,
  onChange: PropTypes.func,
  home: PropTypes.bool,
  tariff: PropTypes.bool,
  mode: PropTypes.string,
};

TariffTable.defaultProps = {
  current: -1,
  onChange: null,
  home: false,
  tariff: false,
  mode: 'short',
};

export default TariffTable;
