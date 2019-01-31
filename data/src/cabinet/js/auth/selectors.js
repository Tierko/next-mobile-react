import { api, forms } from 'redux-restify'

import { getLoginToken } from '~/common/js/localStorage'


export const getIsAuthenticated = () => {
  const token = getLoginToken()
  return !!token && token !== 'null'
}
