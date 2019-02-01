import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { api, forms } from 'redux-restify'

import History from './components/History'


const stateToProps = (state, props) => {
  const pageHistoryFiltersForm = forms.selectors.pageHistoryFiltersForm.getForm(state)
  const filterConfig = {
    query: {
      'start-date': pageHistoryFiltersForm.startDate,
    },
  }
  const historyDetailEntities = api.selectors.entityManager.historyDetail.getEntities(state)
  const historyDetail = historyDetailEntities.getById('', filterConfig)
  const historyDetailIsLoading = historyDetailEntities.getIsLoadingById('', filterConfig)

  return {
    ...props, // Routing props
    historyGroups: api.selectors.entityManager.historyGroups.getEntities(state).getById(''),
    historyDetail,
    historyDetailIsLoading,
    pageHistoryFiltersForm,
  }
}

const dispatchToProps = dispatch => ({
  pageHistoryFiltersFormActions: bindActionCreators(forms.actions.pageHistoryFiltersForm, dispatch),
})

export default connect(stateToProps, dispatchToProps)(History)
