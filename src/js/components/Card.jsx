import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import InputMask from 'react-input-mask';
import {
  checkCardNumber,
  checkCardDate,
  checkCVV,
  getShortPan,
  getPaySystem,
} from '../utils';

const Card = ({
  id,
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
    holderError,
  },
}) => {
  const isFilled = checkCardNumber(number) && holder &&
    checkCardDate(date) && checkCVV(cvv);
  const isSelected = selected === id;
  const isDefault = defaultCard === id;
  const style = colors && colors.length === 2 ?
    { backgroundImage: `linear-gradient(to top right, ${colors[0]}, ${colors[1]})` } :
    { backgroundColor: '#e72b2b' };

  switch (type) {
  case 'card':
    return (
      <div onClick={onSelect} data-id={id} className="card__wrapper" id={`card-${id}`}>
        <div
          className={cs(`card card_${getPaySystem(id)}`, { card_selected: isSelected, card_default: isDefault })}
          style={style}
        >
          <div className="card__number">{getShortPan(id)}</div>
          {
            isSelected &&
            <div className="card__points" onClick={onEdit} data-id={id}>
              <span className="card__point" />
              <span className="card__point" />
              <span className="card__point" />
            </div>
          }
        </div>
      </div>
    );
  case 'apple-pay':
    return (
      <div onClick={onSelect} data-id={id} className="card__wrapper" id={`card-${id}`}>
        <div className={cs('card card_apple-pay', { card_selected: isSelected })}>
          <img src="/media/cards/apple-pay.png" alt="" />
        </div>
      </div>
    );
  case 'new':
    return (
      <div onClick={onSelect} data-id={id} className="card__wrapper" id={`card-${id}`}>
        <div
          className={cs('card card_new', {
            'card_new-selected': isSelected,
            'card_new-filled': isFilled && isSelected,
          })}
        >
          {
            !isSelected &&
            <div>
              <img className="" src="/media/icons/plus-gray.svg" alt="" />
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
              <div className="card__holder">
                <input
                  className="card__input card__input_wide"
                  placeholder="Имя держателя карты"
                  onChange={e => onChange('holder', e.target.value)}
                  value={holder}
                />
                <div className={cs('card__error', { card__error_show: holderError })}>
                  Вводите латинскими буквами
                </div>
              </div>
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
      </div>
    );

  default:
    return false;
  }
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
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
  onEdit: null,
  onChange: null,
  values: {},
  isDefault: false,
  colors: null,
};

export default Card;
