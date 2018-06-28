import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import LinkBack from '../components/LinkBack';
import Checkbox from '../components/CheckboxSlide';
import InputRuble from '../components/InputRuble';
import Select from '../components/Select';
import Button from '../components/Button';
import { Pages } from '../constants';

class AutoPay extends Component {
  state = {
    autoPay: true,
    autoPaySum: '1000 ₽',
    autoPayDay: '10',
    autoPayMonth: '',
    fewMoney: true,
    fewSum: '1000 ₽',
    fewLess: '100 ₽',
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onSave = () => {

  };

  render() {
    const {
      autoPay,
      autoPayDay,
      autoPayMonth,
      autoPaySum,
      fewLess,
      fewMoney,
      fewSum,
    } = this.state;
    const { onChange, onSave } = this;

    return [
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <LinkBack className="link-back_offset-bottom" href={Pages.Overview} />
          <div className="dashboard__header">Подключение автоплатежа</div>
          <div className="auto-pay">
            <div className="auto-pay__section">
              <div className="auto-pay__title">
                <div>Ежемесячно</div>
                <Checkbox name="autoPay" value={autoPay} onChange={onChange} />
              </div>
              <div className={cs('auto-pay__block', { 'auto-pay__block_show': autoPay })}>
                <div className="auto-pay__row">
                  <div>
                    На сумму
                    <div className="auto-pay__note">От 100 до 15 000 ₽</div>
                  </div>
                  <InputRuble className="input_auto-pay" name="autoPaySum" value={autoPaySum} onChange={onChange} />
                </div>
                <div className="auto-pay__row">
                  <div>
                    Какого числа пополнять
                    <div className="auto-pay__note">
                      Не позже трех дней до даты платежа по тарифу
                    </div>
                  </div>
                  <Select value={autoPayDay} items={['1']} onSelect={v => onChange('autoPayDay', v)} />
                </div>
                <div className="auto-pay__row">
                  <div>
                    До какого месяца
                    <div className="auto-pay__note">Включительно</div>
                  </div>
                  <div>Сентябрь 2018</div>
                </div>
              </div>
            </div>
            <div className="auto-pay__section">
              <div className="auto-pay__title">
                <div>Если на счету мало денег</div>
                <Checkbox value={fewMoney} name="fewMoney" onChange={onChange} />
              </div>
              <div className={cs('auto-pay__block', { 'auto-pay__block_show': fewMoney })}>
                <div className="auto-pay__row">
                  <div>
                    На сумму
                    <div className="auto-pay__note">От 100 до 15 000 ₽</div>
                  </div>
                  <InputRuble className="input_auto-pay" onChange={onChange} value={fewSum} name="fewSum" />
                </div>
                <div className="auto-pay__row">
                  <div>Пополнять, если на счету меньше, чем </div>
                  <InputRuble className="input_auto-pay" onChange={onChange} value={fewLess} name="fewLess" />
                </div>
              </div>
            </div>
            <Button onClick={onSave}>Сохранить</Button>
          </div>
        </div>
      </div>,
    ];
  }
}

export default AutoPay;
