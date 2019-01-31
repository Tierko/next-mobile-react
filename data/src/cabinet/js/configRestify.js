import {
  DEFAULT_API_NAME,
  DEFAULT_ALLOWED_NO_TOKEN_ENDPOINTS,
  DEFAULT_API_PREFIX,
  DEFAULT_API_HOST,
  getEndpointToken,
  MEDIA_API_NAME,
  MEDIA_API_HOST,
  MEDIA_API_PREFIX,
} from '~/common/js/apiUrlSchema'

import { initRestify } from 'redux-restify'


const configRestify = () => {
  const defaultHttpCodesAllbacks = (code) => {
    return {}
  }
  const defaultGetHeaders = (url) => {
    const result = {
      Authorization: 'Basic bmV4dDpkVTVXUVp0M0wxeVgxSktVcDdCb1RvTGY=',
      // Authorization: 'Basic bmV4dDpyRHQ3SEY1NzBtUVhNaTZzVHlMOVk0T20=',
    }
    const tokenGetter = getEndpointToken(url)
    if (tokenGetter) {
      result['X-Authorization'] = `Bearer ${tokenGetter()}`
    }
    return result
  }
  const apiDefinitions = {
    [DEFAULT_API_NAME]: {
      getHeaders: defaultGetHeaders,
      apiHost: DEFAULT_API_HOST,
      apiPrefix: DEFAULT_API_PREFIX,
      allowedNoTokenEndpoints: DEFAULT_ALLOWED_NO_TOKEN_ENDPOINTS,
      httpCodesCallbacks: defaultHttpCodesAllbacks,
    },
    [MEDIA_API_NAME]: {
      getHeaders: defaultGetHeaders,
      apiHost: MEDIA_API_HOST,
      apiPrefix: MEDIA_API_PREFIX,
      allowedNoTokenEndpoints: DEFAULT_ALLOWED_NO_TOKEN_ENDPOINTS,
      httpCodesCallbacks: defaultHttpCodesAllbacks,
      getEntityUrl:({
        apiHost,
        apiPrefix,
        modelEndpoint,
        entityId,
        specialAction,
      }) => {
        let slashAfterId = ''
        if (entityId && (typeof entityId === 'number' || typeof entityId === 'string' && !entityId.endsWith('/'))) {
          slashAfterId = '/'
        }
        const baseUrl = `${modelEndpoint}${entityId || ''}${slashAfterId}${specialAction || ''}`
        return `${apiHost}${apiPrefix}${baseUrl}`
      }
    },
  }

  const modelsContex = require.context('../../', true, /.*\/models\/[A-z0-9-_]*\.model\.js$/)
  const modelsDefinitions = modelsContex.keys().reduce((memo, key) => ({
    ...memo,
    [key
      .replace('.model', '')
      .replace(/\.\/|\.js/g, '')
      .split('/')
      .reverse()[0]
    ]: modelsContex(key).default,
  }), {})

  const formsContext = require.context('../../', true, /.*\/forms\/[A-z0-9-_]*\.form\.js$/)
  const formsDefinitions = formsContext.keys().reduce((memo, key) => ({
    ...memo,
    [key
      .replace('.form', 'Form')
      .replace(/\.\/|\.js/g, '')
      .split('/')
      .reverse()[0]
    ]: formsContext(key).default,
  }), {})

  initRestify({
    apiDefinitions,
    modelsDefinitions,
    formsDefinitions,
  })
}

export default configRestify
