import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import ProgressLinear from './ProgressLinear';
import Button from '../../../common/js/components/Button';
import { Pages } from '../constants';

const Remain = ({
  data,
  buy,
}) => (
  <div className="block">
    <div className="block__header">
      Остаток до 16 ноября
    </div>
    {
      data.map(i => (
        <div key={i.id} className="remain__item">
          <div className="remain__desc">
            {
              i.max > 0 &&
              <div>
                <span>{i.current.toString().replace('.', ',')}</span> из {i.max} {i.unit}
              </div>
            }
            {
              i.max === 0 &&
              <div>
                <span>Безлимит {i.unit}</span>
              </div>
            }
            {
              i.link ?
                <Link className={cs('remain__service', { remain__service_link: i.link })} to={`${Pages.MORE}/${i.type}`}>
                  {i.name}
                </Link>
                :
                <div className="remain__service">{i.name}</div>
            }
          </div>
          <ProgressLinear
            color="red"
            max={i.max}
            current={i.current}
            x
          />
        </div>
      ))
    }
    <Button className="button_remain" onClick={buy} primary>Докупить…</Button>
  </div>
);

Remain.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  buy: PropTypes.func.isRequired,
};

export default Remain;
