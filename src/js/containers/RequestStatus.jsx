import React from 'react';
import MobileNav from '../components/MobileNav';
import NavLobby from '../components/NavLobby';
import RequestStatusSimple from '../components/RequestStatusSimple';
import RequestStatusFooter from '../components/RequestStatusFooter';
import { Statuses } from '../constants';

const data = {
  [Statuses.REQUEST_SENT]: {
    type: 'simple',
    content: {
      header: 'Заявка отправлена',
      message: 'Оператор свяжется с вами по номеру + 7 906 123-45-67,когда заявка будет одобрена.',
      color: 'blue',
    },
  },
  [Statuses.INFORMATION_CHECKED]: {
    type: 'simple',
    content: {
      header: 'Информация проверена',
      message: 'Оператор будет сменен на Next Mobile в течении 8 дней. Мы сообщим, как только это произойдет',
      color: 'blue',
    },
  },
  [Statuses.CHANGES_SAVED]: {
    type: 'simple',
    content: {
      header: 'Изменения сохранены',
      message: 'Спасибо, что исправили данные. Мы сообщим, как только их проверим',
      color: 'blue',
    },
  },
  [Statuses.TRANSITION_CONFIRMED]: {
    type: 'simple',
    content: {
      header: 'Переход подтвержден',
      message: 'Оператор будет сменен на Next через 5 дней. Не забудьте вставить новую SIM-карту в ночь со среды на четверг',
      color: 'green',
    },
  },
  [Statuses.TRANSITION_STOPPED]: {
    type: 'simple',
    content: {
      header: 'Переход приостановлен',
      message: 'На вашем счету есть задолженность 2000 ₽ перед предыдущим оператором. Пожалуйста, погасите ее, чтобы перейти на Next',
      color: 'red',
    },
  },
};

const RequestStatus = ({ match }) => {
  const status = match.params.status || Statuses.REQUEST_SENT;
  const { type, content } = data[status];

  return (
    <div className="request-status">
      <MobileNav type="enter" />
      <NavLobby />
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
};

export default RequestStatus;
