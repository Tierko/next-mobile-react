import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Button from './Button';

class TariffsItem extends Component {
  state = {
    selected: false,
  };

  onSelect = (selected) => {
    this.setState({
      selected,
    });
  };

  render() {
    const {
      onClick,
      isDetail,
      data,
      current,
      index,
    } = this.props;
    const { onSelect } = this;
    const { selected } = this.state;
    const inFocus = index === 1 || selected === data.id;

    return (
      <div
        onClick={() => onSelect(data.id)}
        className={cs('tariffs__item', {
          tariffs__item_current: current.id === data.id,
          tariffs__item_focus: inFocus && current.id !== data.id,
        })}
      >
        <div className="tariffs__item-inner">
          <div className="tariffs__name">{data.title}</div>
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
              <div className="tariffs__over-row">{data.over.internet} ₽ / МБ</div>
              <div className="tariffs__over-row">{data.over.sms} ₽ / СМС</div>
              <div className="tariffs__over-row">{data.over.calls} ₽ / мин</div>
            </div>
          }
          <div className="tariffs__pay">{data.payment} ₽ / месяц</div>
        </div>
        {
          current.id !== data.id && inFocus &&
          <Button className="button_tariffs" primary onClick={() => onClick(data.id)}>Перейти</Button>
        }
      </div>
    );
  }
}

TariffsItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDetail: PropTypes.bool.isRequired,
  data: PropTypes.shape().isRequired,
  current: PropTypes.shape(),
  index: PropTypes.number.isRequired,
};

TariffsItem.defaultProps = {
  current: {},
};

export default TariffsItem;
