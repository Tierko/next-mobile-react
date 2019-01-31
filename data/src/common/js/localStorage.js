export const verifyTokenKey = 'next-token-verify'
export const loginTokenKey = 'next-token-login'

const clearToken = (tokenKey) => () => {
  window.localStorage.removeItem(tokenKey)
}

export const clearVerifyToken = clearToken(verifyTokenKey)
export const clearLoginToken = clearToken(loginTokenKey)

const setToken = (tokenKey) => (token) => {
  window.localStorage.setItem(tokenKey, token)
}

export const setVerifyToken = setToken(verifyTokenKey)
export const setLoginToken = setToken(loginTokenKey)

const getToken = (tokenKey) => () => {
  return window.localStorage.getItem(tokenKey)
}

export const getVerifyToken = getToken(verifyTokenKey)
export const getLoginToken = getToken(loginTokenKey)
