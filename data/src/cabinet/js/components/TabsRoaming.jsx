import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import ProgressLinear from './ProgressLinear';

const TabsRoaming = ({
  tabs,
  active,
  onTabChange,
  disable,
  className,
}) => (
  <div className={`tabs-roaming ${className}`}>
    <div className="tabs-roaming__scroll">
      <div className="tabs-roaming__inner">
        {
          tabs.map(t => (
            <div
              key={t.id}
              className={cs('tabs-roaming__item', {
                'tabs-roaming__item_active': t.id === active,
                'tabs-roaming__item_disable': disable,
              })}
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

TabsRoaming.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  active: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

TabsRoaming.defaultProps = {
  className: '',
};

export default TabsRoaming;
