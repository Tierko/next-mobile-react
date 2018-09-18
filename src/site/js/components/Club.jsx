import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/js/components/Button';

const Club = ({ to, className }) => (
  <div className={`club ${className}`}>
    <div className="club__inner">
      <div className="club__header">Закрытый клуб пользователей</div>
      <div className="club__text">С&nbsp;первыми, кто пришлет заявки на&nbsp;SIM-карту, мы&nbsp;свяжемся и&nbsp;расскажем, как получить полгода бесплатной связи и&nbsp;10&nbsp;персональных приглашений для друзей</div>
      <Button className="button_light button_club" onClick={to}>Перейти на Next</Button>
    </div>
  </div>
);

Club.propTypes = {
  to: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Club.defaultProps = {
  className: '',
};

export default Club;
