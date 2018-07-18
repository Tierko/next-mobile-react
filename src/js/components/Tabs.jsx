import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import ProgressLinear from './ProgressLinear';

const Tabs = ({
  tabs,
  active,
  onTabChange,
  disable,
}) => (
  <div className="tabs">
    <div className="tabs__scroll">
      <div className="tabs__inner">
        {
          tabs.map(t => (
            <div
              key={t.id}
              className={cs('tab', { tab_active: t.id === active, tab_disable: disable })}
              onClick={() => onTabChange(t.id)}
              role="button"
            >
              {
                (t.additionalPackage || t.byMegabytes) && !disable &&
                <ProgressLinear
                  className="progress-linear_tab"
                  max={(t.additionalPackage && t.additionalPackage.max) || 0}
                  current={(t.additionalPackage && t.additionalPackage.current) || 0}
                  dashed={t.byMegabytes}
                />
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
  disable: PropTypes.bool.isRequired,
};

export default Tabs;
