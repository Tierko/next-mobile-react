import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { forms } from 'redux-restify'

import SignIn from '../components/SignIn'

import * as authActions from '../actions'


const stateToProps = (state, props) => ({
  ...props, // Routing props
  authForm: forms.selectors.authForm.getForm(state),
})

const dispatchToProps = dispatch => ({
  authFormActions: bindActionCreators(forms.actions.authForm, dispatch),
  authActions: bindActionCreators(authActions, dispatch),
})

export default connect(stateToProps, dispatchToProps)(SignIn)
