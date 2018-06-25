import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkBack = ({ href, className }) => (
  <Link className={`link-back ${className}`} to={href}>
    <img className="link-back__img" src="/media/icons/back.svg" alt="" />
  </Link>
);

LinkBack.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};

LinkBack.defaultProps = {
  className: '',
};

export default LinkBack;
