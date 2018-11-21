import { ACTION_TYPES } from '../constants';

export const showChatAction = () => ({
  type: ACTION_TYPES.APP_CHAT_SHOW,
});

export const hideChatAction = () => ({
  type: ACTION_TYPES.APP_CHAT_HIDE,
});

export const showNoticeAction = () => ({
  type: ACTION_TYPES.APP_NOTICE_SHOW,
});

export const hideNoticeAction = () => ({
  type: ACTION_TYPES.APP_NOTICE_HIDE,
});
