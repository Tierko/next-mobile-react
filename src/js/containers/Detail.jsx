import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import LinkBack from '../components/LinkBack';
import Date from '../components/Date';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Transitions from '../components/Transitions';
import { Pages } from '../constants';

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
    startDate: '',
    endDate: '',
    email: 'Konstantinopolsky@gmail.com',
    format: Detail.formats[0],
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  order = () => {
    const { history } = this.props;

    history.push({
      pathname: `${Pages.RESULT}/success`,
      state: {
        title: 'Детализация заказана',
        text: 'О расходах с 10 сентября по 21 октября 2018 в формате PDF на почту konstantinopolsky@gmail.com',
      },
    });
  };

  render() {
    const { onChange, order } = this;
    const { formats } = Detail;
    const {
      startDate,
      endDate,
      email,
      format,
    } = this.state;

    return ([
      <MobileNav key="nav" type="dashboard" />,
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
                  initDate={new window.Date(window.Date.now() - 2592000 * 1000)}
                />
                <div className="detail__divider" />
                <Date
                  className="input_detail"
                  name="endDate"
                  value={endDate}
                  onChange={onChange}
                  initDate={new window.Date()}
                />
              </div>
              <Input placeholder="На какую почту отправить" name="email" value={email} onChange={onChange} />
              <Select placeholder="Формат" onSelect={v => onChange('format', v)} items={formats} value={format} />
              <Button className="button_detail" onClick={order}>Заказать детализацию</Button>
            </div>
          </div>
        </Transitions>
      </div>,
    ]);
  }
}

Detail.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Detail;
