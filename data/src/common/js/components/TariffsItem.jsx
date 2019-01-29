import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Button from './Button';

class TariffsItem extends Component {
  render() {
    const {
      onClick,
      isDetail,
      data,
      current,
      index,
      selected,
      onSelect,
      allFocus,
      unSelectable,
    } = this.props;
    const inFocus = selected === index;

    return (
      <div
        onClick={() => (index !== 0 || allFocus) && onSelect(index)}
        className={cs('tariffs__item', {
          tariffs__item_current: current.id === data.id,
          tariffs__item_focus: inFocus && current.id !== data.id,
          tariffs__item_unselectable: unSelectable,
        })}
      >
        <div className="tariffs__item-inner">
          <div className="tariffs__name">{data.title || data.name}</div>
          <div className="tariffs__current">
            {current.id === data.id && 'Ваш тариф'}
          </div>
          <div className="tariffs__traffic">{data.internet} ГБ</div>
          <div className="tariffs__sms">{data.sms} СМС</div>
          <div className="tariffs__calls">{data.calls} мин</div>
          {
            data.over &&
            <div className={cs('tariffs__over', { tariffs__over_show: isDetail })}>
              <div className="tariffs__over-title">Сверх пакета</div>
              <div className="tariffs__over-row">{data.over[0]} ₽ / МБ</div>
              <div className="tariffs__over-row">{data.over[1]} ₽ / СМС</div>
              <div className="tariffs__over-row">{data.over[2]} ₽ / мин</div>
            </div>
          }
          <div className="tariffs__pay">{data.payment} ₽ / месяц</div>
        </div>
        {
          current.id !== data.id && selected === index && !unSelectable &&
          <Button className="button_tariffs" primary onClick={() => onClick && onClick(data)}>Перейти</Button>
        }
      </div>
    );
  }
}

TariffsItem.propTypes = {
  onClick: PropTypes.func,
  isDetail: PropTypes.bool.isRequired,
  data: PropTypes.shape().isRequired,
  current: PropTypes.shape(),
  index: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  allFocus: PropTypes.bool.isRequired,
  unSelectable: PropTypes.bool.isRequired,
};

TariffsItem.defaultProps = {
  current: {},
  onClick: null,
};

export default TariffsItem;
