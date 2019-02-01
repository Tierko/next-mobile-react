import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { api } from 'redux-restify';

import Overview from './components/Overview';
import * as actions from './actions';
//import { defaultCardSelector } from '../pagePayment/selectors';


const stateToProps = (state, props) => {
  const entityManager = api.selectors.entityManager;

  const paymentsCards = entityManager.paymentsCards.getEntities(state)
    .getById('');

  //const defaultCard = defaultCardSelector(paymentsCards.cards);

  return ({
    ...props, // Routing props
    paymentsCards,
    //defaultCard,
    dashboard: entityManager.dashboard.getEntities(state).getById(''),
    historyGroups: entityManager.historyGroups.getEntities(state).getById(''),
    invites: entityManager.invites.getEntities(state).getById(''),
    roamingZones: entityManager.roaming.getEntities(state).getById('').zones,
  });
};

const dispatchToProps = dispatch => ({
  dashboardActions: bindActionCreators(actions, dispatch),
});

export default connect(stateToProps, dispatchToProps)(Overview);
