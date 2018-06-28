import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const PaymentTabs = ({ items, tab, onChange }) => (
  <div className="payment__tabs">
    {
      items.map(t => (
        <div
          key={t.id}
          className={cs('payment__tab', { payment__tab_active: tab === t.id })}
          onClick={onChange}
          data-tab={t.id}
        >
          {t.title}
        </div>
      ))
    }
  </div>
);

PaymentTabs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  tab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PaymentTabs;
