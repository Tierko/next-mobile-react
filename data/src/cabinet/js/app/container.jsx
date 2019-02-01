import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { animateScroll } from 'react-scroll';

import SiteMap from '../containers/SiteMap';
import Support from '../containers/Support';
import Services from '../containers/Services';
import AddPackage from '../containers/AddPackage';
import PayPackage from '../containers/PayPackage';
import AutoPay from '../containers/AutoPay';
import SupportDashboard from '../containers/SupportDashboard';
import Pay from '../containers/Pay';
import More from '../containers/More';
import Kit from '../containers/Kit';
import Data from '../containers/Data';
import Result from '../containers/Result';
import Roaming from '../containers/Roaming';
import Invite from '../containers/Invite';
import Confirm from '../containers/Confirm';
import Alfa from '../containers/Alfa';
import NotFound from './components/NotFound';
import Faq from '../../../common/js/containers/Faq';
import { Pages } from '~/common/js/constants';
import getInterCallsAction from '../actions/InterCalls';
// import {
//   getZonesAction,
//   getFeaturesAction,
// } from '../actions/Roaming';
// import getExpensesAction from '../actions/Expenses';

import auth, {
  SignUp,
  SignIn,
  RequestStatus,
  Conditions,
} from '@cabinet/auth';
import pageSettings from '@cabinet/pageSettings';
import pageHistory from '@cabinet/pageHistory'
import pageHistoryDetail from '@cabinet/pageHistoryDetail'
import pageDashboard from '@cabinet/pageDashboard'

const notAuthenticatedPages = [
  Pages.SIGN_IN,
  Pages.SIGN_UP,
  Pages.REQUEST_STATUS,
  Pages.CONDITIONS,
]

class App extends Component {
  componentDidMount() {
    const { detectIE10 } = this;
    detectIE10();
  }

  componentDidUpdate(prevProps) {
    const html = document.documentElement;
    const { body } = document;

    if (prevProps.location.pathname !== this.props.location.pathname) {
      animateScroll.scrollToTop({
        smooth: true,
      });

      html.removeAttribute('style');
      body.removeAttribute('style');
    }
  }

  detectIE10 = () => {
    const agent = navigator.userAgent;
    const reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
    const matches = agent.match(reg);
    const root = document.getElementById('root');

    if (matches && root) {
      root.className += `ie${matches[1]}`;
    }
  };

  render() {
    const {
      location,
      isAuthenticated,
    } = this.props;

    return (
      <div>
        <Switch location={location}>
          {
            !isAuthenticated &&
            <Switch location={location}>
              <Route path={Pages.SIGN_IN} component={SignIn} exact />
              <Route path={Pages.SIGN_UP} component={SignUp} exact />
              <Route path={`${Pages.SIGN_UP}/step/:step`} component={SignUp} exact />
              <Route path={`${Pages.SIGN_UP}/step/:step/number/:number`} component={SignUp} exact />
              <Route path={`${Pages.SIGN_UP}/step/:step/number/:number/tariff/:tariff`} component={SignUp} exact />
              <Route path={`${Pages.SIGN_UP}/tariff/:id`} component={SignUp} exact />
              <Route path={`${Pages.SIGN_UP}/:mode`} component={SignUp} exact />
              <Route path={`${Pages.SIGN_UP}/:mode/tariff/:tariff`} component={SignUp} exact />
              <Route path={Pages.REQUEST_STATUS} component={RequestStatus} exact />
              <Route path={`${Pages.REQUEST_STATUS}/:status`} component={RequestStatus} />
              <Route path={Pages.CONDITIONS} component={Conditions} exact />
              <Route path={Pages.SUPPORT} component={Support} exact />
              <Route {...{
                render: () => <Redirect to={Pages.SIGN_IN} />,
              }} />
            </Switch>
          }

          {
            isAuthenticated && notAuthenticatedPages.map((page) => (
              <Route {...{
                key: page,
                path: page,
                render: () => <Redirect to={Pages.DASHBOARD} />,
              }} />
            ))
          }

          <Route path={Pages.DASHBOARD} component={pageDashboard.container} exact />
          <Route path={`${Pages.MORE}/:type`} component={More} />
          <Route path={Pages.ADD_PACKAGE} component={AddPackage} />
          <Route path={Pages.PAY} component={Pay} exact />
          <Route path={Pages.SERVICES} component={Services} />
          <Route path={Pages.SETTINGS} component={pageSettings.container} />
          <Route path={Pages.HISTORY} component={pageHistory.container} exact />
          <Route path={Pages.DETAIL} component={pageHistoryDetail.container} />
          <Route path={Pages.AUTO_PAY} component={AutoPay} />
          <Route path={Pages.SUPPORT_DASHBOARD} component={SupportDashboard} />
          <Route path={`${Pages.RESULT}/:status`} component={Result} />
          <Route path={`${Pages.ROAMING}/:type/:zoneId/:countryId`} component={Roaming} />
          <Route path={`${Pages.ROAMING}/:type/:zoneId`} component={Roaming} />
          <Route path={`${Pages.ROAMING}/:zoneId`} component={Roaming} />
          <Route path={Pages.ROAMING} component={Roaming} exact />
          <Route path={Pages.INVITE} component={Invite} />
          <Route path={Pages.CONFIRM} component={Confirm} />
          <Route path={Pages.FAQ} component={Faq} />
          {/*<Route path={Pages.PAY_PACKAGE} component={PayPackage} />*/}
          {/*<Route path={Pages.ALFA} component={Alfa} />*/}
          {/*<Route path={Pages.DATA} component={Data} />*/}
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: auth.selectors.getIsAuthenticated(),
});

export default withRouter(connect(mapStateToProps, null)(hot(module)(App)));
