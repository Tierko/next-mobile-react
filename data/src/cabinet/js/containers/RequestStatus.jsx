import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../../../common/js/components/MobileNav';
import Header from '../../../common/js/components/Header';
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
      message: 'Оператор свяжется с\u00A0вами по\u00A0номеру\n+7\u00A0905 123-43-43 для уточнения условий',
      color: 'blue',
    },
  },
  [Statuses.INFORMATION_CHECKED]: {
    type: 'simple',
    content: {
      header: 'Информация проверена',
      message: 'Вы\u00A0будете подключены к\u00A0сети Next Mobile в\u00A0течение 8\u00A0дней. О\u00A0смене оператора мы\u00A0сообщим дополнительно',
      color: 'blue',
    },
  },
  [Statuses.CHANGES_SAVED]: {
    type: 'simple',
    content: {
      header: 'Изменения сохранены',
      message: 'Благодарим за\u00A0обновление информации. Как только данные пройдут проверку, мы\u00A0сообщим вам об\u00A0этом дополнительно',
      color: 'blue',
    },
  },
  [Statuses.TRANSITION_CONFIRMED]: {
    type: 'simple',
    content: {
      header: 'Переход подтвержден',
      message: 'Смена оператора произойдет через 5\u00A0дней. Не\u00A0забудьте вставить новую сим-карту в\u00A0ночь со\u00A0среды на\u00A0четверг',
      color: 'green',
    },
  },
  [Statuses.TRANSITION_STOPPED]: {
    type: 'simple',
    content: {
      header: 'Переход приостановлен',
      message: 'На\u00A0вашем счету есть задолженность 2000\u00A0₽ перед\nпредыдущим оператором. Пожалуйста, погасите\u00A0ее,\nчтобы перейти на\u00A0Next',
      color: 'red',
    },
  },
  [Statuses.SIM_DELIVERY]: {
    type: 'delivery',
    content: {
      header: 'Доставка сим-карты',
      img: '/media/icons/sim-color.svg',
      meta: [{
        id: 1,
        title: 'Дата',
        value: '27\u00A0апреля (вторник)',
      }, {
        id: 2,
        title: 'Время',
        value: '16:00 — 18:00',
      }, {
        id: 3,
        title: 'Адрес',
        value: 'Пл. Крестьянская Застава, д.\u00A012, корп.\u00A044, кв.\u00A01',
      }],
    },
  },
  [Statuses.SIM_DELIVERY_TODAY]: {
    type: 'delivery',
    content: {
      header: 'Доставка сим-карты',
      img: '/media/content/deviver.png',
      text: 'Ваш курьер\u00A0– Максим. Сегодня он\u00A0доставит сим-карту и\u00A0договор. Пожалуйста, не\u00A0забудьте паспорт. Документ нужен для составления договора',
      meta: [{
        id: 1,
        title: 'Время',
        value: '16:00 — 18:00',
      }, {
        id: 2,
        title: 'Адрес',
        value: 'Пл. Крестьянская Застава, д.\u00A012, корп.\u00A044, кв.\u00A01',
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
    const action = {
      title: 'Перейти к оплате',
      type: 'link',
      value: '/',
    };

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
          <Header />
          <Transitions classNames="slide">
            {
              !status &&
              <div className="welcome__content request-status">
                <div className="request-status__title">Статус заявки</div>
                {
                  codeSent &&
                  <div className="request-status__message">
                    Введите код, который мы&nbsp;прислали на&nbsp;номер <span className="nobr">{phone}</span>
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
                <MobileCode
                  phone={phone}
                  onCodeSend={onCodeSend}
                  onEnter={onEnter}
                  buttonTitle="Проверить статус заявки"
                  ref={mobileCode}
                />
              </div>
            }
            {
              type === 'simple' &&
              <RequestStatusSimple
                header={content.header}
                message={content.message}
                color={content.color}
                action={status === Statuses.TRANSITION_STOPPED ? action : null}
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
