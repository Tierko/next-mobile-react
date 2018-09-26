import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/js/components/Button';

const Club = ({ to, className, data }) => {
  const { header, text, btn } = data;

  if (!header || !text || !btn) {
    return false;
  }

  return (
    <div className={`club ${className}`}>
      <div className="club__inner">
        <div className="club__header" dangerouslySetInnerHTML={{ __html: header }} />
        <div className="club__text" dangerouslySetInnerHTML={{ __html: text }} />
        <Button className="button_light button_club" onClick={to}>
          <div dangerouslySetInnerHTML={{ __html: btn }} />
        </Button>
      </div>
    </div>
  );
};

Club.propTypes = {
  to: PropTypes.func.isRequired,
  className: PropTypes.string,
  data: PropTypes.shape().isRequired,
};

Club.defaultProps = {
  className: '',
  data: {},
};

export default Club;
