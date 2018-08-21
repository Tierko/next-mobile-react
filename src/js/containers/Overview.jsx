import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import Transitions from '../components/Transitions';

import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Footer from '../components/Footer';
import Balance from '../components/Balance';
import OverviewPayment from '../components/OverviewPayment';
import Remain from '../components/Remain';
import History from '../components/History';
import RoamingDashboard from '../components/RoamingDashboard';
import Note from '../components/Note';
import OverviewInvite from '../components/OverviewInvite';
import OverviewRoamingCurrent from '../components/OverviewRoamingCurrent';
import OverviewAutoPay from '../components/OverviewAutoPay';

import { Pages, DAYS, TITLES } from '../constants';
import { getData, formatCost, convertStrings } from '../utils';

class Overview extends Component {
  state = {
    sum: getData('balance') < getData('tariff').payment ? getData('tariff').payment - getData('balance') : getData('tariff').payment,
    invites: {
      message: '',
      items: [],
      desc: '',
    },
  };

  componentDidMount() {
    fetch('/media/data/invites.json')
      .then(invites => invites.json())
      .then(invites => this.setState({ invites }));
  }

  onBuy = () => {
    const { history } = this.props;

    history.push(Pages.ADD_PACKAGE);
  };

  onPay = () => {
    const { history, cards } = this.props;
    const { sum } = this.state;
    const links = [{
      url: Pages.AUTO_PAY,
      title: 'Сделать платеж регулярным',
    }, {
      url: Pages.OVERVIEW,
      title: 'Вернуться на главную',
    }];

    history.push({
      pathname: `${Pages.RESULT}/success`,
      state: {
        title: 'Оплата прошла успешно',
        text: `На ваш счет зачислено ${formatCost(sum)}`,
        links,
      },
    });

    if (cards.defaultCard) {
      history.push({
        pathname: `${Pages.RESULT}/success`,
        state: {
          title: 'Оплата прошла успешно',
          text: `На ваш счет зачислено ${formatCost(sum)}`,
          links,
        },
      });
    } else {
      history.push({
        pathname: Pages.PAY,
        state: { sum },
      });
    }
  };

  sumChange = (n, v) => {
    if (v.toString().length > 5) {
      return;
    }

    this.setState({
      sum: v,
    });
  };

  render() {
    const { roaming, history } = this.props;
    const { onPay, sumChange, onBuy } = this;
    const { sum, invites: { message, items } } = this.state;
    const data = getData('payment');
    const code = items.find(i => !i.active);
    const meta = {
      title: TITLES.OVERVIEW,
    };
    let status = '';

    if (data.days > 5 && data.days <= 10 && getData('balance') < getData('tariff').payment) {
      status = 'warn';
    }

    if (data.days <= 5 && getData('balance') < getData('tariff').payment) {
      status = 'error';
    }

    return (
      <DocumentMeta {...meta}>
        <MobileNav key="nav" type="dashboard" />
        <div key="dashboard" className="dashboard">
          <Aside hideLink />
          <Transitions id="Overview">
            <div className="dashboard__content">
              <Note
                className="note_dashboard"
                message="Вы докупили пакет с 30 ГБ трафика, действующий до 5 марта"
                subText="Спасибо, что всегда оплачиваетесчет вовремя"
                color="green"
                hideCont
                show={!!getData('noteGreen')}
              />
              <Note
                className="note_dashboard"
                message="Добавьте электронную почту в настройках, чтобы получать квитанции"
                subText="Перейти в настройки"
                color="blue"
                hideCont
                show={!!getData('noteBlue')}
              />
              <Note
                className="note_dashboard"
                message="Ваш номер заблокирован"
                color="red"
                hideCont
                show={!!getData('noteRed')}
                subText="Чтобы разблокровать номер, обратитесь в поддержку"
              />
              <Balance
                sum={getData('balance')}
                message={`Через ${getData('payment').days} дней нужно внести ${formatCost(getData('tariff').payment)} по тарифу «${getData('tariff').title}»`}
                status={status}
              />
              <OverviewPayment onChange={sumChange} onPay={onPay} sum={sum} />
              <OverviewAutoPay />
              <OverviewRoamingCurrent history={history} data={roaming} />
              <Remain
                data={getData('remain')}
                tariff={getData('tariff')}
                buy={onBuy}
                inRoaming={!!roaming.currentZoneId}
              />
              <History data={getData('history')} />
              <RoamingDashboard data={roaming} />
              <OverviewInvite message={message} code={code ? code.code : ''} />
              <Footer als />
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

function mapStateToProps(state) {
  const { Roaming, Cards } = state;

  return {
    roaming: Roaming,
    cards: Cards,
  };
}

Overview.propTypes = {
  history: PropTypes.shape().isRequired,
  roaming: PropTypes.shape().isRequired,
  cards: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Overview);
