import React from 'react';
import PropTypes from 'prop-types';
import Transitions from './Transitions';
import { formatCost } from '../utils';

const fields = [{
  id: 1,
  field: 'payment',
  title: 'Абонентская плата',
  unit: ' / мес.',
}, {
  id: 2,
  field: 'internet',
  title: 'Интернет',
  unit: 'ГБ',
}, {
  id: 3,
  field: 'nextCalls',
  title: 'Звонков на «Next» по России',
  unit: 'мин.',
}, {
  id: 4,
  field: 'calls',
  title: 'Звонков на всех операторов Москвы по всей России',
  unit: 'мин. / мес.',
}, {
  id: 5,
  field: 'sms',
  title: 'СМС на всех операторов Москвы по всей России',
  unit: 'СМС',
}];

const SignUpTariff = ({ tariff }) => (
  <Transitions>
    <div className="sign-up-tariff">
      <div className="sign-up-tariff__header">Тариф {tariff.title}</div>
      {
        fields.map(f => (
          <div key={f.id} className="sign-up-tariff__row">
            <div className="sign-up-tariff__row-title">{f.title}</div>
            <div className="sign-up-tariff__row-value">
              {f.field === 'payment' ? formatCost(tariff[f.field]) : tariff[f.field]} {f.unit || ''}
            </div>
          </div>
        ))
      }
    </div>
  </Transitions>
);

SignUpTariff.propTypes = {
  tariff: PropTypes.shape().isRequired,
};

export default SignUpTariff;
