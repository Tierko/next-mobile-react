import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import ProgressLinear from './ProgressLinear';
import Button from '../../../common/js/components/Button';
import { Pages } from '../constants';
import { getData } from '../utils';

const Remain = ({
  data,
  buy,
}) => (
  <div className="block block_round">
    <div className="block__header">
      <div>Остаток по тарифу до 25 декабря</div>
      <Link className="remain__header-link" to={Pages.SERVICES}>«{getData('tariff').title}»</Link>
    </div>
    {
      data.map(i => {
        let { max, current } = i;

        if (i.packages) {
          max += i.packages.reduce((acc, item) => (acc + item.max), 0);
          current += i.packages.reduce((acc, item) => (acc + item.current), 0);
        }

        return (
          <div key={i.id} className="remain__item">
            <div className="remain__desc">
              {
                max > 0 &&
                <div>
                  <span>{current.toString().replace('.', ',')}</span> из {max} {i.unit}
                </div>
              }
              {
                max === 0 &&
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
              max={max}
              current={current}
              x
            />
            {
              i.packages && i.packages.map(p => (
                <div className="remain__package">Включая {`${p.current} из ${p.max} ${i.unit} ${p.until}`}</div>
              ))
            }
          </div>
        );
      })
    }
    <Button className="button_remain" onClick={buy} primary>Докупить…</Button>
  </div>
);

Remain.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  buy: PropTypes.func.isRequired,
};

export default Remain;
