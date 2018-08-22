import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ className }) => (
  <div className={`loader ${className}`}>
    <svg className="loader__svg">
      <circle className="loader__circle" cx={30} cy={30} r={28} />
    </svg>
  </div>
);

Loader.propTypes = {
  className: PropTypes.string,
};

Loader.defaultProps = {
  className: '',
};

export default Loader;
