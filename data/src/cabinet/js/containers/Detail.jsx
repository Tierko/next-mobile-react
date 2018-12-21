import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import Breadcrumbs from '../components/Breadcrumbs';
import Date from '../components/Date';
import Input from '../../../common/js/components/Input';
import Select from '../../../common/js/components/Select';
import Button from '../../../common/js/components/Button';
import Transitions from '../components/Transitions';
import Notice from '../components/Notice';
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
        title: 'Детализация отправлена',
        text: 'Отчет о\u00A0расходах с\u00A01\u00A0сентября по\u00A030\u00A0сентября 2018\u00A0г. отправлен в\u00A0виде файла PDF на\u00A0адрес konstantinopolsky@gmail.com',
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
        <HeaderMobile />
        <MobileNav key="nav" type="dashboard" />
        <Notice />
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
};

export default Detail;
