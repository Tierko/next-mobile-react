import React from 'react';
import Aside from '../components/Aside';
import MobileNav from '../components/MobileNav';

const Kit = () => (
  [
    <MobileNav type="dashboard" />,
    <div className="dashboard">
      <Aside />
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
            <div>Cледующий платеж – через 4 дня. На вашем счету не хватает 2 000 ₽</div>
            <div>Оплата по тарифу – через 1 день. На вашем счету не хватает 3 000 ₽</div>
            <div>Добавлено 3 ГБ бесплатного интернета до 5 марта</div>
            <div>Лучше купить SIM -карту местного оператора</div>
            <div>Добавьте электронную почту в настройках, чтобы получать квитанции</div>
          </section>
          <section>
            <h2>Поля ввода</h2>
          </section>
          <section>
            <h2>Табы</h2>
          </section>
          <section>
            <h2>Кнопки</h2>
          </section>
          <section>
            <h2>Таблица в три колонки</h2>
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
    </div>
  ]
);

export default Kit;
