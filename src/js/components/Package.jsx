import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProgressLinear from './ProgressLinear';
import { Pages } from '../constants';

const Package = ({ data, simple }) => (
  <div className="package">
    {
      !simple &&
      <Fragment>
        <div className="package__title">
          {data.title}:<span> {data.current.toString().replace('.', ',')} {data.unit} из {data.max}</span>
        </div>
        <ProgressLinear className="progress-linear_add-package" current={data.current} max={data.max} />
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
          <div className="package__row" key={i.id} >
            <div className="package__cell package__cell_count">+ {i.count} {data.unit}</div>
            <div className="package__cell package__cell_period">{i.period} дней</div>
            <div className="package__cell package__cell_price">{i.price} ₽</div>
            <Link
              className="package__cell package__cell_action"
              to={{ pathname: Pages.PayPackage, state: { sum: i.price, pack: `${i.count} ${data.unit} ${data.title_}` } }}
            >
              Купить
            </Link>
          </div>
        ))
      }
    </div>
  </div>
);

Package.propTypes = {
  data: PropTypes.shape().isRequired,
  simple: PropTypes.bool,
};

Package.defaultProps = {
  simple: false,
};

export default Package;
