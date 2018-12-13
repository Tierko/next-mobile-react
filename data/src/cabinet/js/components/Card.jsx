import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import InputMask from 'react-input-mask';
import InputCard from '../components/InputCard';
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
  onChange,
  type,
  selected,
  defaultCard,
  colors,
  removeCard,
  makeDefault,
  values: {
    number,
    date,
    cvv,
  },
}) => {
  const isFilled = checkCardNumber(number) &&
    checkCardDate(date) && checkCVV(cvv);
  const isSelected = selected === id;
  const isDefault = defaultCard === id;
  const style = colors && colors.length === 2 ?
    { backgroundImage: `linear-gradient(to top right, ${colors[0]}, ${colors[1]})` } :
    { backgroundColor: '#e72b2b' };

  switch (type) {
  case 'card':
    return (
      <div
        onClick={onSelect}
        data-id={id}
        id={`card-${id}`}
        className={cs('card__wrapper', {
          card__wrapper_selected: isSelected,
        })}
      >
        <div
          style={style}
          className={cs(`card card_exist card_${getPaySystem(id)}`, {
            card_selected: isSelected,
            card_default: isDefault,
          })}
        >
          <div className="card__number">{getShortPan(id)}</div>
        </div>
        {
          isSelected && isDefault &&
          <div className="card__title">
            <img className="card__icon card__icon_default" src="/media/icons/default.svg" alt="" />
            По умолчанию
          </div>
        }
        {
          isSelected && !isDefault &&
          <div className="card__title" onClick={() => makeDefault(id)}>
            <span className="card__link">Назначить по умолчанию</span>
          </div>
        }
        {
          isSelected &&
          <div className="card__title">
            <img className="card__icon card__icon_remove" src="/media/icons/bucket-gray.svg" alt="" />
            <span className="card__link" onClick={() => removeCard(id)}>
              Удалить
            </span>
          </div>
        }
      </div>
    );
  case 'apple-pay':
    return (
      <div
        onClick={onSelect}
        data-id={id}
        id={`card-${id}`}
        className={cs('card__wrapper', {
          card__wrapper_selected: isSelected,
        })}
      >
        <div className={cs('card card_apple-pay', { card_selected: isSelected })}>
          <img src="/media/cards/apple-pay.png" alt="" />
        </div>
      </div>
    );
  case 'new':
    return (
      <div onClick={onSelect} data-id={id} className="card__wrapper card__wrapper_new" id={`card-${id}`}>
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
          <div
            className={cs(`card__form card__form_${isFilled && getPaySystem(number)}`, {
              'card__form_has-pay': !!getPaySystem(number) && isFilled,
              card__form_show: isSelected,
            })}
          >
            <InputCard
              className="input-card_number"
              mask="9999 9999 9999 9999"
              title="Номер карты"
              placeholder="0000 0000 0000 0000"
              name="number"
              onChange={onChange}
              value={number}
            />
            <InputCard
              className="input-card_date"
              mask="99 / 99"
              title="Срок действия"
              placeholder="ММ / ГГ"
              onChange={onChange}
              value={date}
              name="date"
            />
          </div>
          <div className={cs('card__cvv', { card__cvv_show: isSelected })}>
            <div className="card__cvv-title">CVC/CVV</div>
            <InputMask
              className="card__cvv-input"
              mask="999"
              maskChar={null}
              onChange={e => onChange('cvv', e.target.value, e)}
              value={cvv}
              placeholder="000"
            />
            <div className="card__cvv-indicator" />
            <div className="card__cvv-note">Последние три цифры на обороте карты</div>
          </div>
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
  onChange: null,
  values: {},
  isDefault: false,
  colors: null,
};

export default Card;
