import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import InputMask from 'react-input-mask';
import {
  checkCardNumber,
  checkCardHolder,
  checkCardDate,
  checkCVV,
} from '../utils';

const Card = ({
  id,
  onSelect,
  onEdit,
  onChange,
  type,
  selected,
  values: {
    number,
    holder,
    date,
    cvv,
  },
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
        <div className="card__points" onClick={onEdit} data-id={id}>
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
    const isFilled = checkCardNumber(number) && checkCardHolder(holder) && checkCardDate(date) && checkCVV(cvv);

    return (
      <div
        className={cs('card card_new', {
          'card_new-selected': selected === id,
          'card_new-filled': isFilled && selected === id,
        })}
        onClick={onSelect}
        data-id={id}
      >
        {
          selected !== id &&
          <div>
            <img className="" src="/media/icons/plus-gray.svg" />
            <br />
            Новая карта
          </div>
        }
        {
          selected === id &&
          <div className="card__form">
            <InputMask
              className="card__input card__input_wide card__input_number"
              mask="9999 9999 9999 9999"
              placeholder="0000 0000 0000 0000"
              onChange={e => onChange('number', e.target.value)}
              value={number}
            />
            <input
              className="card__input card__input_wide"
              placeholder="Имя держателя карты"
              onChange={e => onChange('holder', e.target.value)}
              value={holder}
            />
            <div className="card__row">
              <InputMask
                className="card__input card__input_narrow"
                mask="99 / 99"
                placeholder="мм / гг"
                onChange={e => onChange('date', e.target.value)}
                value={date}
              />
              <InputMask
                className="card__input card__input_narrow"
                placeholder="CVV"
                mask="999"
                onChange={e => onChange('cvv', e.target.value)}
                value={cvv}
              />
            </div>
          </div>
        }
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
  onChange: PropTypes.func,
  type: PropTypes.string.isRequired,
  selected: PropTypes.number.isRequired,
  values: PropTypes.shape(),
};

Card.defaultProps = {
  onEdit: null,
  onChange: null,
  values: {},
};

export default Card;
