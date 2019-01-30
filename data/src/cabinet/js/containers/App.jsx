import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { animateScroll } from 'react-scroll';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RequestStatus from './RequestStatus';
import Conditions from './Conditions';
import SiteMap from './SiteMap';
import Support from './Support';
import Overview from './Overview';
import Settings from './Settings';
import Services from './Services';
import AddPackage from './AddPackage';
import PayPackage from './PayPackage';
import AutoPay from './AutoPay';
import SupportDashboard from './SupportDashboard';
import History from './History';
import Detail from './Detail';
import Pay from './Pay';
import More from './More';
import Kit from './Kit';
import Data from './Data';
import Result from './Result';
import Roaming from './Roaming';
import Invite from './Invite';
import Confirm from './Confirm';
import Alfa from './Alfa';
import NotFound from './NotFound';
import Faq from '../../../common/js/containers/Faq';
import { Pages } from '../constants';
import getInterCallsAction from '../actions/InterCalls';
import {
  getZonesAction,
  getFeaturesAction,
} from '../actions/Roaming';
import getExpensesAction from '../actions/Expenses';


class App extends Component {
  componentDidMount() {
    const { getZones, getFeatures, getInterCalls, getExpenses } = this.props;
    const { detectIE10 } = this;
    getZones();
    getFeatures();
    getInterCalls();
    getExpenses();
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
    const { location } = this.props;

    return (
      <div>
        <Switch location={location}>
          <Route path={Pages.SIGN_IN} component={SignIn} exact />
          <Route path={Pages.KIT} component={Kit} />
          <Route path={Pages.SIGN_UP} component={SignUp} exact />
          <Route path={`${Pages.SIGN_UP}/step/:step`} component={SignUp} exact />
          <Route path={`${Pages.SIGN_UP}/step/:step/number/:number`} component={SignUp} exact />
          <Route path={`${Pages.SIGN_UP}/step/:step/number/:number/tariff/:tariff`} component={SignUp} exact />
          <Route path={`${Pages.SIGN_UP}/tariff/:id`} component={SignUp} exact />
          <Route path={`${Pages.SIGN_UP}/:mode`} component={SignUp} exact />
          <Route path={`${Pages.SIGN_UP}/:mode/tariff/:tariff`} component={SignUp} exact />
          <Route path={Pages.REQUEST_STATUS} component={RequestStatus} exact />
          <Route path={`${Pages.REQUEST_STATUS}/:status`} component={RequestStatus} />
          <Route path={Pages.CONDITIONS} component={Conditions} />
          <Route path={Pages.SUPPORT} component={Support} />
          <Route path={Pages.DASHBOARD} component={Overview} exact />
          <Route path={`${Pages.MORE}/:type`} component={More} />
          <Route path={Pages.ADD_PACKAGE} component={AddPackage} />
          <Route path={Pages.PAY} component={Pay} exact />
          <Route path={Pages.SERVICES} component={Services} />
          <Route path={Pages.SETTINGS} component={Settings} />
          <Route path={Pages.HISTORY} component={History} exact />
          <Route path={Pages.DETAIL} component={Detail} />
          <Route path={Pages.PAY_PACKAGE} component={PayPackage} />
          <Route path={Pages.AUTO_PAY} component={AutoPay} />
          <Route path={Pages.SUPPORT_DASHBOARD} component={SupportDashboard} />
          <Route path={Pages.DATA} component={Data} />
          <Route path={`${Pages.RESULT}/:status`} component={Result} />
          <Route path={`${Pages.ROAMING}/:type/:zoneId/:countryId`} component={Roaming} />
          <Route path={`${Pages.ROAMING}/:type/:zoneId`} component={Roaming} />
          <Route path={`${Pages.ROAMING}/:zoneId`} component={Roaming} />
          <Route path={Pages.ROAMING} component={Roaming} exact />
          <Route path={Pages.INVITE} component={Invite} />
          <Route path={Pages.CONFIRM} component={Confirm} />
          <Route path={Pages.ALFA} component={Alfa} />
          <Route path={Pages.FAQ} component={Faq} />
          <Route path={Pages.SITE_MAP} component={SiteMap} exact />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  getZones: PropTypes.func.isRequired,
  getFeatures: PropTypes.func.isRequired,
  getInterCalls: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
  location: PropTypes.shape().isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    getZones: () => dispatch(getZonesAction()),
    getFeatures: () => dispatch(getFeaturesAction()),
    getInterCalls: () => dispatch(getInterCallsAction()),
    getExpenses: () => dispatch(getExpensesAction()),
  };
}

export default withRouter(connect(null, mapDispatchToProps)(hot(module)(App)));
