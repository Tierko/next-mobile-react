import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grade from './Grade';
import { formatCost, formatCount, showDate } from '../utils';
import { Pages, MONTHS, MONTHS_M, HISTORY_TITLES } from '../constants';

class History extends Component {
  constructor(props) {
    const { data } = props;
    super(props);
    this.state = {
      selected: data.length ? data[data.length - 1].id : -1,
    };
  }

  selectMonth = ({ id }) => {
    this.setState({
      selected: id,
    });
  };

  render() {
    const { data, operations } = this.props;
    const { selected } = this.state;
    const { selectMonth } = this;
    const selectedItem = data.find(i => i.id === selected);
    const cost = selectedItem ? selectedItem.expense.reduce((acc, d) => (acc + d.cost), 0) : 0;

    return (
      <div className="block block_round">
        {
          selectedItem &&
          <Fragment>
            <div className="block__header">
              <Link className="link" to={Pages.HISTORY}>Расходы</Link>
            </div>
            <Grade data={data} onItemSelect={selectMonth} wide />
            <div className="history__expense">
              <span>&minus;</span>{formatCost(cost, true)} за&nbsp;{MONTHS[selectedItem.date.month].toLowerCase()}
            </div>
            {
              !!operations.length &&
                <table className="operations__table">
                  <tbody>
                    {operations.slice(0, 4).map(d => (
                      <Fragment>
                        <tr key={d.id} className="operations__row">
                          <td className="operations__cell-empty">&nbsp;</td>
                          <td colSpan={4}>
                            <div className="operations__cell operations__cell_date">
                              {`${d.date.day} ${MONTHS_M[d.date.month]}`}
                            </div>
                          </td>
                          <td className="operations__cell-empty">&nbsp;</td>
                        </tr>
                        <tr key={d.id} className="operations__row">
                          <td className="operations__cell-empty">&nbsp;</td>
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
                      </Fragment>
                    ))}
                  </tbody>
                </table>
            }
            {
              !!operations.length &&
              <div className="operations__list">
                {
                  operations.slice(0, 4).map((d, i) => (
                    <div key={d.id} className="operations__item">
                      {
                        showDate(operations, i) &&
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
              </div>
            }
          </Fragment>
        }
        {
          !selectedItem &&
          <div className="history__title">У&nbsp;вас пока нет расходов</div>
        }
      </div>
    );
  }
}

History.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  operations: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default History;
