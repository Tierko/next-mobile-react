import { getVerifyToken, getLoginToken } from './localStorage'

export const MEDIA_API_NAME = 'media'
export const MEDIA_API_HOST = process.env.API_HOST || `//${window.location.host}`
export const MEDIA_API_PREFIX = ''

export const DEFAULT_API_NAME = 'default'
export const DEFAULT_API_HOST = process.env.API_HOST || `//${window.location.host}`
export const DEFAULT_API_PREFIX = '/api/v1/'

export const SEND_CODE_ENDPOINT = 'auth/send-code/'
export const VERIFY_PHONE_ENDPOINT = 'auth/verify-phone/'
export const LOGIN_ENDPOINT = 'auth/login/'
export const CONNECTION_INTERNET = 'roaming/internet/'
export const DISCONNECT_INTERNET = 'roaming/internet/zone/'

export const INVITE_APPLICATIONS_ENDPOINT = 'join/invite-applications/'
export const CHECK_PROMO_CODE_ENDPOINT = 'join/invites/'
export const DELIVERY_RANGES_ENDPOINT = 'join/delivery-ranges/'
export const CITIES_ENDPOINT = 'join/cities/'
export const APPLICATIONS_ENDPOINT = 'join/applications/'
export const INVITES_ENDPOINT = 'join/invites/'

export const PRODUCTS_ENDPOINT = 'products/'

export const PRODUCTS_INFO_ENDPOINT = 'products/tariffs/'
export const ROAMING_COUNTRIES_ENDPOINT = 'roaming/countries/'
export const ROAMING_ENDPOINT = 'roaming/'
export const ROAMING_INTERNET_ENDPOINT = 'roaming/internet/'
export const ROAMING_VECTORS_ENDPOINT = 'roaming/vectors/'

export const DASHBOARD_ENDPOINT = 'dashboard/'

export const PAYMENTS_CARDS_ENDPOINT = 'payments/cards'
export const PAYMENTS_AUTO_PAY_ENDPOINT = 'payments/auto/'
export const PAYMENTS_ENDPOINT = 'payments/'

export const HISTORY_GROUPS_ENDPOINT = 'history/groups'
export const HISTORY_DETAIL_ENDPOINT = 'history/detail'
export const HISTORY_DETAIL_REQUEST_ENDPOINT = 'history/detailing'

export const PROFILE_REQUEST_ENDPOINT = 'profile/'


export const DEFAULT_ALLOWED_NO_TOKEN_ENDPOINTS = [
  /.*/
]

export const ENDPOINT_TOKENS_GETTERS = {
  [INVITE_APPLICATIONS_ENDPOINT]: getVerifyToken,
  [APPLICATIONS_ENDPOINT]: getVerifyToken,

  [PRODUCTS_INFO_ENDPOINT]: getLoginToken,
  [ROAMING_COUNTRIES_ENDPOINT]: getLoginToken,
  [PRODUCTS_ENDPOINT]: getLoginToken,
  [DASHBOARD_ENDPOINT]: getLoginToken,
  [PAYMENTS_CARDS_ENDPOINT]: getLoginToken,
  [HISTORY_GROUPS_ENDPOINT]: getLoginToken,
  [HISTORY_DETAIL_ENDPOINT]: getLoginToken,
  [HISTORY_DETAIL_REQUEST_ENDPOINT]: getLoginToken,
  [INVITES_ENDPOINT]: getLoginToken,
  [ROAMING_ENDPOINT]: getLoginToken,
  [CONNECTION_INTERNET]: getLoginToken,
  [DISCONNECT_INTERNET]: getLoginToken,
  [PAYMENTS_AUTO_PAY_ENDPOINT]: getLoginToken,
  [PROFILE_REQUEST_ENDPOINT]: getLoginToken,
  [PAYMENTS_AUTO_PAY_ENDPOINT]: getLoginToken,
  [PAYMENTS_ENDPOINT]: getLoginToken,
}

export const getEndpointToken = (url) => {
  if (url.includes(PRODUCTS_ENDPOINT)) return getLoginToken
  if (url.includes(DISCONNECT_INTERNET)) return getLoginToken
  if (url.includes(PAYMENTS_CARDS_ENDPOINT)) return getLoginToken
  if (url.includes(PAYMENTS_ENDPOINT)) return getLoginToken
  return ENDPOINT_TOKENS_GETTERS[url]
}
