import merge from 'lodash/merge';
import get from 'lodash/get';
import moment from 'moment';

import { Statuses } from '~/common/js/constants';

import { formatPhone } from '@cabinet/utils';


export const APPLICATION_STATUSES = {
  1: Statuses.REQUEST_SENT, // Отправлена
  2: Statuses.SIM_DELIVERY, // Информация по доставке предварительная
  3: Statuses.SIM_DELIVERY_TODAY, // Сегодня
  4: Statuses.INFORMATION_CHECKED, // Инф. проверена
  5: Statuses.TRANSITION_CONFIRMED, // Переход подтвержден
  6: Statuses.TRANSITION_STOPPED, // Задолженость
  7: Statuses.TRANSITION_STOPPED_OTHER_PERSONE, // Другое лицо

  8: Statuses.TRANSITION_CANCELED // Переход отменен, используется для заявки на промокод
}

const APPLICATION_STATUSES_REVERSED = {
  [Statuses.REQUEST_SENT]: 1,
  [Statuses.SIM_DELIVERY]: 2,
  [Statuses.SIM_DELIVERY_TODAY]: 3,
  [Statuses.INFORMATION_CHECKED]: 4,
  [Statuses.TRANSITION_CONFIRMED]: 5,
  [Statuses.TRANSITION_STOPPED]: 6,
  [Statuses.TRANSITION_STOPPED_OTHER_PERSONE]: 7,
  [Statuses.TRANSITION_CANCELED]: 8,
}

const PHONE_PLACEHOLDER = '{$phone}'
const COURIER_PLACEHOLDER = '{$courier}'

const statusesTemplates = {
  [Statuses.REQUEST_SENT]: {
    type: 'simple',
    content: {
      header: 'Запрос принят',
      message: `Оператор свяжется с\u00A0вами по\u00A0номеру\n${PHONE_PLACEHOLDER} для уточнения условий`,
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
      message: 'На\u00A0вашем счету есть задолженность перед\nпредыдущим оператором. Пожалуйста, погасите\u00A0ее,\nчтобы перейти на\u00A0Next',
      color: 'red',
    },
  },
  [Statuses.TRANSITION_STOPPED_OTHER_PERSONE]: {
    type: 'simple',
    content: {
      header: 'Переход приостановлен',
      message: 'Номер зарегистрирован на другое лицо',
      color: 'red',
    },
  },
  [Statuses.TRANSITION_CANCELED]: {
    type: 'simple',
    content: {
      header: 'Переход отменен',
      message: '',
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
      text: `Ваш курьер\u00A0– ${COURIER_PLACEHOLDER}. Сегодня он\u00A0доставит сим-карту и\u00A0договор. Пожалуйста, не\u00A0забудьте паспорт. Документ нужен для составления договора`,
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

export const getStatusInfo = (application, currentPhone) => {
  let status = Statuses.REQUEST_SENT
  if (application.application) {
    status = APPLICATION_STATUSES[application.application.status]
  } else if (get(application, ['inviteApplication', 'status']) === 1) {
    status = Statuses.TRANSITION_CANCELED
  }
  const currentStatusTemplate = merge({}, statusesTemplates[status])
  if (currentStatusTemplate.content.message) {
    currentStatusTemplate.content.message = currentStatusTemplate.content.message.replace(
      PHONE_PLACEHOLDER,
      formatPhone(currentPhone),
    )
    currentStatusTemplate.content.message = currentStatusTemplate.content.message.replace(
      COURIER_PLACEHOLDER,
      get(application, ['application', 'delivery', 'courier', 'name'])
    )
  }
  currentStatusTemplate.content.meta = []
  if (status === Statuses.SIM_DELIVERY) {
    currentStatusTemplate.content.meta.push({
      id: 1,
      title: 'Дата',
      value: moment(application.application.delivery.data).format('DD MMMM (dddd)'),
    })
  }
  if (
    status === Statuses.SIM_DELIVERY ||
    status === Statuses.SIM_DELIVERY_TODAY
  ) {
    currentStatusTemplate.content.meta.push({
      id: 2,
      title: 'Время',
      value: application.application.delivery.timeRange.range,
    })
    currentStatusTemplate.content.meta.push({
      id: 3,
      title: 'Адрес',
      value: application.application.delivery.address,
    })
  }

  return currentStatusTemplate
}
