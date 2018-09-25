import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/js/components/Button';

const Club = ({ to, className, data }) => (
  <div className={`club ${className}`}>
    <div className="club__inner">
      <div className="club__header" dangerouslySetInnerHTML={{ __html: data.club_header }} />
      <div className="club__text" dangerouslySetInnerHTML={{ __html: data.club_text }} />
      <Button className="button_light button_club" onClick={to}>
        <div dangerouslySetInnerHTML={{ __html: data.club_btn }} />
      </Button>
    </div>
  </div>
);

Club.propTypes = {
  to: PropTypes.func.isRequired,
  className: PropTypes.string,
  data: PropTypes.shape().isRequired,
};

Club.defaultProps = {
  className: '',
};

export default Club;
