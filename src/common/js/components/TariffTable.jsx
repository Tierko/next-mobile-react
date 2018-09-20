import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Link } from 'react-router-dom';
import Button from './Button';
import Radio from './Radio';
import { formatCost } from '../../../cabinet/js/utils';

const tariffs = [{
  id: 1,
  title: 'СуперВИП',
  payment: 3000,
  internet: 32,
  nextCalls: 'Безлимит',
  calls: 700,
  sms: 'Безлимит',
  transition: 0,
}, {
  id: 2,
  current: false,
  title: 'Премиум',
  payment: 2000,
  internet: 16,
  calls: 700,
  nextCalls: 700,
  sms: 'Безлимит',
  transition: 0,
}, {
  id: 3,
  current: false,
  title: 'Лайт',
  payment: 1500,
  internet: 8,
  calls: 700,
  nextCalls: 700,
  sms: 'Безлимит',
  transition: 0,
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
  }, {
    id: 6,
    title: 'Стоимость перехода на тариф',
    unit: '',
    field: 'transition',
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
        <div
          className={cs('tariff-table__title', {
            'tariff-table__title_show': isDetail,
          })}
        >
          {row.title}
        </div>
        <div
          className={cs('tariff-table__cells', {
            'tariff-table__cells_hidden': row.field === 'transition' && !isDetail,
            'tariff-table__cells_cost-home': isHome,
          })}
        >
          {
            data.map(d => (
              <div key={d.id} className="tariff-table__cell">
                {
                  row.field === 'payment' || row.field === 'transition' ?
                    <span className={cs('tariff-table__cost', { 'tariff-table__cost_home': isHome })}>
                      {formatCost(d[row.field], true)}
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
      current,
      onChange,
      home,
      tariff,
      signUp,
      className,
      to,
    } = this.props;
    const isDetail = this.state.mode === 'detail';
    const currentTariff = tariffs.find(d => d.id === current);
    const dataFiltered = currentTariff && !signUp ?
      [currentTariff, ...tariffs.filter(d => d.id !== current)] : tariffs;

    return (
      <div className={cs(`tariff-table ${className}`, { 'tariff-table_home': home })}>
        <div className={cs('tariff-table__inner', { 'tariff-table__inner_to': !!to })}>
          <div className="tariff-table__row">
            <div className={cs('tariff-table__names', { 'tariff-table__names_tariff': tariff })}>
              {
                !signUp && dataFiltered.map(d => (
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
                      {
                        tariff && to &&
                        <Button onClick={() => to(d.id)} className="button_tariff-table">Перейти</Button>
                      }
                    </div>
                ))
              }
              {
                signUp && dataFiltered.map(d => (
                  <Radio
                    name="current"
                    value={d.id}
                    selected={current}
                    onChange={onChange}
                    className="radio_tariff"
                  >
                    {d.title}
                  </Radio>
                ))
              }
            </div>
            {
              !home && !tariff && !signUp &&
              <div className="tariff-table__actions">
                {
                  dataFiltered.map(d => (
                    <div key={d.id} className="tariff-table__action">
                      {
                        d.id === current ?
                          <span className="tariff-table__current">Ваш текущий тариф</span> :
                          <Button className="button_tariff-change" onClick={() => onChange && onChange(d.id)}>Перейти</Button>
                      }
                    </div>
                  ))
                }
              </div>
            }
          </div>
          {
            rows.map(r => (
              <RenderRow
                key={r.id}
                data={dataFiltered}
                row={r}
                isDetail={isDetail}
                isHome={home}
              />
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
  current: PropTypes.number,
  onChange: PropTypes.func,
  home: PropTypes.bool,
  tariff: PropTypes.bool,
  signUp: PropTypes.bool,
  mode: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.func,
};

TariffTable.defaultProps = {
  current: -1,
  onChange: null,
  home: false,
  tariff: false,
  signUp: false,
  mode: 'short',
  className: '',
  to: null,
};

export default TariffTable;
