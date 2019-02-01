import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';

import Button from '~/common/js/components/Button';

import ProgressLinear from '@cabinet/components/ProgressLinear';

import { Pages } from '~/common/js/constants';

const REMAININGS_DICT = {
  sms: 'СМС',
  internet: 'Интернет',
  calls: 'Звонки',
}

const Remain = ({
  data,
  buy,
  tariff,
  inRoaming,
}) => (
  <div className="block block_round">
    <div className="block__header">
      По&nbsp;тарифу <Link className="link" to={Pages.SERVICES}>«{tariff.name}»</Link>
    </div>
    {
      Object.keys(data).map(key => {
        const currentRemaining = data[key]
        return (
          <div key={key} className="remain__item">
            <div className="remain__desc">
              {
                +currentRemaining.base > 0 &&
                <div>
                  <span>{(+currentRemaining.remain + '').replace('.', ',')}</span> из {+currentRemaining.base} {currentRemaining.unit}
                </div>
              }
              {
                currentRemaining.base === undefined &&
                <div>
                  <span>Безлимит {/* currentRemaining.unit */}</span>
                </div>
              }
              {
                key !== 'sms' ?
                  <Link className={cs('remain__service', 'remain__service_link')} to={`${Pages.MORE}/${key}`}>
                    {REMAININGS_DICT[key]}
                  </Link>
                  :
                  <div className="remain__service">{REMAININGS_DICT[key]}</div>
              }
            </div>
            <ProgressLinear
              color="red"
              max={currentRemaining.base === undefined ? 1 : +currentRemaining.base}
              current={currentRemaining.remain === undefined ? 1 : +currentRemaining.remain}
              x
            />
          </div>
        );
      })
    }
    <Button className="button_remain" onClick={buy} primary>Докупить…</Button>
  </div>
);

Remain.propTypes = {
  data: PropTypes.shape().isRequired,
  tariff: PropTypes.PropTypes.shape().isRequired,
  buy: PropTypes.func.isRequired,
  inRoaming: PropTypes.bool.isRequired,
};

export default Remain;
