import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const Card = ({
  id,
  onSelect,
  onEdit,
  type,
  selected,
}) => {
  switch (type) {
  case 'visa':
    return (
      <div
        className={cs('card card_visa', { card_selected: selected === id })}
        onClick={onSelect}
        data-id={id}
      >
        <div className="card__number">*6266</div>
        <div className="card__points" onClick={onEdit}>
          <span className="card__point" />
          <span className="card__point" />
          <span className="card__point" />
        </div>
      </div>
    );
  case 'apple-pay':
    return (
      <div
        className={cs('card card_apple-pay', { card_selected: selected === id })}
        onClick={onSelect}
        data-id={id}
      >
        <img src="/media/images/apple-pay.png" />
      </div>
    );
  case 'new':
    return (
      <div
        className={cs('card card_new', { card_selected: selected === id })}
        onClick={onSelect}
        data-id={id}
      >
        <img src="/media/icons/plus-gray.svg" />
        Новая карта
      </div>
    );

  default:
    return false;
  }
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  type: PropTypes.string.isRequired,
  selected: PropTypes.number.isRequired,
};

Card.defaultProps = {
  onEdit: null,
};

export default Card;
