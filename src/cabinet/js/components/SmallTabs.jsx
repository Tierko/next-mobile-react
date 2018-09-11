import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const SmallTabs = ({
  onChange,
  active,
  items,
  className,
}) => (
  <div className={`small-tabs ${className}`}>
    {
      items && items.map(i => (
        <div
          key={i.id}
          onClick={() => onChange(i.id)}
          className={cs('small-tabs__item', { 'small-tabs__item_active': active === i.id })}
        >
          {i.title}
        </div>
      ))
    }
  </div>
);

SmallTabs.propTypes = {
  onChange: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  className: PropTypes.string,
};

SmallTabs.defaultProps = {
  className: '',
};

export default SmallTabs;
