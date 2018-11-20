import React, { Component } from 'react';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import Input from '../components/Input';
import FaqItem from '../components/FaqItem';

class Faq extends Component {
  state = {
    search: '',
    loaded: false,
    error: false,
    data: [{
      title: 'Баланс и оплата',
      items: [{
        id: 1,
        title: 'Как узнать баланс',
        text: 'Выберите один из способов:\n'+
        '1. В мобильном приложении\n'+
        '2. Наберите на телефоне команду *100# и нажмите клавишу вызова\n'+
        '3. Задайте вопрос оператору в мобильном приложении, с помощью чата,  Viber, Telegram или WhatsApp (номер +7 900 616 6677)\n'+
        '4. Позвоните в контактный центр: 6677, либо  8-800-600-6677. Звонок бесплатный',
      }],
    }],
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  filter = (data, search) => {
    return data.map((s) => {
      if (!search) {
        return s;
      }

      return {
        title: s.title,
        items: s.items.slice().filter(i => (
          i.title.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
          i.text.toUpperCase().indexOf(search.toUpperCase()) !== -1
        )),
      };
    });
  };

  render() {
    const { data, search } = this.state;
    const { onChange, filter } = this;
    const filteredData = filter(data, search);

    return (
      <div className="faq">
        <div className="faq__content">
          <div className="faq__header">Часто задаваемые вопросы</div>
          <Input name="search" value={search} onChange={onChange} />
          {
            filteredData.map(section => (
              !!section.items.length &&
                <Element name={`q${section.id}`}>
                  <div className="faq__section">
                    <div className="faq__subheader">{section.title}</div>
                    <div className="faq__questions">
                      {
                        section.items.map(i => (
                          <FaqItem title={i.title} text={i.text} search={search} />
                        ))
                      }
                    </div>
                  </div>
                </Element>
            ))
          }
        </div>
        <div className="faq__aside">
          {
            data.map(i => (
              <Link to={`q${i.id}`}>{i.title}</Link>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Faq;
