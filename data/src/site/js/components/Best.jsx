import React from 'react';
import PropTypes from 'prop-types';

const Best = ({ className, data }) => {
  const { header, text } = data;

  if (!header && text) {
    return false;
  }

  return (
    <div className={`best ${className}`}>
      <div className="best__header" dangerouslySetInnerHTML={{ __html: data.header }} />
      <div className="best__text" dangerouslySetInnerHTML={{ __html: data.text }} />
    </div>
  );
};

Best.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape(),
};

Best.defaultProps = {
  className: '',
  data: {},
};

export default Best;
