import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import ProgressLinear from './ProgressLinear';
import Button from './Button';
import { Pages } from '../constants';

const Remain = ({ data, buy }) => (
  <div className="remain">
    <div className="remain__title">
      Остаток до 16 июня по тарифу
      <Link className="link" to={Pages.Services}> «Супервип»</Link>
    </div>
    {
      data.map(i => (
        <div key={i.id} className="remain__item">
          <div className="remain__desc">
            <div><span>{(i.current + '').replace('.', ',')} {i.unit}</span> из {i.max}</div>
            {
              i.link ?
                <Link className={cs('remain__service', { remain__service_link: i.link })} to={Pages.Calls}>{i.name}</Link>
                :
                <div className="remain__service">{i.name}</div>
            }
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
