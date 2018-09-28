import { ACTION_TYPES } from '../constants';

export const readNoticeAction = id => ({
  type: ACTION_TYPES.NOTICE_READ,
  id,
});

export const removeNoticeAction = id => ({
  type: ACTION_TYPES.NOTICE_REMOVE,
  id,
});
