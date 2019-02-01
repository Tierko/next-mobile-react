import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { api, forms } from 'redux-restify'

import Invite from './components/Invite'


const stateToProps = (state, props) => ({
  ...props, // Routing props
  invites: api.selectors.entityManager.invites.getEntities(state).getById(''),
})

const dispatchToProps = dispatch => ({
})

export default connect(stateToProps, dispatchToProps)(Invite)
