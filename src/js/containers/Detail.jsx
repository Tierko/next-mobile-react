import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import LinkBack from '../components/LinkBack';
import Date from '../components/Date';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Transitions from '../components/Transitions';
import { Pages, TITLES, THIRTY_DAYS } from '../constants';

class Detail extends Component {
  static formats = [{
    id: 1,
    title: 'PDF',
  }, {
    id: 2,
    title: 'XLS',
  }, {
    id: 3,
    title: 'HTML',
  }];

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
    const { history } = this.props;

    history.push({
      pathname: `${Pages.RESULT}/success`,
      state: {
        title: 'Детализация заказана',
        text: 'Отчет о расходах с 1 сентября по 30 сентября 2018 г. отправлен в виде файла PDF на адрес konstantinopolsky@gmail.com',
      },
    });
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
        <MobileNav key="nav" type="dashboard" />
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content">
              <LinkBack href={Pages.HISTORY} className="link-back_detail" />
              <div className="detail">
                <div className="dashboard__header dashboard__header_center">Детализация</div>
                <div className="detail__period-title">За период</div>
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
                  <div className="detail__error">Вы выбрали слишком большой период <span className="nobr">(максимум 30 дней)</span></div>
                }
                <Input
                  placeholder="На какую почту отправить"
                  name="email"
                  value={email}
                  onChange={onChange}
                  className="input_detain-email"
                />
                <Select placeholder="Формат" onSelect={v => onChange('format', v)} items={formats} value={format} />
                <Button className="button_detail" onClick={order}>Заказать детализацию</Button>
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
};

export default Detail;
