import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import ProgressLinear from './ProgressLinear';
import { Pages } from '../constants';
import { formatCost } from '../utils';

const Package = ({
  data,
  remain,
  simple,
  fast,
}) => {
  let { max, current } = remain;

  if (remain.packages) {
    max += remain.packages.reduce((acc, item) => (acc + item.max), 0);
    current += remain.packages.reduce((acc, item) => (acc + item.current), 0);
  }

  return (
    <div className="package">
      {
        !simple &&
        <Fragment>
          <div className="package__title">
            {data.title}:<span> {current.toString().replace('.', ',')} из&nbsp;{max} {data.unit}</span>
          </div>
          <ProgressLinear className="progress-linear_add-package" current={current} max={max} />
        </Fragment>
      }
      {
        simple &&
        <Fragment>
          <div className="package__title">
            {data.title}
          </div>
          <div className="package__desc">
            {data.desc}
          </div>
        </Fragment>
      }
      <div className="package__table">
        {
          data.items.map(i => (
            <div className={cs('package__row', { package__row_simple: simple })} key={i.id} >
              <div className={cs('package__cell package__cell_count', { 'package__cell_count-fast': fast })}>
                <span>+ {i.count} {data.unit}</span>
              </div>
              <div className="package__cell package__cell_period">{i.period}&nbsp;дней</div>
              <div className="package__cell package__cell_price">{formatCost(i.price)}</div>
              <div className="package__cell package__cell_action">
                <Link
                  className="package__link"
                  to={{ pathname: Pages.CONFIRM, state: { sum: i.price, pack: `${i.count} ${data.unit} ${data.title_}` } }}
                >
                  Купить...
                </Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

Package.propTypes = {
  data: PropTypes.shape().isRequired,
  remain: PropTypes.shape().isRequired,
  simple: PropTypes.bool,
  fast: PropTypes.bool,
};

Package.defaultProps = {
  simple: false,
  fast: false,
};

export default Package;
