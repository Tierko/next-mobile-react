import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Select from '../components/SelectLang';

class Settings extends Component {
  state = {
    email: 'Konstantinopolsky@gmail.com',
    lang: { title: 'Русский', value: 'ru', flag: 'RU.svg' },
    note: true,
    receipt: true,
    expenseNoteSum: '2000 ₽',
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onSave = () => {};

  onLangSelect = (lang) => {
    this.setState({
      lang,
    });
  };

  render() {
    const { onSave, onChange, onLangSelect } = this;
    const {
      email,
      lang,
      note,
      receipt,
      expenseNoteSum,
    } = this.state;

    return [
      <MobileNav type="dashboard" />,
      <div className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <div className="settings">
            <h1 className="settings__header">Настройки</h1>
            <Input className="input_settings-email" name="email" value={email} onChange={onChange} placeholder="Почта" />
            <Select
              className="select_settings"
              placeholder="Язык"
              items={[{ title: 'Русский', value: 'ru', flag: 'RU.svg' }, { title: 'English', value: 'en', flag: 'US.svg' }]}
              value={lang}
              onSelect={onLangSelect}
            />
            <Button className="button_settings" onClick={onSave}>Сохранить изменения</Button>
            <div className="service">
              <div className="service__control">
                <div className="service__name">Уведомление о расходах</div>
                <Checkbox className="checkbox_settings" value={note} name="note" onChange={onChange} />
              </div>
              <div className="service__desc">СМС-оповещение после траты каждых</div>
            </div>
            <div className="service">
              <div className="service__control">
                <div className="service__name">Квитанции об оплате</div>
                <Checkbox className="checkbox_settings" value={receipt} name="receipt" onChange={onChange} />
              </div>
              <div className="service__desc">Отправлять квитанцию после каждого платежа на почту</div>
              <div className="service__expense">
                <Input
                  className="input_settings-expense"
                  name="expenseNoteSum"
                  value={expenseNoteSum}
                  onChange={onChange}
                  clear
                />
                <div className="service__expense-sums">
                  <div className="service__expense-sum">2 000 ₽</div>
                  <div className="service__expense-sum">5 000 ₽</div>
                  <div className="service__expense-sum">10 000 ₽</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
    ];
  }
}

export default Settings;