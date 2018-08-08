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
  title,
  onSelect,
  onEdit,
  onChange,
  type,
  selected,
  defaultCard,
  colors,
  values: {
    number,
    holder,
    date,
    cvv,
  },
}) => {
  const isFilled = checkCardNumber(number) && checkCardHolder(holder) &&
    checkCardDate(date) && checkCVV(cvv);
  const isSelected = selected === id;
  const isDefault = defaultCard === id;
  const style = colors && colors.length === 2 ?
    { backgroundImage: `linear-gradient(to top right, ${colors[0]}, ${colors[1]})` } :
    { backgroundColor: '#e72b2b' };

  switch (type) {
  case 'visa':
    return (
      <div
        className={cs('card', { card_selected: isSelected, card_default: isDefault })}
        onClick={onSelect}
        data-id={id}
        style={style}
      >
        <div className="card__number">*{title}</div>
        {
          isSelected &&
          <div className="card__points" onClick={onEdit} data-id={id}>
            <span className="card__point" />
            <span className="card__point" />
            <span className="card__point" />
          </div>
        }
      </div>
    );
  case 'apple-pay':
    return (
      <div
        className={cs('card card_apple-pay', { card_selected: isSelected })}
        onClick={onSelect}
        data-id={id}
      >
        <img src="/media/images/apple-pay.png" />
      </div>
    );
  case 'new':
    return (
      <div
        className={cs('card card_new', {
          'card_new-selected': isSelected,
          'card_new-filled': isFilled && isSelected,
        })}
        onClick={onSelect}
        data-id={id}
      >
        {
          !isSelected &&
          <div>
            <img className="" src="/media/icons/plus-gray.svg" />
            <br />
            Новая карта
          </div>
        }
        {
          isSelected &&
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
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string.isRequired,
  defaultCard: PropTypes.string,
  selected: PropTypes.string.isRequired,
  values: PropTypes.shape(),
  colors: PropTypes.arrayOf(PropTypes.string),
};

Card.defaultProps = {
  title: '',
  onEdit: null,
  onChange: null,
  values: {},
  isDefault: false,
  colors: null,
};

export default Card;
