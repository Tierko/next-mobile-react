import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { api, forms } from 'redux-restify';

import Services from './components/Services';

import * as pageServicesActions from './actions';


const stateToProps = (state, props) => ({
  ...props, // Routing props
  // countries: state.Roaming.features.items,
  // interCalls: state.InterCalls,
  countries: [],
  interCalls: {},

  productsInfo: api.selectors.entityManager.productsInfo.getEntities(state).getById(''),
  roamingCountriesEntities: api.selectors.entityManager.roamingCountries.getEntities(state),
  dashboard: api.selectors.entityManager.dashboard.getEntities(state).getById(''),
});

const dispatchToProps = dispatch => ({
  pageServicesActions: bindActionCreators(pageServicesActions, dispatch),
});

export default connect(stateToProps, dispatchToProps)(Services);
