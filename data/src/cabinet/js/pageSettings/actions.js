import { api, forms } from 'redux-restify';
import { PROFILE_FORM_NAME } from './constants';

export const createProfileForm = () => async (dispatch, getState) => {
  const state = getState();

  const profile = await api.selectors.entityManager.profile.getEntities(state)
    .asyncGetById('', { forceLoad: true });

  const formAction = forms.getFormActions(PROFILE_FORM_NAME);

  if (profile) {
    dispatch(formAction.applyServerData(profile));
  }
};
