import React from 'react';
import PropTypes from 'prop-types';
import CheckboxSlide from './CheckboxSlide';

const TariffServices = ({ services, onChange }) => (
  <div className="tariff-services">
    <div className="tariff-services__header">
      Услуги
    </div>
    {
      services.map(s => (
        <div key={s.id} className="tariff-service">
          <div className="tariff-service__control">
            <div className="tariff-service__name">
              {s.name}
            </div>
            <CheckboxSlide value={s.checked} name="tariff" onChange={(n, v) => onChange(s.id, v)} />
          </div>
          <div className="tariff-service__desc">{s.desc}</div>
          <div className="tariff-service__price">{s.price}</div>
        </div>
      ))
    }
  </div>
);

TariffServices.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TariffServices;
