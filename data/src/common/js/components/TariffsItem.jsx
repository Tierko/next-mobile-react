import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Button from './Button';

import { TARIFF_PARAMETERS } from '~/common/js/tariffs'

const TARIFF_PARAMETERS_CLASSES = {
  [TARIFF_PARAMETERS.internet]: 'tariffs__traffic',
  [TARIFF_PARAMETERS.sms]: 'tariffs__sms',
  [TARIFF_PARAMETERS.calls]: 'tariffs__calls',
  [TARIFF_PARAMETERS.pay]: 'tariffs__pay',
}

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

    const parameters = data.parameters.filter(item => item.order === 0)
    const otherParameters = data.parameters.filter(item => item.order === 1)

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
          {
            parameters.map((param, index) => {
              return (
                <div key={index} className={TARIFF_PARAMETERS_CLASSES[param.type]}>
                  {param.value === '0' ? 'Безлимит' : param.value}
                  &nbsp;
                  {param.type === TARIFF_PARAMETERS.pay && `${param.currency} / месяц`}
                  &nbsp;
                  {param.unit}
                </div>
              )
            })
          }
          {
            !!otherParameters.length &&
            <div className={cs('tariffs__over', { tariffs__over_show: isDetail })}>
              <div className="tariffs__over-title">Сверх пакета</div>
              {
                otherParameters.map((param, index) => {
                  return (
                    <div key={index} className="tariffs__over-row">
                      {param.value} {param.currency} / {param.unit}
                    </div>
                  )
                })
              }
            </div>
          }
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
