import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { Pages, DAYS } from '../constants';
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

  onPay = () => {
    const { history } = this.props;
    const { sum } = this.state;

    history.push({
      pathname: Pages.PAY,
      state: { sum },
    });
  };

  onBuy = () => {
    const { history } = this.props;

    history.push(Pages.ADD_PACKAGE);
  };

  componentDidMount() {
    fetch('/data/invites.json')
      .then(invites => invites.json())
      .then(invites => this.setState({ invites }));
  }

  sumChange = (n, v) => {
    if (v.toString().length > 5) {
      return;
    }

    this.setState({
      sum: v,
    });
  };

  render() {
    const { roaming } = this.props;
    const { onPay, sumChange, onBuy } = this;
    const { sum, invites: { message, items } } = this.state;
    const data = getData('payment');
    const code = items.find(i => !i.active);
    let status = '';

    if (data.days > 5 && data.days <= 10 && getData('balance') < getData('tariff').payment) {
      status = 'warn';
    }

    if (data.days <= 5 && getData('balance') < getData('tariff').payment) {
      status = 'error';
    }

    return [
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <Note
            className="note_dashboard"
            message="Добавлено 3ГБ бесплатного интернета до 5 марта"
            color="green"
            hideCont
            show={getData('noteGreen')}
          />
          <Note
            className="note_dashboard"
            message="Добавьте электронную почту в настройках, чтобы получать квитанции"
            color="blue"
            hideCont
            show={getData('noteBlue')}
          />
          <Note
            className="note_dashboard"
            message="Ваш номер заблокирован"
            color="red"
            hideCont
            show={getData('noteRed')}
          />
          <Balance
            sum={getData('balance')}
            message={`Следующий платеж: ${formatCost(getData('tariff').payment)} через ${getData('payment').days} ${convertStrings(getData('payment').days, DAYS)}`}
            status={status}
          />
          <OverviewPayment onChange={sumChange} onPay={onPay} sum={sum} />
          <Remain data={getData('remain')} tariff={getData('tariff')} buy={onBuy} />
          <History data={getData('history')} />
          <RoamingDashboard data={roaming} />
          <OverviewInvite message={message} code={code ? code.code : ''} />
          <Footer />
        </div>
      </div>,
    ];
  }
}

function mapStateToProps(state) {
  const { Roaming } = state;

  return {
    roaming: Roaming,
  };
}

Overview.propTypes = {
  history: PropTypes.shape().isRequired,
  roaming: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Overview);
