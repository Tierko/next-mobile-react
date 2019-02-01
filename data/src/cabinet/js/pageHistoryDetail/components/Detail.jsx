import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import moment from 'moment';

import MobileNav from '~/common/js/components/MobileNav';
import Input from '~/common/js/components/Input';
import Select from '~/common/js/components/Select';
import Button from '~/common/js/components/Button';

import HeaderMobile from '@cabinet/components/HeaderMobile';
import Aside from '@cabinet/components/Aside';
import Breadcrumbs from '@cabinet/components/Breadcrumbs';
import Date from '@cabinet/components/Date';
import Transitions from '@cabinet/components/Transitions';

//import Notice from '../components/Notice';
import { Pages, TITLES, THIRTY_DAYS } from '~/common/js/constants';

class Detail extends Component {
  static formats = [{
    id: 1,
    title: 'PDF',
    code: 'pdf',
  }, {
    id: 2,
    title: 'DOC',
    code: 'docx',
  },  {
    id: 3,
    title: 'XLS',
    code: 'xlsx',
  }, {
    id: 4,
    title: 'HTML',
    code: 'html',
  }];

  static formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  };

  state = {
    startDate: new window.Date(window.Date.now() - THIRTY_DAYS),
    endDate: new window.Date(),
    email: 'Konstantinopolsky@gmail.com',
    format: Detail.formats[0],
  };

  onChange = (name, value) => {
    const { startDate, endDate } = this.state;

    if (name === 'startDate' && value.getTime() >= endDate.getTime()) {
      return;
    }

    if (name === 'endDate' && value.getTime() <= startDate.getTime()) {
      return;
    }

    this.setState({
      [name]: value,
    });
  };

  isInLimit = () => {
    const { startDate, endDate } = this.state;

    const start = startDate.getTime();
    const end = endDate.getTime();

    return Math.abs(start - end) <= THIRTY_DAYS;
  };

  order = () => {
    const {
      startDate,
      endDate,
      email,
      format,
    } = this.state
    const {
      history,
      pageHistoryDetailActions,
    } = this.props;


    pageHistoryDetailActions.requestHistoryDetail({
      email,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
      fileType: format.value,
    }).then(() => {
      const startDateFormatted = moment(startDate).format('D\u00A0MMMM\u00A0YYYY\u00A0г.')
      const endDateFormatted = moment(endDate).format('D\u00A0MMMM\u00A0YYYY\u00A0г.')
      history.push({
        pathname: `${Pages.RESULT}/success`,
        state: {
          title: 'Детализация отправлена',
          nextPage: Pages.HISTORY,
          text: `Отчет о\u00A0расходах с\u00A0${startDateFormatted} по\u00A0${endDateFormatted} отправлен в\u00A0виде файла ${format.title} на\u00A0адрес ${email}`,
        },
      });
    })

  };

  render() {
    const { onChange, order, isInLimit } = this;
    const { formats } = Detail;
    const {
      startDate,
      endDate,
      email,
      format,
    } = this.state;
    const meta = {
      title: TITLES.DETAIL,
    };

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile />
        <MobileNav key="nav" type="dashboard" />
        {/*<Notice />*/}
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content dashboard__content_white">
              <Breadcrumbs
                items={[{ title: 'История', link: Pages.HISTORY }]}
                current={TITLES.DETAIL}
              />
              <div className="detail">
                <div className="dashboard__header">Детализация</div>
                <div className="detail__period-title">За&nbsp;период</div>
                <div className="detail__period">
                  <Date
                    className="input_detail"
                    name="startDate"
                    value={startDate}
                    onChange={onChange}
                    errorText={!isInLimit()}
                  />
                  <div className="detail__divider" />
                  <Date
                    className="input_detail"
                    name="endDate"
                    value={endDate}
                    onChange={onChange}
                    errorText={!isInLimit()}
                  />
                </div>
                {
                  !isInLimit() &&
                  <div className="detail__error">Вы&nbsp;выбрали слишком большой период <span className="nobr">(максимум 30&nbsp;дней)</span></div>
                }
                <Input
                  placeholder="На какую почту отправить"
                  name="email"
                  value={email}
                  onChange={onChange}
                  className="input_detain-email"
                />
                <Select placeholder="Формат" onSelect={v => onChange('format', v)} items={formats} value={format} />
                <Button
                  className="button_detail"
                  onClick={order}
                  primary
                >
                  Заказать детализацию
                </Button>
              </div>
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

Detail.propTypes = {
  history: PropTypes.shape().isRequired,
  pageHistoryDetailActions: PropTypes.shape().isRequired,
};

export default Detail;
