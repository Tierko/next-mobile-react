import React from 'react';
import PropTypes from 'prop-types';

const Best = ({ className, translate }) => {
  const { header, text } = translate;

  if (!header && text) {
    return false;
  }

  return (
    <div className={`best ${className}`}>
      <div className="best__header" dangerouslySetInnerHTML={{ __html: translate.header }} />
      <div className="best__text" dangerouslySetInnerHTML={{ __html: translate.text }} />
    </div>
  );
};

Best.propTypes = {
  className: PropTypes.string,
  translate: PropTypes.shape(),
};

Best.defaultProps = {
  className: '',
  translate: {},
};

export default Best;
