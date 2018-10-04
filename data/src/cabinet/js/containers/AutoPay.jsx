import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import LinkBack from '../components/LinkBack';
import Checkbox from '../components/CheckboxSlide';
import InputRuble from '../components/InputRuble';
import Select from '../../../common/js/components/Select';
import Button from '../../../common/js/components/Button';
import Transitions from '../components/Transitions';
import { Pages, MONTHS, TITLES } from '../constants';
import saveAutoPayAction from '../actions/AutoPay';
import {
  getShortPan,
  getPaySystem,
} from '../utils';

class AutoPay extends Component {
  static days = Array(28).fill(0).map((_, i) => i + 1);

  static months = (() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const m = Array(36).fill('');

    const mm = m.map((d, i) => {
      const tmp = new Date(year, month + i + 1);
      let monthName = MONTHS[tmp.getMonth()];
      monthName = `${monthName[0].toUpperCase()}${monthName.substr(1)}`;

      return `${monthName.toLowerCase()} ${tmp.getFullYear()}`;
    });

    mm.push('бессрочно');

    return mm;
  })();

  constructor(props) {
    super(props);
    const { data, data: { monthlyEnabled, lessEnabled } } = props;

    this.state = Object.assign(data, {
      alreadyEnabled: monthlyEnabled || lessEnabled,
      overflowHidden: false,
    });
  }

  onChange = (name, value) => {
    if (name === 'autoPaySum' || name === 'fewSum' || name === 'fewLess') {
      if (value.toString().length > 5) {
        return;
      }
    }

    if (name === 'monthlyEnabled' || name === 'lessEnabled') {
      this.setState({
        overflowHidden: true,
      });

      setTimeout(() => {
        this.setState({
          overflowHidden: false,
        });
      }, 1000);
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
      alreadyEnabled,
      overflowHidden,
    } = this.state;
    const { onChange, onSave, getDefaultCard } = this;
    const { months, days } = AutoPay;
    const card = getDefaultCard();
    const meta = {
      title: TITLES.AUTO_PAY,
    };
    const monthlyInLimits = monthlySum >= 100 && monthlySum <= 15000;
    const lessSumInLimits = lessSum >= 100 && lessSum <= 15000;

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile />
        <MobileNav key="nav" type="dashboard" />
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content">
              <LinkBack className="link-back_offset-bottom" href={Pages.PAY} />
              <div className="dashboard__header">
                {
                  alreadyEnabled ? 'Ваш автоплатеж' : 'Подключение автоплатежа'
                }
              </div>
              <div className="auto-pay">
                {
                  card &&
                  <div className="auto-pay__card">
                    <div className="auto-pay__note">Используется карта по&nbsp;умолчанию</div>
                    <div
                      className={`card card_default card_auto-pay card_${getPaySystem(card.token)}`}
                    >
                      <div className="card__number">{getShortPan(card.token)}</div>
                    </div>
                    <div className="auto-pay__note">
                      Для совершения автоплатежей с&nbsp;другой карты нужно сделать ее&nbsp;картой по&nbsp;умолчанию
                    </div>
                  </div>
                }
                {
                  !card &&
                  <div className="auto-pay__note">У&nbsp;вас не&nbsp;установлена карта по&nbsp;умолчанию, вы&nbsp;не&nbsp;сможете настроить автоплатеж</div>
                }
                <div className="auto-pay__section">
                  <div className="auto-pay__title">
                    <div>Ежемесячно</div>
                    <Checkbox
                      className="checkbox-slide_auto-pay"
                      name="monthlyEnabled"
                      value={monthlyEnabled}
                      onChange={onChange}
                    />
                  </div>
                  <div
                    className={cs('auto-pay__block', {
                      'auto-pay__block_show': monthlyEnabled,
                      'auto-pay__block_overflow': overflowHidden,
                    })}
                  >
                    <div className="auto-pay__row">
                      <div className="auto-pay__cell">
                        На&nbsp;сумму
                        <div className="auto-pay__note">От&nbsp;100 до&nbsp;15&nbsp;000&nbsp;₽</div>
                      </div>
                      <InputRuble className="input_auto-pay" name="monthlySum" value={monthlySum} onChange={onChange} />
                    </div>
                    <div className="auto-pay__row">
                      <div className="auto-pay__cell">
                        Какого числа пополнять
                        <div className="auto-pay__note">
                          Не&nbsp;позже трех дней до&nbsp;даты платежа по&nbsp;тарифу
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
                      />
                    </div>
                  </div>
                </div>
                <div className="auto-pay__section">
                  <div className="auto-pay__title">
                    <div>Если на&nbsp;счете недостаточно денег</div>
                    <Checkbox
                      value={lessEnabled}
                      name="lessEnabled"
                      onChange={onChange}
                      className="checkbox-slide_auto-pay"
                    />
                  </div>
                  <div
                    className={cs('auto-pay__block', {
                      'auto-pay__block_show': lessEnabled,
                      'auto-pay__block_overflow': overflowHidden,
                    })}
                  >
                    <div className="auto-pay__row">
                      <div className="auto-pay__cell">
                        На сумму
                        <div className="auto-pay__note">От&nbsp;100 до&nbsp;15&nbsp;000&nbsp;₽</div>
                      </div>
                      <InputRuble className="input_auto-pay" onChange={onChange} value={lessSum} name="lessSum" />
                    </div>
                    <div className="auto-pay__row">
                      <div className="auto-pay__cell">
                        Пополнять, если на&nbsp;счету меньше, чем
                      </div>
                      <InputRuble className="input_auto-pay" onChange={onChange} value={lessLess} name="lessLess" />
                    </div>
                  </div>
                </div>
                <Button
                  onClick={onSave}
                  disabled={!unsaved || !card || !monthlyInLimits || !lessSumInLimits}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
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
