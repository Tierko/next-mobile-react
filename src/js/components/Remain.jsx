import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProgressLinear from './ProgressLinear';
import Button from './Button';

const Remain = ({ data, buy }) => (
  <div className="remain">
    <div className="remain__title">Остаток до 16 июня по тарифу <a className="link" href="#">«Супервип»</a></div>
    {
      data.map(i => (
        <div key={i.id} className="remain__item">
          <div className="remain__desc">
            <div><span>{(i.current + '').replace('.', ',')} {i.unit}</span> из {i.max}</div>
            <Link className="remain__service" to="#">{i.name}</Link>
          </div>
          <ProgressLinear color="red" max={i.max} current={i.current} />
        </div>
      ))
    }
    <Button onClick={buy}>Докупить…</Button>
  </div>
);

Remain.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  buy: PropTypes.func.isRequired,
};

export default Remain;
