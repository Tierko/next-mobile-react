import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { api, forms } from 'redux-restify'

import RequestStatus from '../components/RequestStatus'

import * as authActions from '../actions'


const stateToProps = (state, props) => ({
  ...props, // Routing props
  authForm: forms.selectors.authForm.getForm(state),
  applicationsEntities: api.selectors.entityManager.applications.getEntities(state),
  deliveryRangesEntities: api.selectors.entityManager.deliveryRanges.getEntities(state),
})

const dispatchToProps = dispatch => ({
  authFormActions: bindActionCreators(forms.actions.authForm, dispatch),
  authActions: bindActionCreators(authActions, dispatch),
  editApplicationFormActions: bindActionCreators(forms.actions.editApplicationForm, dispatch),
})

export default connect(stateToProps, dispatchToProps)(RequestStatus)
