import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Date from './Date';
import Loader from './Loader';
import Select from '../../../common/js/components/Select';
import Button from '../../../common/js/components/Button';
import { formatCost, formatCount, showDate } from '../utils';
import { HISTORY_FILTERS, HISTORY_TITLES, MONTHS_M } from '../constants';

const OperationsList = ({
  loaded,
  data,
  onChange,
  periodStart,
  periodEnd,
  formatDate,
  filterBy,
  loadMore,
}) => (
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
    {loaded &&
      data.map((d, i) => (
        <div key={d.id} className="operations__item">
          {showDate(data, i) && (
            <div className="operations__item-date">
              {d.date.day}
              &nbsp;
              {MONTHS_M[d.date.month]},
              &nbsp;
              {d.date.year}
            </div>
          )}
          <div className="operations__item-row">
            <div>{HISTORY_TITLES.find(f => f.id === d.type).title}</div>
            <div
              className={cs('operations__item-cost', {
                'operations__item-cost_pay': d.type === 11,
              })}
            >
              {
                d.type === 11 &&
                  <span>+ </span>
              }
              {formatCost(d.cost, true)}
            </div>
          </div>
          <div className="operations__item-row operations__item-row_gray">
            <div>{d.note}</div>
            <div>{d.time}</div>
          </div>
          <div className="operations__item-row operations__item-row_gray">
            <div>{d.count && formatCount(d.count, d.unit)}</div>
          </div>
        </div>
      ))}
    {loaded &&
      !data.length && (
      <div className="operations__list-empty">
        У&nbsp;вас нет данных за&nbsp;указанный период
      </div>
    )}
    {loaded &&
      data && (
      <Button className="button_operations-list" onClick={loadMore} primary>
        Загрузить еще
      </Button>
    )}
    {!loaded && (
      <div className="operations__loader">
        <Loader className="loader_operations" />
        <div>Подгружаем данные за&nbsp;выбранный период</div>
      </div>
    )}
  </div>
);

OperationsList.propTypes = {
  loaded: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onChange: PropTypes.func.isRequired,
  periodStart: PropTypes.shape().isRequired,
  periodEnd: PropTypes.shape().isRequired,
  formatDate: PropTypes.func.isRequired,
  filterBy: PropTypes.string.isRequired,
  loadMore: PropTypes.func.isRequired,
};

export default OperationsList;
