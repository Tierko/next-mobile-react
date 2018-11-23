import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import Aside from '../components/Aside';
import MobileNav from '../../../common/js/components/MobileNav';
import Transitions from '../components/Transitions';
import Input from '../../../common/js/components/Input';
import Date from '../components/Date';
import Select from '../../../common/js/components/Select';
import MultipleInput from '../components/MultipleInput';
import InputRuble from '../components/InputRuble';
import TabsRoaming from '../components/TabsRoaming';
import Button from '../../../common/js/components/Button';
import Switch from '../components/CheckboxSlide';
import Calendar from '../components/Calendar';
import { TITLES } from '../constants';

class Kit extends Component {
  state = {
    tab: 1,
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const meta = {
      title: TITLES.KIT,
    };

    return (
      <DocumentMeta {...meta}>
        <MobileNav key="nav" type="dashboard" />
        <div key="dasnboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content dashboard__content_white">
              <div className="kit">
                <section>
                  <h1>Н1. Самый большой заголовок на&nbsp;странице</h1>
                  <h2>
                    Н2. Заголовок поменьше. Может быть в&nbsp;несколько строк. Используется, например, на&nbsp;страницах ошибки и&nbsp;успеха
                  </h2>
                  <p>Regular. Обычный текст, им набран весь основной текст. Тоже может быть в несколько строк</p>
                  <p className="small">
                    Small. Подсказки и другая не очень важная информация набрана именно этим стилем
                  </p>
                </section>
                <section>
                  <h3>Кнопки</h3>
                  <div className="kit__buttons">
                    <div className="kit__button">
                      <span className="small">Regular</span>
                      <button className="button button_primary">Пополнить</button>
                    </div>
                    <div className="kit__button">
                      <span className="small">Hover</span>
                      <button className="button button_primary button_primary_hover">Пополнить</button>
                    </div>
                    <div className="kit__button">
                      <span className="small">On click</span>
                      <button className="button button_primary button_primary_active">Пополнить</button>
                    </div>
                    <div className="kit__button">
                      <span className="small">Disabled</span>
                      <button className="button button_primary button_primary_disabled">Пополнить</button>
                    </div>
                  </div>
                  <div className="kit__buttons">
                    <div className="kit__button">
                      <span className="small">Regular</span>
                      <button className="button button_secondary">Пополнить</button>
                    </div>
                    <div className="kit__button">
                      <span className="small">Hover</span>
                      <button className="button button_secondary button_secondary_hover">Пополнить</button>
                    </div>
                    <div className="kit__button">
                      <span className="small">On click</span>
                      <button className="button button_secondary button_secondary_active">Пополнить</button>
                    </div>
                    <div className="kit__button">
                      <span className="small">Disabled</span>
                      <button className="button button_secondary button_secondary_disabled">Пополнить</button>
                    </div>
                  </div>
                </section>
                <section>
                  <h3>Ссылки</h3>
                  <a className="link" href="/">Это ссылка</a> <a className="link link_hover" href="/">Это ссылка</a>
                </section>
                <section>
                  <h3>Календарь</h3>
                  <div className="kit__calendar">
                    <Calendar onChange={() => {}} show />
                  </div>
                </section>
                <section>
                  <h3>Поля ввода</h3>
                  <Input className="kit__input" name="" value="" onChange={() => {}} placeholder="Плейсхолдер" />
                  <Input className="kit__input" name="" value="konstantinopolsky@gmail.com" onChange={() => {}} placeholder="Электронная почта" />
                  <Input className="kit__input input_active" name="" value="Активное поле" onChange={() => {}} />
                  <Input className="kit__input" name="" value="konstantinopolsky@gmail.com" onChange={() => {}} errorText="Такого адреса не существует" />
                </section>
                <section>
                  <h3>Переключатели</h3>
                  <div className="kit__switches">
                    <Switch value name="onn" onChange={() => {}} />
                    <Switch value={false} name="onn" onChange={() => {}} />
                  </div>
                </section>
              </div>
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

export default Kit;
