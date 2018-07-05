import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Date from '../components/Date';
import Select from '../components/Select';
import Button from '../components/Button';
import { formatCost } from '../utils';
import {
  historyFilters,
  monthsM,
  historyTitles,
  monthsShort,
} from '../constants';

class Operations extends Component {
  static formatCount = (count, unit) => {
    if (unit === 'time') {
      const sec = count % 60;
      const min = (count - sec) / 60;

      return `${min} мин ${sec} с`;
    }

    return `${count} ${unit}`;
  };

  static sameDateCount = (data, date) => (
    data.reduce((acc, d) => {
      if (d.date.year !== date.year || d.date.month !== date.month || d.date.day !== date.day) {
        return acc;
      }

      return acc + 1;
    }, 0)
  );

  static showDate = (data, index) => {
    const { date } = data[index];

    if (index - 1 < 0) {
      return true;
    }

    const prevDate = data[index - 1].date;

    if (
      date.year === prevDate.year &&
      date.month === prevDate.month &&
      date.day === prevDate.day
    ) {
      return false;
    }

    return true;
  };

  static replaceMonth = (value) => {
    const index = monthsM.findIndex(d => value.indexOf(d) !== -1);

    return value.replace(monthsM[index], monthsShort[index]);
  };

  state = {
    filterBy: historyFilters[0],
    periodStart: '29 сентября 2020',
    periodEnd: '30 сентября 2020',
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  filter = (data) => {
    const { filterBy } = this.state;

    if (filterBy.id === 1) {
      return data;
    }

    return data.filter(d => d.type === filterBy.id);
  };

  loadMore = () => {};

  render() {
    const { onChange, filter, loadMore } = this;
    const { filterBy, periodStart, periodEnd } = this.state;
    const { data } = this.props;
    const filteredData = filter(data);
    const {
      sameDateCount,
      showDate,
      formatCount,
      replaceMonth,
    } = Operations;

    return (
      <div className="operations">
        {
          !filteredData.length &&
          <div className="operations__empty">У вас нет данных за указанный период</div>
        }
        {
          !!filteredData.length &&
          <div className="operations__dates">
            <div className="operations__dates-inner">
              <span className="operations__date-from">с</span>
              <Date
                className="input_operations-date input_operations-date-from"
                onChange={onChange}
                name="periodStart"
                value={periodStart}
              />
              <span className="operations__date-to">по</span>
              <Date
                className="input_operations-date input_operations-date-to"
                onChange={onChange}
                name="periodEnd"
                value={periodEnd}
              />
            </div>
          </div>
        }
        <table className="operations__table" cellSpacing={0} cellPadding={0}>
          <tbody>
            {
              !!filteredData.length &&
              <tr className="operations__row operations__row_header">
                <td className="operations__cell_date">Дата</td>
                <td className="operations__cell_time">Время</td>
                <td className="operations__cell_type">
                  <Select
                    className="select_operations-filter"
                    onSelect={v => onChange('filterBy', v)}
                    items={historyFilters}
                    value={filterBy}
                  />
                </td>
                <td className="operations__cell_count">Количество</td>
                <td className="operations__cell_cost">Стоимость</td>
              </tr>
            }
            {
              filteredData.map((d, i) => (
                <tr key={d.id} className="operations__row">
                  {
                    showDate(filteredData, i) &&
                    <td
                      className="operations__cell operations__cell_date"
                      rowSpan={sameDateCount(filteredData, d.date)}
                    >
                      {d.date.day} {monthsM[d.date.month]}
                    </td>
                  }
                  <td className="operations__cell operations__cell_time">{d.time}</td>
                  <td className="operations__cell operations__cell_type">
                    <div>
                      {historyTitles.find(f => f.id === d.type).title}
                    </div>
                    <div className="operations__note">{d.note}</div>
                  </td>
                  <td className="operations__cell operations__cell_count">
                    {
                      d.count && formatCount(d.count, d.unit)
                    }
                  </td>
                  <td className="operations__cell operations__cell_cost">
                    {formatCost(d.cost)}
                    {
                      d.tariff &&
                      <div className="operations__note">
                        {d.tariff} ₽ / {d.unit === 'time' ? 'мин' : d.unit}
                      </div>
                    }
                  </td>
                </tr>
              ))
            }
            {
              !!filteredData.length &&
              <tr>
                <td colSpan={2}>&nbsp;</td>
                <td className="operations__cell_button">
                  <Button onClick={loadMore}>Загрузить еще</Button>
                </td>
                <td colSpan={2}>&nbsp;</td>
              </tr>
            }
          </tbody>
        </table>
        <div className="operations__list">
          <div className="operations__list-dates">
            <Date
              className="input_operations-date-list"
              onChange={onChange}
              name="periodStart"
              value={replaceMonth(periodStart)}
            />
            <div className="operations__list-dates-divider" />
            <Date
              className="input_operations-date-list"
              onChange={onChange}
              name="periodEnd"
              value={replaceMonth(periodEnd)}
            />
          </div>
          <Select
            className="select_operations-filter-list"
            onSelect={v => onChange('filterBy', v)}
            items={historyFilters}
            value={filterBy}
          />
          {
            filteredData.map((d, i) => (
              <div key={d.id} className="operations__item">
                {
                  showDate(filteredData, i) &&
                  <div className="operations__item-date">{d.date.day} {monthsM[d.date.month]}</div>
                }
                <div className="operations__item-row">
                  <div>{historyTitles.find(f => f.id === d.type).title}</div>
                  <div>{formatCost(d.cost)}</div>
                </div>
                <div className="operations__item-row operations__item-row_gray">
                  <div>{d.note}</div>
                  <div>{d.time}</div>
                </div>
                <div className="operations__item-row operations__item-row_gray">
                  <div>{d.count && formatCount(d.count, d.unit)}</div>
                </div>
              </div>
            ))
          }
          <Button className="button_operations-list" onClick={loadMore}>Загрузить еще</Button>
        </div>
      </div>
    );
  }
}

Operations.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Operations;
