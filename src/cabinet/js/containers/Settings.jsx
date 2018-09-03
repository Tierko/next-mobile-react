import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import cs from 'classnames';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Input from '../components/Input';
import InputRuble from '../components/InputRuble';
import Button from '../components/Button';
import CheckboxSlide from '../components/CheckboxSlide';
import Select from '../components/SelectLang';
import Note from '../components/Note';
import Transitions from '../components/Transitions';
import { TITLES } from '../constants';

class Settings extends Component {
  langs = [{
    id: 1,
    title: 'Русский',
    value: 'ru',
    flag: 'RU.svg',
  }, {
    id: 2,
    title: 'English',
    value: 'en',
    flag: 'US.svg',
  }];

  state = {
    email: 'Konstantinopolsky@gmail.com',
    lang: this.langs[0],
    note: true,
    receipt: true,
    expenseNoteSum: '2 000 ₽',
    edited: false,
    showNote: false,
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
      edited: true,
    });
  };

  onSave = () => {
    this.setState({
      edited: false,
      showNote: true,
    });
  };

  onLangSelect = (lang) => {
    this.setState({
      lang,
      edited: true,
    });
  };

  onNoteFade = () => {
    this.setState({
      showNote: false,
    });
  };

  setCash = (e) => {
    const { cash } = e.target.dataset;
    const { note } = this.state;
    const { onChange } = this;

    if (note) {
      onChange('expenseNoteSum', `${cash} ₽`);
    }
  };

  render() {
    const {
      onSave,
      onChange,
      onLangSelect,
      setCash,
      onNoteFade,
      langs,
    } = this;
    const {
      email,
      lang,
      note,
      receipt,
      expenseNoteSum,
      edited,
      showNote,
    } = this.state;
    const meta = {
      title: TITLES.SETTINGS,
    };

    return (
      <DocumentMeta {...meta}>
        <MobileNav type="dashboard" />
        <div className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content">
              <div className="settings">
                <h1 className="settings__header">Настройки</h1>
                <Input className="input_settings-email" name="email" value={email} onChange={onChange} placeholder="Почта" />
                <Select
                  className="select_settings"
                  placeholder="Язык"
                  items={langs}
                  value={lang}
                  onSelect={onLangSelect}
                />
                <div className="service">
                  <div className="service__control">
                    <div className="service__name">Уведомление о расходах</div>
                    <CheckboxSlide className="checkbox_settings" value={note} name="note" onChange={onChange} />
                  </div>
                  <div className="service__desc">СМС-оповещение после траты каждых</div>
                  <div className="service__expense">
                    <InputRuble
                      className="input_settings-expense"
                      name="expenseNoteSum"
                      value={expenseNoteSum}
                      onChange={onChange}
                      disabled={!note}
                      clear
                    />
                    <div className="service__expense-sums">
                      <div
                        onClick={setCash}
                        className={cs('service__expense-sum', {
                          'service__expense-sum_disabled': !note,
                        })}
                        data-cash="2 000"
                      >
                        2 000 ₽
                      </div>
                      <div
                        onClick={setCash}
                        className={cs('service__expense-sum', {
                          'service__expense-sum_disabled': !note,
                        })}
                        data-cash="5 000"
                      >
                        5 000 ₽
                      </div>
                      <div
                        onClick={setCash}
                        className={cs('service__expense-sum', {
                          'service__expense-sum_disabled': !note,
                        })}
                        data-cash="10 000"
                      >
                        10 000 ₽
                      </div>
                    </div>
                  </div>
                </div>
                <div className="service">
                  <div className="service__control">
                    <div className="service__name">Квитанции об оплате</div>
                    <CheckboxSlide className="checkbox_settings" value={receipt} name="receipt" onChange={onChange} />
                  </div>
                  <div className="service__desc">После совершения платежа отправлять квитанцию на адрес</div>
                </div>
                <Button className="button_settings" onClick={onSave} disabled={!edited}>
                  Сохранить настройки
                </Button>
                <Note
                  className="note_settings"
                  message="Настройки сохранены"
                  color="green"
                  onFadeOut={onNoteFade}
                  show={showNote}
                />
              </div>
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

export default Settings;
