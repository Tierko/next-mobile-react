import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import get from 'lodash/get';

import Transitions from '@cabinet/components/Transitions';

import HeaderMobile from '@cabinet/components/HeaderMobile';
import MobileNav from '~/common/js/components/MobileNav';
import Aside from '@cabinet/components/Aside';
import Footer from '~/common/js/components/Footer';
import Balance from './Balance';
import Remain from './Remain';
import History from '@cabinet/components/History';
import RoamingDashboard from '@cabinet/components/RoamingDashboard';
import OverviewInvite from './OverviewInvite';
import OverviewRoamingCurrent from './OverviewRoamingCurrent';
import FooterNav from '@cabinet/components/FooterNav';
// import Notice from '../components/Notice';

import {
  Pages,
  TITLES,
  PROMO_STATUS_NEW,
} from '~/common/js/constants';
import { getData, formatCost } from '@cabinet/utils';

const links = [{
  url: Pages.AUTO_PAY,
  title: 'Сделать платеж регулярным',
  primary: true,
}, {
  url: Pages.OVERVIEW,
  title: 'Вернуться на главную',
}];

class Overview extends Component {
  state = {
    sum: 1500,
  };

  onBuy = () => {
    const { history } = this.props;
    history.push(Pages.ADD_PACKAGE);
  };

  onPay = () => {
    const { history, defaultCard, dashboardActions } = this.props;
    const { sum } = this.state;

    if (defaultCard) {
      dashboardActions.pay(sum, defaultCard.extId).then(() => {
        this.onPaySuccess();
      });
    } else {
      history.push({
        pathname: Pages.PAY,
        state: { sum },
      });
    }
  };

  onPaySuccess = () => {
    const { history } = this.props;
    const { sum } = this.state;

    history.push({
      pathname: `${Pages.RESULT}/success`,
      state: {
        title: 'Оплата прошла успешно',
        text: `На ваш счет зачислено ${formatCost(sum)}`,
        links,
      },
    });
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
    const {
      history,
      dashboard,
      paymentsCards,
      historyGroups,
      invites,
      roamingZones,
    } = this.props;
    const { onPay, sumChange, onBuy } = this;
    const { sum } = this.state;
    const code = invites.invites.find(i => i.status === PROMO_STATUS_NEW);
    const meta = {
      title: TITLES.OVERVIEW,
    };
    let status = '';

    const currentBalance = +((dashboard.dashboard.balance || 0).toString().replace(',', '.'));

    const currentNotificationType = get(dashboard, ['dashboard', 'paymentNotification', 'type']);
    const currentNotificationMessage = get(dashboard, ['dashboard', 'paymentNotification', 'notification']);
    if (currentNotificationType === 'soon') {
      status = 'warn';
    }

    if (currentNotificationType === 'tomorrow' || currentNotificationType === 'overdue') {
      status = 'error';
    }

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile hideHomeLink />
        <MobileNav key="nav" type="dashboard" />
        {/*<Notice />*/}
        <div key="dashboard" className="dashboard">
          <Aside hideLink />
          <Transitions>
            {
              !dashboard.$loading &&
              <div className="dashboard__content">
                <Balance
                  balance={currentBalance}
                  sum={sum}
                  message={currentNotificationMessage}
                  status={status}
                  onPay={onPay}
                  onChange={sumChange}
                  autoPay={paymentsCards.autoPayments}
                />
                <OverviewRoamingCurrent history={history} data={dashboard.dashboard.roaming} />
                <Remain
                  data={get(dashboard, ['dashboard', 'remaining', 'groups'])}
                  tariff={dashboard.dashboard.tariff}
                  buy={onBuy}
                  inRoaming={!!dashboard.dashboard.roaming}
                />
                <History data={historyGroups} />
                <RoamingDashboard roaming={roamingZones} />
                {

                  <OverviewInvite
                    message="Подарок близким"
                    link={get(dashboard, ['dashboard', 'invites', 'linkText'])}
                    code={code}
                  />
                }
                <FooterNav/>
                <Footer als mode="cabinet"/>
              </div>
            }
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

function mapStateToProps(state) {
  const { Roaming, Cards, Expenses } = state;

  return {
    roaming: Roaming,
    cards: Cards,
    expenses: Expenses,
  };
}

Overview.propTypes = {
  history: PropTypes.shape().isRequired,
  roaming: PropTypes.shape().isRequired,
  cards: PropTypes.shape().isRequired,
  expenses: PropTypes.shape().isRequired,
};

export default Overview;
