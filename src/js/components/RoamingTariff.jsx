import React from 'react';
import PropTypes from 'prop-types';

const RoamingTariff = ({ data }) => (
  <div className="roaming-tariff">
    {
      data.map(i => (
        <div key={i.id} className="roaming-tariff__item">
          <div className="roaming-tariff__title">{i.title}</div>
          <div className="roaming-tariff__content">
            {
              i.items.map(r => (
                <div key={r.id} className="roaming-tariff__row">
                  <div className="roaming-tariff__area">{r.title}</div>
                  <div className="roaming-tariff__cost">
                    {r.from && 'от '}{r.cost}<span> / {r.unit}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      ))
    }
  </div>
);

RoamingTariff.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RoamingTariff;
