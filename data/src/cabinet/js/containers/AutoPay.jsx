import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import Breadcrumbs from '../components/Breadcrumbs';
import Checkbox from '../components/CheckboxSlide';
import InputRuble from '../components/InputRuble';
import Select from '../../../common/js/components/Select';
import Transitions from '../components/Transitions';
import Hider from '../components/Hider';
import Notice from '../components/Notice';
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
    });
  }

  onChange = (name, value) => {
    const { onSave } = this;

    if (name === 'autoPaySum' || name === 'fewSum' || name === 'fewLess') {
      if (value.toString().length > 5) {
        return;
      }
    }

    this.setState({
      [name]: value,
    }, onSave);
  };

  onSave = () => {
    const {
      monthlyEnabled,
      monthlySum,
      monthlyDay,
      monthlyUntil,
      lessEnabled,
      lessSum,
      lessLess,
    } = this.state;
    const {
      saveAutoPay,
    } = this.props;
    const monthlyInLimits = monthlySum >= 100 && monthlySum <= 15000;
    const lessSumInLimits = lessSum >= 100 && lessSum <= 15000;

    if (monthlyInLimits && lessSumInLimits ) {
      saveAutoPay({
        monthlyEnabled,
        monthlySum,
        monthlyDay,
        monthlyUntil,
        lessEnabled,
        lessSum,
        lessLess,
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
      alreadyEnabled,
    } = this.state;
    const { onChange, getDefaultCard } = this;
    const { months, days } = AutoPay;
    const card = getDefaultCard();
    const meta = {
      title: TITLES.AUTO_PAY,
    };

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile />
        <MobileNav key="nav" type="dashboard" />
        <Notice />
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content dashboard__content_white">
              <Breadcrumbs items={[{ title: 'Пополнение', link: Pages.PAY }]} />
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
                  <Hider show={monthlyEnabled}>
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
                  </Hider>
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
                  <Hider show={lessEnabled}>
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
                  </Hider>
                </div>
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
