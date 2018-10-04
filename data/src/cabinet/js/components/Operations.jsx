import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Date from './Date';
import Select from '../../../common/js/components/Select';
import Button from '../../../common/js/components/Button';
import Loader from './Loader';
import { formatCost } from '../utils';
import {
  HISTORY_FILTERS,
  HISTORY_TITLES, MONTHS_M,
  MONTHS_SHORT,
  THIRTY_DAYS,
} from '../constants';

class Operations extends Component {
  static formatCount = (count, unit) => {
    if (unit === 'time') {
      const sec = count % 60;
      const min = (count - sec) / 60;

      return `${min} мин. ${sec} сек.`;
    }

    return `${count} ${unit}`;
  };

  static formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${day} ${MONTHS_SHORT[month]} ${year}`;
  };

  static showDate = (data, index) => {
    const { date } = data[index];

    if (index - 1 < 0) {
      return true;
    }

    const prevDate = data[index - 1].date;

    return date.year === prevDate.year &&
      date.month === prevDate.month &&
      date.day === prevDate.day;
  };

  state = {
    filterBy: HISTORY_FILTERS[0],
    periodStart: new window.Date(window.Date.now() - THIRTY_DAYS),
    periodEnd: new window.Date(),
    show: 10,
    loaded: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loaded: true,
      });
    }, 1500);
  }

  onChange = (name, value) => {
    const { periodStart, periodEnd } = this.state;

    if (name === 'periodStart' && value.getTime() >= periodEnd.getTime()) {
      return;
    }

    if (name === 'periodEnd' && value.getTime() <= periodStart.getTime()) {
      return;
    }

    if (name === 'filterBy') {
      this.setState({
        [name]: value,
        loaded: false,
      });

      setTimeout(() => {
        this.setState({
          loaded: true,
        });
      }, 1000);
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  filter = (data) => {
    const { filterBy } = this.state;

    if (filterBy.id === 1) {
      return data;
    }

    return data.filter(d => d.type === filterBy.id);
  };

  loadMore = () => {
    const { show } = this.state;

    this.setState({
      show: show + 10,
    });
  };

  render() {
    const { onChange, filter, loadMore } = this;
    const {
      filterBy,
      periodStart,
      periodEnd,
      show,
      loaded,
    } = this.state;
    const { data } = this.props;
    const filteredData = filter(data).slice(0, show);
    const {
      showDate,
      formatCount,
      formatDate,
    } = Operations;
    const showMoreButton = data.length > show && filteredData.length < filter(data).length;

    return (
      <div className="operations">
        {
          !data.length &&
          <div className="operations__empty">У&nbsp;вас нет данных за&nbsp;указанный период</div>
        }
        {
          !!data.length &&
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
        <table className="operations__table">
          <tbody>
            {
              !!data.length &&
              <tr className="operations__row operations__row_header">
                <td className="operations__cell-empty">&nbsp;</td>
                <td className="operations__td_date">
                  <div className="operations__cell_date-h">Дата</div>
                </td>
                <td className="operations__td_time">
                  <div className="operations__cell_time-h">Время</div>
                </td>
                <td className="operations__td_type">
                  <div className="operations__cell_type-h">
                    <Select
                      className="select_operations-filter"
                      onSelect={v => onChange('filterBy', v)}
                      items={HISTORY_FILTERS}
                      value={filterBy}
                    />
                  </div>
                </td>
                <td className="operations__td_count">
                  <div className="operations__cell_count-h">Количество</div>
                </td>
                <td className="operations__td_cost">
                  <div className="operations__cell_cost-h">Стоимость</div>
                </td>
                <td className="operations__cell-empty">&nbsp;</td>
              </tr>
            }
            {
              loaded && filteredData.map((d, i) => (
                <tr key={d.id} className="operations__row">
                  <td className="operations__cell-empty">&nbsp;</td>
                  {
                    <td>
                      <div
                        className={cs('operations__cell operations__cell_date', { operations__cell_hide: !showDate(filteredData, i) })}
                      >
                        {showDate(filteredData, i) && `${d.date.day} ${MONTHS_M[d.date.month]}`}
                      </div>
                    </td>
                  }
                  <td>
                    <div className="operations__cell operations__cell_time">{d.time}</div>
                  </td>
                  <td>
                    <div className="operations__cell operations__cell_type">
                      <div className={`operations__type operations__type_${d.provider || ''}`}>
                        {HISTORY_TITLES.find(f => f.id === d.type).title}
                      </div>
                      <div className="operations__note">{d.note}</div>
                    </div>
                  </td>
                  <td>
                    <div className="operations__cell operations__cell_count">
                      {d.count && formatCount(d.count, d.unit)}
                    </div>
                  </td>
                  <td>
                    <div className="operations__cell operations__cell_cost">
                      {formatCost(d.cost, true)}
                      {
                        d.tariff &&
                        <div className="operations__note">
                          {d.tariff} ₽ / {d.unit === 'time' ? 'мин.' : d.unit}
                        </div>
                      }
                    </div>
                  </td>
                  <td className="operations__cell-empty">&nbsp;</td>
                </tr>
              ))
            }
            {
              !loaded &&
                <tr>
                  <td colSpan={7}>
                    <div className="operations__loader">
                      <Loader className="loader_operations" />
                      <div>Подгружаем данные за&nbsp;выбранный период</div>
                    </div>
                  </td>
                </tr>
            }
            {
              !filteredData.length && loaded &&
                <tr>
                  <td colSpan={7} className="operations__empty">
                    У&nbsp;вас нет данных за&nbsp;указанный период
                  </td>
                </tr>
            }
            {
              showMoreButton && loaded &&
              <tr>
                <td colSpan={7} className="operations__cell_button">
                  <Button onClick={loadMore}>Загрузить еще</Button>
                </td>
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
              value={periodStart}
              formatter={formatDate}
            />
            <div className="operations__list-dates-divider" />
            <Date
              className="input_operations-date-list"
              onChange={onChange}
              name="periodEnd"
              value={periodEnd}
              formatter={formatDate}
            />
          </div>
          <Select
            className="select_operations-filter-list"
            onSelect={v => onChange('filterBy', v)}
            items={HISTORY_FILTERS}
            value={filterBy}
          />
          {
            loaded && filteredData.map((d, i) => (
              <div key={d.id} className="operations__item">
                {
                  showDate(filteredData, i) &&
                  <div className="operations__item-date">{d.date.day}&nbsp;{MONTHS_M[d.date.month]}</div>
                }
                <div className="operations__item-row">
                  <div>{HISTORY_TITLES.find(f => f.id === d.type).title}</div>
                  <div>{formatCost(d.cost, true)}</div>
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
          {
            loaded && !filteredData.length &&
            <div className="operations__list-empty">У&nbsp;вас нет данных за&nbsp;указанный период</div>
          }
          {
            loaded && showMoreButton &&
            <Button className="button_operations-list" onClick={loadMore}>Загрузить еще</Button>
          }
          {
            !loaded &&
            <div className="operations__loader">
              <Loader className="loader_operations" />
              <div>Подгружаем данные за&nbsp;выбранный период</div>
            </div>
          }
        </div>
      </div>
    );
  }
}

Operations.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Operations;
