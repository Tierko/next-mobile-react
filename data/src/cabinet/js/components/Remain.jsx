import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import ProgressLinear from './ProgressLinear';
import Button from '../../../common/js/components/Button';
import { Pages, MONTHS_M } from '../constants';

const Remain = ({
  data,
  buy,
  tariff,
}) => (
  <div className="block block_round">
    <div className="block__header">
      <div>Остаток по тарифу</div>
      <Link className="remain__header-link" to={Pages.SERVICES}>«{tariff.name}»</Link>
    </div>
    {
      data.map(product => {
        const { type, base, remain, unit, packages } = product;
        const additionalPackages = packages.filter(p => p.additional === true);
        const max = Number(base);
        const current = Number(remain);

        return (
          <div key={type.code} className="remain__item">
            <div className="remain__desc">
              {
                max > 0 &&
                <div>
                  <span>{current.toString().replace('.', ',')}</span> из {max} {unit}
                </div>
              }
              {
                max === 0 &&
                <div>
                  <span>Безлимит {unit}</span>
                </div>
              }
              {
                type.link ?
                  <Link className={cs('remain__service', { remain__service_link: type.link })} to={`${Pages.MORE}/${type.code}`}>
                    {type.name}
                  </Link>
                  :
                  <div className="remain__service">{type.name}</div>
              }
            </div>
            <ProgressLinear
              color="red"
              max={max}
              current={current}
              x
            />
            {
              additionalPackages && additionalPackages.map(p => {
                const renewalDate = new Date(p.renewal);
                const day = renewalDate.getDay();
                const month = renewalDate.getDay();

                return <div className="remain__package">Включая {`${p.remain} из ${p.base} ${p.unit} до ${day} ${MONTHS_M[month]}`}</div>;
              })
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
  tariff: PropTypes.shape().isRequired,
  buy: PropTypes.func.isRequired,
};

export default Remain;
