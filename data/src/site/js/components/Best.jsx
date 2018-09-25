import React from 'react';
import PropTypes from 'prop-types';

const Best = ({ className, data }) => (
  <div className={`best ${className}`}>
    <div className="best__header" dangerouslySetInnerHTML={{ __html: data.best_header }} />
    <div className="best__text" dangerouslySetInnerHTML={{ __html: data.best_text }} />
  </div>
);

Best.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape().isRequired,
};

Best.defaultProps = {
  className: '',
};

export default Best;
