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
                  <h1>Н1. Самый большой заголовок на&nbsp;странице</h1>
                  <h2>
                    Н2. Заголовок поменьше. Может быть в&nbsp;несколько строк. Используется, например, на&nbsp;страницах ошибки и&nbsp;успеха
                  </h2>
                  <p>
                    Стандартный текст, который используется для набора всей основной информации на&nbsp;страницах. Он&nbsp;может использоваться в&nbsp;двух цветах:
                  </p>
                  <ul className="list">
                    <li>Черный цвет&nbsp;&mdash; для важного текстаЧерный цвет&nbsp;&mdash; для важного текста</li>
                    <li>Серый цвет&nbsp;&mdash; для второстепенного текста</li>
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
                  <p className="gradient-orange">Cледующий платеж&nbsp;&mdash; через 4&nbsp;дня. На&nbsp;вашем счету не&nbsp;хватает 2000&nbsp;₽</p>
                  <p className="gradient-red">Оплата по&nbsp;тарифу&nbsp;&mdash; через 1&nbsp;день. На&nbsp;вашем счету не&nbsp;хватает 3000&nbsp;₽</p>
                  <p className="gradient-green">Добавлено 3&nbsp;ГБ бесплатного интернета до&nbsp;5&nbsp;марта</p>
                  <p className="gradient-purple">Лучше купить SIM&nbsp;&mdash; карту местного оператора</p>
                  <p className="gradient-blue">Добавьте электронную почту в&nbsp;настройках, чтобы получать квитанции</p>
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
                  <TabsRoaming
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
                  <h2>Таблица в&nbsp;три колонки</h2>
                </section>
                <section>
                  <h2>Успех / Ошибка</h2>
                  <div className="status status_ok">
                    <span>Автоплатеж сохранен</span>
                  </div>
                  <div className="status status_error">
                    <span>Что-то пошло не&nbsp;так</span>
                  </div>
                </section>
                <section>
                  <h2>Карты</h2>
                </section>
                <section>
                  <h2>Изображения в&nbsp;чате</h2>
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
