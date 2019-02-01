import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { api, forms } from 'redux-restify'

import Detail from './components/Detail'

import * as pageHistoryDetailActions from './actions'


const stateToProps = (state, props) => ({
  ...props, // Routing props
})

const dispatchToProps = dispatch => ({
  pageHistoryDetailActions: bindActionCreators(pageHistoryDetailActions, dispatch),
})

export default connect(stateToProps, dispatchToProps)(Detail)
