import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileNav from '../components/MobileNav';
import NavLobby from '../components/NavLobby';
import InputPhone from '../components/InputPhone';
import MobileCode from '../components/MobileCode';
import RequestStatusSimple from '../components/RequestStatusSimple';
import RequestStatusFooter from '../components/RequestStatusFooter';
import { Statuses, Pages } from '../constants';

const data = {
  [Statuses.REQUEST_SENT]: {
    type: 'simple',
    content: {
      header: 'Заявка отправлена',
      message: 'Оператор свяжется с вами по номеру\n + 7 906 123-45-67, когда заявка будет одобрена.',
      color: 'blue',
    },
  },
  [Statuses.INFORMATION_CHECKED]: {
    type: 'simple',
    content: {
      header: 'Информация проверена',
      message: 'Оператор будет сменен на Next Mobile в течении 8 дней. Мы\nсообщим, как только это произойдет',
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
      header: 'Переход подтвержден',
      message: 'Оператор будет сменен на Next через 5 дней.\nНе забудьте вставить новую SIM-карту в ночь\nсо среды на четверг',
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
};

class RequestStatus extends Component {
  state = {
    phone: '+7',
    codeSent: false,
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onCodeSend = () => {
    this.setState({
      codeSent: true,
    });
  };

  onEnter = () => {
    const { history } = this.props;

    history.push(`${Pages.RequestStatus}/${Statuses.INFORMATION_CHECKED}`);
  };

  render() {
    const { status } = this.props.match.params;
    const { phone, codeSent } = this.state;
    const { onChange, onCodeSend, onEnter } = this;
    let content;
    let type;

    if (status) {
      ({ content, type } = data[status]);
    }

    return (
      <div className="welcome">
        <MobileNav type="enter" />
        <NavLobby />
        {
          !status &&
          <div className="welcome__content request-status">
            <div className="request-status__title">Статус заявки</div>
            {
              codeSent &&
              <div className="request-status__message">
                Введите код, который мы прислали на номер {phone}
              </div>
            }
            {
              !codeSent &&
              <div>
                Введите номер, с которым вы оставляли заявку
              </div>
            }
            <InputPhone onChange={onChange} value={phone} name="phone" className="input_phone" />
            <MobileCode phone={phone} onCodeSend={onCodeSend} onEnter={onEnter} buttonTitle="Проверить статус" />
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
        <RequestStatusFooter />
      </div>
    );
  }
}

RequestStatus.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default RequestStatus;
