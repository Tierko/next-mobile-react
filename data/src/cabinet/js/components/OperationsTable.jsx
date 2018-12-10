import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Date from './Date';
import Loader from './Loader';
import Select from '../../../common/js/components/Select';
import Button from '../../../common/js/components/Button';
import { formatCost, formatCount } from '../utils';
import { HISTORY_FILTERS, HISTORY_TITLES, MONTHS_M } from '../constants';

const OperationsList = ({
  loaded,
  data,
  onChange,
  periodStart,
  periodEnd,
  filterBy,
  loadMore,
  sort,
  setSort,
}) => (
  <Fragment>
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
              <div
                onClick={() => setSort('date')}
                className={cs(`operations__cell_date-h operations__cell_sort operations__cell_sort-${sort.order}`, {
                  'operations__cell_sort-current': sort.type === 'date'
                })}
              >
                Дата
              </div>
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
              <div
                onClick={() => setSort('cost')}
                className={cs(`operations__cell_date-h operations__cell_sort operations__cell_sort-${sort.order}`, {
                  'operations__cell_sort-current': sort.type === 'cost'
                })}
              >
                Стоимость
              </div>
            </td>
            <td className="operations__cell-empty">&nbsp;</td>
          </tr>
        }
        {
          loaded && data.map(d => (
            <tr key={d.id} className="operations__row">
              <td className="operations__cell-empty">&nbsp;</td>
              {
                <td>
                  <div className="operations__cell operations__cell_date">
                    {`${d.date.day} ${MONTHS_M[d.date.month]}`}
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
          !data.length && loaded &&
          <tr>
            <td colSpan={7} className="operations__empty">
              У&nbsp;вас нет данных за&nbsp;указанный период
            </td>
          </tr>
        }
        {
          data && loaded &&
          <tr>
            <td colSpan={7} className="operations__cell_button">
              <Button onClick={loadMore} primary>Загрузить еще</Button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  </Fragment>
);

OperationsList.propTypes = {
  loaded: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onChange: PropTypes.func.isRequired,
  periodStart: PropTypes.shape().isRequired,
  periodEnd: PropTypes.shape().isRequired,
  filterBy: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
  sort: PropTypes.shape().isRequired,
  setSort: PropTypes.func.isRequired,
};

export default OperationsList;
