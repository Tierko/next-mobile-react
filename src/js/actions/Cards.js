import { ACTION_TYPES } from '../constants';

export const addCardAction = card => ({
  type: ACTION_TYPES.CARDS_ADD,
  card,
});

export const removeCardAction = id => ({
  type: ACTION_TYPES.CARDS_REMOVE,
  id,
});


export const makeDefaultAction = id => ({
  type: ACTION_TYPES.CARDS_MAKE_DEFAULT,
  id,
});
