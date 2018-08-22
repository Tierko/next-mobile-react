import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../components/MobileNav';
import NavLobby from '../components/NavLobby';
import InputPhone from '../components/InputPhone';
import MobileCode from '../components/MobileCode';
import RequestStatusSimple from '../components/RequestStatusSimple';
import RequestStatusDelivery from '../components/RequestStatusDelivery';
import RequestStatusFooter from '../components/RequestStatusFooter';
import Transitions from '../components/Transitions';
import { Statuses, Pages, TITLES } from '../constants';

const data = {
  [Statuses.REQUEST_SENT]: {
    type: 'simple',
    content: {
      header: 'Запрос принят',
      message: 'ператор свяжется с вами по номеру +7 905 123-43-43 для уточнения условий',
      color: 'blue',
    },
  },
  [Statuses.INFORMATION_CHECKED]: {
    type: 'simple',
    content: {
      header: 'Информация проверена',
      message: 'Вы будете подключены к сети Next Mobile в течение 8 дней. О смене оператора мы сообщим дополнительно',
      color: 'blue',
    },
  },
  [Statuses.CHANGES_SAVED]: {
    type: 'simple',
    content: {
      header: 'Изменения сохранены',
      message: 'Спасибо, что исправили данные. Мы сообщим, как только\nих проверим',
      color: 'blue',
    },
  },
  [Statuses.TRANSITION_CONFIRMED]: {
    type: 'simple',
    content: {
      header: 'Запрос одобрен',
      message: 'Для перехода на Next Mobile осталось заполнить небольшую форму',
      color: 'green',
    },
  },
  [Statuses.TRANSITION_STOPPED]: {
    type: 'simple',
    content: {
      header: 'Переход приостановлен',
      message: 'На вашем счету есть задолженность 2000 ₽ перед\nпредыдущим оператором. Пожалуйста, погасите ее,\nчтобы перейти на Next',
      color: 'red',
    },
  },
  [Statuses.SIM_DELIVERY]: {
    type: 'delivery',
    content: {
      header: 'Доставка сим-карты',
      img: '/media/images/sim.png',
      meta: [{
        id: 1,
        title: 'Дата',
        value: '27 апреля (вторник)',
      }, {
        id: 2,
        title: 'Время',
        value: '16:00—18:00',
      }, {
        id: 3,
        title: 'Адрес',
        value: 'Пл. Крестьянская Застава, д. 12, корп. 44, кв. 1',
      }],
    },
  },
  [Statuses.SIM_DELIVERY_TODAY]: {
    type: 'delivery',
    content: {
      header: 'Доставка сим-карты',
      img: '/media/content/deviver.png',
      text: 'Ваш курьер — Максим. Сегодня он доставит сим-карту и договор. Пожалуйста, не забудьте паспорт. Документ нужен для составления договора',
      meta: [{
        id: 1,
        title: 'Время',
        value: '16:00–18:00',
      }, {
        id: 2,
        title: 'Адрес',
        value: 'Пл. Крестьянская Застава, д. 12, корп. 44, кв. 1',
      }],
    },
  },
};

class RequestStatus extends Component {
  state = {
    phone: '',
    codeSent: false,
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onEnter = () => {
    const { history } = this.props;

    history.push(`${Pages.REQUEST_STATUS}/${Statuses.INFORMATION_CHECKED}`);
  };

  onCodeSend = () => {
    this.setState({
      codeSent: true,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { mobileCode: { current: { sendCode } } } = this;

    sendCode();
  };

  mobileCode = React.createRef();

  render() {
    const { status } = this.props.match.params;
    const { phone, codeSent } = this.state;
    const {
      onChange,
      onSubmit,
      onEnter,
      onCodeSend,
      mobileCode,
    } = this;
    let content;
    let type;

    if (status) {
      ({ content, type } = data[status]);
    }

    const meta = {
      title: content ? content.header : TITLES.REQUEST_STATUS,
    };

    return (
      <DocumentMeta {...meta}>
        <div className="welcome">
          <MobileNav type="enter" />
          <NavLobby />
          <Transitions classNames="slide">
            {
              !status &&
              <div className="welcome__content request-status">
                <div className="request-status__title">Статус заявки</div>
                {
                  codeSent &&
                  <div className="request-status__message">
                    Введите код, который мы прислали на номер <span className="nobr">{phone}</span>
                  </div>
                }
                {
                  !codeSent &&
                  <div className="request-status__message">
                    Введите номер телефона, указанный при составлении заявки
                  </div>
                }
                {
                  !codeSent &&
                  <form onSubmit={onSubmit}>
                    <InputPhone onChange={onChange} value={phone} name="phone" className="input_phone" />
                  </form>
                }
                <MobileCode phone={phone} onCodeSend={onCodeSend} onEnter={onEnter} buttonTitle="Проверить статус" ref={mobileCode} />
              </div>
            }
            {
              type === 'simple' &&
              <RequestStatusSimple
                header={content.header}
                message={content.message}
                color={content.color}
              />
            }
            {
              type === 'delivery' &&
              <RequestStatusDelivery data={content} />
            }
            <RequestStatusFooter />
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

RequestStatus.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default RequestStatus;
