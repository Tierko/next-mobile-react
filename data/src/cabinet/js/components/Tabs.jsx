import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const Tabs = ({
  items,
  tab,
  onChange,
  className,
}) => (
  <div className={`tabs ${className}`}>
    {
      items.map(t => (
        <div
          key={t.id}
          className={cs('tabs__item', { tabs__item_active: tab === t.id })}
          onClick={onChange}
          data-tab={t.id}
        >
          <span>
            {t.title}
          </span>
        </div>
      ))
    }
  </div>
);

Tabs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  tab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Tabs.defaultProps = {
  className: '',
};

export default Tabs;
