import { ACTION_TYPES } from '../constants';

export const readNoticeAction = () => ({
  type: ACTION_TYPES.NOTICE_READ,
});

export const removeNoticeAction = id => ({
  type: ACTION_TYPES.NOTICE_REMOVE,
  id,
});
