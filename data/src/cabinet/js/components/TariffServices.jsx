import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import CheckboxSlide from './CheckboxSlide';

const TariffServices = ({ services, onChange }) => (
  <div className="block tariff-services">
    <div className="tariff-services__header">
      Услуги
    </div>
    {
      services.map((s, i) => (
        <div
          key={s.id}
          className={cs('tariff-service', {
            'tariff-service_first': i === 0,
          })}
        >
          <div className="tariff-service__control">
            <div className="tariff-service__name">
              <span className="tariff-service__name-inner">{s.name}</span>
              {
                s.checked && s.disabled &&
                <span className="tariff-service__spinner">Подключние...</span>
              }
            </div>
            <CheckboxSlide
              className="checkbox-slide_services"
              value={s.checked}
              name="tariff"
              onChange={(n, v) => onChange(s.id, v)}
              disabled={s.disabled}
            />
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
