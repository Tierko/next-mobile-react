import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import ProgressLinear from './ProgressLinear';

const Tabs = ({ tabs, active, onTabChange }) => (
  <div className="tabs">
    <div className="tabs__scroll">
      <div className="tabs__inner">
        {
          tabs.map(t => (
            <div
              key={t.id}
              className={cs('tab', { tab_active: t.id === active })}
              onClick={() => onTabChange(t.id)}
              role="button"
            >
              {
                (t.max > 0 || t.byMegabytes) &&
                <ProgressLinear className="progress-linear_tab" max={t.max} current={t.current} dashed={t.byMegabytes} />
              }
              {t.name}
            </div>
          ))
        }
      </div>
    </div>
  </div>
);

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  active: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default Tabs;
