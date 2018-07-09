import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const Tabs = ({ tabs, active, onTabChange }) => (
  <div className="tabs">
    {
      tabs.map(t => (
        <div
          key={t.id}
          className={cs('tab', { tab_active: t.id === active })}
          onClick={() => onTabChange(t.id)}
          role="button"
        >
          {t.name}
        </div>
      ))
    }
  </div>
);

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  active: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default Tabs;
