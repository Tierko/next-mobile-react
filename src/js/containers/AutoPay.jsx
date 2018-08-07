import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { connect } from 'react-redux';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import LinkBack from '../components/LinkBack';
import Checkbox from '../components/CheckboxSlide';
import InputRuble from '../components/InputRuble';
import Select from '../components/Select';
import Button from '../components/Button';
import { Pages, MONTHS } from '../constants';
import saveAutoPayAction from '../actions/AutoPay';

class AutoPay extends Component {
  static days = Array(28).fill(0).map((_, i) => i + 1);

  static months = (() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const m = Array(36).fill('');

    const mm = m.map((d, i) => {
      const tmp = new Date(year, month + i + 1);

      return `${MONTHS[tmp.getMonth()]} ${tmp.getFullYear()}`;
    });

    mm.push('Бессрочно');

    return mm;
  })();

  constructor(props) {
    super(props);

    this.state = props.data;
  }

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
    const {
      unsaved,
      monthlyEnabled,
      monthlySum,
      monthlyDay,
      monthlyUntil,
      lessEnabled,
      lessSum,
      lessLess,
    } = this.state;
    const {
      history,
      saveAutoPay,
    } = this.props;

    if (unsaved) {
      saveAutoPay({
        monthlyEnabled,
        monthlySum,
        monthlyDay,
        monthlyUntil,
        lessEnabled,
        lessSum,
        lessLess,
      });

      history.push({
        pathname: `${Pages.RESULT}/success`,
        state: {
          title: 'Автоплатеж сохранен',
          text: 'Счет будет автоматически пополняться на 2 000 ₽ каждый месяц 10 числа до сентября 2018 включительно',
        },
      });
    }
  };

  getDefaultCard = () => {
    const { cards } = this.props;

    return cards.items.find(i => i.token === cards.defaultCard);
  };

  render() {
    const {
      monthlyEnabled,
      monthlyDay,
      monthlyUntil,
      monthlySum,
      lessEnabled,
      lessLess,
      lessSum,
      unsaved,
    } = this.state;
    const { onChange, onSave, getDefaultCard } = this;
    const { months, days } = AutoPay;
    const card = getDefaultCard();

    return [
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <LinkBack className="link-back_offset-bottom" href={Pages.OVERVIEW} />
          <div className="dashboard__header">Подключение автоплатежа</div>
          <div className="auto-pay">
            {
              card &&
              <div className="auto-pay__card">
                <div className="auto-pay__note">С карты по умолчанию</div>
                <div
                  className="card card_selected card_auto-pay"
                >
                  <div className="card__number">*{card.title}</div>
                </div>
                <div className="auto-pay__note">
                  Чтобы привязать автоплатеж к другой карте, установите ее картой по умолчанию
                </div>
              </div>
            }
            {
              !card &&
              <div className="auto-pay__note">У вас не установлена карта по умолчанию, вы не сможете настроить автоплатеж</div>
            }
            <div className="auto-pay__section">
              <div className="auto-pay__title">
                <div>Ежемесячно</div>
                <Checkbox name="monthlyEnabled" value={monthlyEnabled} onChange={onChange} />
              </div>
              <div className={cs('auto-pay__block', { 'auto-pay__block_show': monthlyEnabled })}>
                <div className="auto-pay__row">
                  <div className="auto-pay__cell">
                    На сумму
                    <div className="auto-pay__note">От 100 до 15 000 ₽</div>
                  </div>
                  <InputRuble className="input_auto-pay" name="monthlySum" value={monthlySum} onChange={onChange} />
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
                    value={monthlyDay}
                    items={days}
                    onSelect={v => onChange('monthlyDay', v)}
                  />
                </div>
                <div className="auto-pay__row">
                  <div className="auto-pay__cell">
                    До какого месяца
                    <div className="auto-pay__note">Включительно</div>
                  </div>
                  <Select
                    className="select_auto-pay-month"
                    onSelect={v => onChange('monthlyUntil', v)}
                    items={months}
                    value={monthlyUntil}
                    hideIcon
                  />
                </div>
              </div>
            </div>
            <div className="auto-pay__section">
              <div className="auto-pay__title">
                <div>Если на счету мало денег</div>
                <Checkbox value={lessEnabled} name="lessEnabled" onChange={onChange} />
              </div>
              <div className={cs('auto-pay__block', { 'auto-pay__block_show': lessEnabled })}>
                <div className="auto-pay__row">
                  <div className="auto-pay__cell">
                    На сумму
                    <div className="auto-pay__note">От 100 до 15 000 ₽</div>
                  </div>
                  <InputRuble className="input_auto-pay" onChange={onChange} value={lessSum} name="lessSum" />
                </div>
                <div className="auto-pay__row">
                  <div className="auto-pay__cell">
                    Пополнять, если на счету меньше, чем
                  </div>
                  <InputRuble className="input_auto-pay" onChange={onChange} value={lessLess} name="lessLess" />
                </div>
              </div>
            </div>
            <Button onClick={onSave} disabled={!unsaved || !card}>Сохранить</Button>
          </div>
        </div>
      </div>,
    ];
  }
}

function mapStateToProps(state) {
  return {
    data: state.AutoPay,
    cards: state.Cards,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveAutoPay: state => dispatch(saveAutoPayAction(state)),
  };
}

AutoPay.propTypes = {
  history: PropTypes.shape().isRequired,
  data: PropTypes.shape().isRequired,
  saveAutoPay: PropTypes.func.isRequired,
  cards: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoPay);
