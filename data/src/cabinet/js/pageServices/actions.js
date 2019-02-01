import { api, forms } from 'redux-restify'

import { PRODUCTS_ENDPOINT, PRODUCTS_INFO_ENDPOINT } from '~/common/js/apiUrlSchema'


export const saveToogledServices = (toggled) => async (dispatch, getState) => {
  const state = getState()
  const currentProductsInfo = await api.selectors.entityManager.productsInfo.getEntities(state).asyncGetById('')
  const { services } = currentProductsInfo
  return Promise.all(services
    .filter(service => {
      return toggled[service.id] !== undefined && service.active !== toggled[service.id]
    })
    .map(service => {
      if (toggled[service.id]) {
        return dispatch(forms.actions.sendQuickForm({
          endpoint: PRODUCTS_ENDPOINT,
          method: 'POST',
          values: {
            code: service.code,
          },
        }))
      }

      return dispatch(forms.actions.sendQuickForm({
        endpoint: `${PRODUCTS_ENDPOINT}${service.code}`,
        method: 'DELETE',
      }))
    })
  ).then(() => {
    dispatch(api.actions.entityManager.productsInfo.loadById(''))
  })
}

export const changeTariff = (code) => (dispatch) => {
  return dispatch(forms.actions.sendQuickForm({
    endpoint: PRODUCTS_INFO_ENDPOINT,
    method: 'POST',
    values: {
      code,
    },
  }))
}
