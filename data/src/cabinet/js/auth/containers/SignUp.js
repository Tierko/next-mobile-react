import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { api, forms } from 'redux-restify'

import SignUp from '../components/SignUp'

import * as authActions from '../actions'


const stateToProps = (state, props) => ({
  ...props, // Routing props
  authForm: forms.selectors.authForm.getForm(state),
  editApplicationForm: forms.selectors.editApplicationForm.getForm(state),
  dashboard: api.selectors.entityManager.dashboard.getEntities(state).getById(''),

  deliveryRangesEntities: api.selectors.entityManager.deliveryRanges.getEntities(state),
  citiesEntities: api.selectors.entityManager.cities.getEntities(state),
})

const dispatchToProps = dispatch => ({
  authFormActions: bindActionCreators(forms.actions.authForm, dispatch),
  editApplicationFormActions: bindActionCreators(forms.actions.editApplicationForm, dispatch),
  authActions: bindActionCreators(authActions, dispatch),
})

export default connect(stateToProps, dispatchToProps)(SignUp)
