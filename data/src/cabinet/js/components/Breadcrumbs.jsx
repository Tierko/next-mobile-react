import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ className, items, current }) => {
  const el = Array((items.length * 2)).fill(null).map((_, i) => {
    if (i % 2 === 0) {
      const item = items[i / 2];

      return (
        <Link key={item.link} to={item.link} className="breadcrumbs__link">
          {item.title}
        </Link>
      );
    }

    return (
      <div className="breadcrumbs__arrow" />
    );
  });

  if (!items.length) {
    return false;
  }

  return (
    <div className={`breadcrumbs ${className}`}>
      {el}
      <div>{current}</div>
    </div>
  );
};

Breadcrumbs.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  current: PropTypes.string.isRequired,
};

Breadcrumbs.defaultProps = {
  className: '',
};

export default Breadcrumbs;
