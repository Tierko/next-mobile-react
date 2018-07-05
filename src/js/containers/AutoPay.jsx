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
import PageFade from '../components/PageFade';
import { Pages, months } from '../constants';

class AutoPay extends Component {
  static days = Array(28).fill(0).map((_, i) => i + 1);

  static months = (() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const m = Array(36).fill('');

    const mm = m.map((d, i) => {
      const tmp = new Date(year, month + i + 1);

      return `${months[tmp.getMonth()]} ${tmp.getFullYear()}`;
    });

    mm.push('Бессрочно');

    return mm;
  })();

  state = {
    autoPay: true,
    autoPaySum: 1000,
    autoPayDay: 10,
    autoPayMonth: AutoPay.months[0],
    fewMoney: true,
    fewSum: 1000,
    fewLess: 100,
    unsaved: false,
  };

  onChange = (name, value) => {
    if (name === 'autoPaySum' || name === 'fewSum' || name === 'fewLess') {
      if (value.toString().length > 5) {
        return;
      }
    }

    this.setState({
      [name]: value,
      unsaved: true,
    });
  };

  onSave = () => {
    const { unsaved } = this.state;
    const { history } = this.props;

    if (unsaved) {
      history.push({
        pathname: `${Pages.Result}/success`,
        state: {
          title: 'Автоплатеж сохранен',
          text: 'Счет будет автоматически пополняться на 2 000 ₽ каждый месяц 10 числа до сентября 2018 включительно',
        },
      });
    }
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
      unsaved,
    } = this.state;
    const { onChange, onSave } = this;
    const { months, days } = AutoPay;

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
                  <div className="auto-pay__cell">
                    На сумму
                    <div className="auto-pay__note">От 100 до 15 000 ₽</div>
                  </div>
                  <InputRuble className="input_auto-pay" name="autoPaySum" value={autoPaySum} onChange={onChange} />
                </div>
                <div className="auto-pay__row">
                  <div className="auto-pay__cell">
                    Какого числа пополнять
                    <div className="auto-pay__note">
                      Не позже трех дней до даты платежа по тарифу
                    </div>
                  </div>
                  <Select
                    className="select_auto-pay-day"
                    value={autoPayDay}
                    items={days}
                    onSelect={v => onChange('autoPayDay', v)}
                  />
                </div>
                <div className="auto-pay__row">
                  <div className="auto-pay__cell">
                    До какого месяца
                    <div className="auto-pay__note">Включительно</div>
                  </div>
                  <Select
                    className="select_auto-pay-month"
                    onSelect={v => onChange('autoPayMonth', v)}
                    items={months}
                    value={autoPayMonth}
                    hideIcon
                  />
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
                  <div className="auto-pay__cell">
                    На сумму
                    <div className="auto-pay__note">От 100 до 15 000 ₽</div>
                  </div>
                  <InputRuble className="input_auto-pay" onChange={onChange} value={fewSum} name="fewSum" />
                </div>
                <div className="auto-pay__row">
                  <div className="auto-pay__cell">
                    Пополнять, если на счету меньше, чем
                  </div>
                  <InputRuble className="input_auto-pay" onChange={onChange} value={fewLess} name="fewLess" />
                </div>
              </div>
            </div>
            <Button onClick={onSave} disabled={!unsaved}>Сохранить</Button>
          </div>
        </div>
      </div>,
    ];
  }
}

AutoPay.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default PageFade(AutoPay);
