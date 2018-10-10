import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ className, items }) => {
  const el = Array((items.length * 2) - 1).fill(null).map((_, i) => {
    if (i % 2 === 0) {
      const item = items[i / 2];

      return (
        <Link to={item.link} className="breadcrumbs__link">
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
    </div>
  );
};

Breadcrumbs.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

Breadcrumbs.defaultProps = {
  className: '',
};

export default Breadcrumbs;
