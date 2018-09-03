import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import Aside from '../components/Aside';
import MobileNav from '../components/MobileNav';
import Transitions from '../components/Transitions';
import Input from '../components/Input';
import Date from '../components/Date';
import Select from '../components/Select';
import MultipleInput from '../components/MultipleInput';
import InputRuble from '../components/InputRuble';
import Tabs from '../components/Tabs';
import Button from '../../../common/js/components/Button';
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
            <div className="dashboard__content">
              <div className="kit">
                <section>
                  <h1>Н1. Самый большой заголовок на странице</h1>
                  <h2>
                    Н2. Заголовок поменьше. Может быть в несколько строк. Используется, например, на страницах ошибки и
                    успеха
                  </h2>
                  <p>
                    Стандартный текст, который используется для набора всей основной информации на страницах. Он может
                    использоваться в двух цветах:
                  </p>
                  <ul className="list">
                    <li>Черный цвет – для важного текстаЧерный цвет – для важного текста</li>
                    <li>Серый цвет – для второстепенного текста</li>
                  </ul>
                </section>
                <section>
                  <h2>Цвета</h2>
                  <div className="kit__colors">
                    <div className="kit__color kit__color_black" />
                    <div className="kit__color kit__color_gray-dark" />
                    <div className="kit__color kit__color_gray" />
                    <div className="kit__color kit__color_gray-light" />
                  </div>
                </section>
                <section>
                  <h2>Уведомления</h2>
                  <p className="gradient-orange">Cледующий платеж – через 4 дня. На вашем счету не хватает 2 000 ₽</p>
                  <p className="gradient-red">Оплата по тарифу – через 1 день. На вашем счету не хватает 3 000 ₽</p>
                  <p className="gradient-green">Добавлено 3 ГБ бесплатного интернета до 5 марта</p>
                  <p className="gradient-purple">Лучше купить SIM -карту местного оператора</p>
                  <p className="gradient-blue">Добавьте электронную почту в настройках, чтобы получать квитанции</p>
                </section>
                <section>
                  <h2>Поля ввода</h2>
                  <Input className="kit__input" name="" value="" onChange={() => {}} placeholder="Плейсхолдер" />
                  <Input className="kit__input input_active" name="" value="Активное поле" onChange={() => {}} />
                  <Input className="kit__input" name="" value="" onChange={() => {}} placeholder="Электронная почта" />
                  <Input className="kit__input" name="" value="konstantinopolsky@gmail.com" onChange={() => {}} placeholder="Электронная почта" />
                  <Input className="kit__input" name="" value="konstantinopolsky@gmail.com" onChange={() => {}} placeholder="Электронная почта" errorText="Такого адреса не существует" />
                  <div className="detail__period kit__input">
                    <Date
                      className="input_detail"
                      name="startDate"
                      value="30 сентября 2020"
                      onChange={() => {}}
                      initDate={new window.Date(window.Date.now() - 2592000 * 1000)}
                    />
                    <div className="detail__divider" />
                    <Date
                      className="input_detail"
                      name="endDate"
                      value="30 сентября 2020"
                      onChange={() => {}}
                      initDate={new window.Date()}
                    />
                  </div>
                  <Select className="kit__input" onSelect={() => {}} items={['PDF', 'XLS', 'HTML']} value="XLS" placeholder="Выбор из списка" />
                  <MultipleInput onChange={() => {}} name="" count={4} initValue="5677" />
                  <Input className="kit__input input_middle" name="" value="konstantinopolsky@gmail.com" onChange={() => {}} placeholder="Крупное поле ввода" />
                  <InputRuble className="kit__input input_big" name="" value={2000} onChange={() => {}} placeholder="Крупное поле ввода с суммой денег" clear />
                </section>
                <section>
                  <h2>Табы</h2>
                  <Tabs
                    tabs={[{id: 1, name: 'Зона 1'}, {id: 2, name: 'Зона 2'}, {id: 3, name: 'Зона 3'}, {id: 4, name: 'Остальной мир'}]}
                    active={this.state.tab}
                    onTabChange={v => this.onChange('tab', v)}
                    disable={false}
                  />
                </section>
                <section>
                  <h2>Кнопки</h2>
                </section>
                <section>
                  <h2>Таблица в три колонки</h2>
                </section>
                <section>
                  <h2>Успех / Ошибка</h2>
                  <div className="status status_ok">
                    <span>Автоплатеж сохранен</span>
                  </div>
                  <div className="status status_error">
                    <span>Что-то пошло не так</span>
                  </div>
                </section>
                <section>
                  <h2>Карты</h2>
                </section>
                <section>
                  <h2>Изображения в чате</h2>
                </section>
                <section>
                  <h2>Другая графика</h2>
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
