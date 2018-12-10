import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import Transitions from '../components/Transitions';

import HeaderMobile from '../components/HeaderMobile'
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import Footer from '../../../common/js/components/Footer';
import Balance from '../components/Balance';
import Remain from '../components/Remain';
import History from '../components/History';
import RoamingDashboard from '../components/RoamingDashboard';
import OverviewInvite from '../components/OverviewInvite';
import OverviewRoamingCurrent from '../components/OverviewRoamingCurrent';
import FooterNav from '../components/FooterNav';
import Notice from '../components/Notice';

import { Pages, TITLES } from '../constants';
import { getData, formatCost } from '../utils';

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
    fetch('/media/info/invites.json', {
      credentials: 'same-origin',
      method: 'GET',
    })
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
      primary: true,
    }, {
      url: Pages.OVERVIEW,
      title: 'Вернуться на\u00A0главную',
    }];

    history.push({
      pathname: `${Pages.RESULT}/success`,
      state: {
        title: 'Оплата прошла успешно',
        text: `На\u00A0ваш счет зачислено ${formatCost(sum)}`,
        links,
      },
    });

    if (cards.defaultCard) {
      history.push({
        pathname: `${Pages.RESULT}/success`,
        state: {
          title: 'Оплата прошла успешно',
          text: `На\u00A0ваш счет зачислено ${formatCost(sum)}`,
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
    const code = items.find(i => !i.active);
    const meta = {
      title: TITLES.OVERVIEW,
    };

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile hideHomeLink />
        <MobileNav key="nav" type="dashboard" />
        <Notice />
        <div key="dashboard" className="dashboard">
          <Aside hideLink />
          <Transitions>
            <div className="dashboard__content">
              <Balance
                balance={getData('balance')}
                sum={sum}
                message={`Следующее списание: ${formatCost(getData('tariff').payment)} 16 ноября`}
                onPay={onPay}
                onChange={sumChange}
              />
              <OverviewRoamingCurrent history={history} data={roaming} />
              <Remain
                data={getData('remain')}
                tariff={getData('tariff')}
                buy={onBuy}
              />
              <History data={getData('history')} operations={getData('operations')} />
              <RoamingDashboard data={roaming} />
              <OverviewInvite message={message} code={code ? code.code : ''} />
              <FooterNav />
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
