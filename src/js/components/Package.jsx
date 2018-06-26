import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProgressLinear from './ProgressLinear';
import { Pages } from '../constants';

const Package = ({ data }) => (
  <div className="package">
    <div className="package__title">
      {data.title}:<span> {data.current.toString().replace('.', ',')} {data.unit} из {data.max}</span>
    </div>
    <ProgressLinear className="progress-linear_add-package" current={data.current} max={data.max} />
    <div className="package__table">
      {
        data.items.map(i => (
          <div className="package__row" key={i.id}>
            <div className="package__cell">+ {i.count}</div>
            <div className="package__cell">{i.price} ₽</div>
            <div className="package__cell">
              <Link
                to={{ pathname: Pages.PayPackage, state: { sum: i.price, pack: `${i.count} ${data.unit} ` } }}
                className="link"
              >
                Купить
              </Link>
            </div>
          </div>
        ))
      }
    </div>
  </div>
);

Package.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Package;
