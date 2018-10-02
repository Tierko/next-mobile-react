import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import Button from '../../../common/js/components/Button';

const NoticeItem = ({
  n,
  doAction,
  removeNotice,
  repairNotice,
}) => (
  n.deleted ?
    <div
      key={n.id}
      className="notice__item"
    >
      <span className="notice__item-note">Уведомление удалено</span>
      <span className="notice__item-cancel" onClick={() => repairNotice(n.id)}>Отменить</span>
    </div> :
    <div className="notice__item">
      <div className="notice__title">
        <div
          className={cs('notice__date', {
            notice__date_unread: !n.isRed,
          })}
        >
          {n.date}
        </div>
        <div className="notice__remove" onClick={() => removeNotice(n.id)} />
      </div>
      <div
        className={cs('notice__text', {
          'notice__text_important-unread': n.important && !n.isRed,
          'notice__text_important-red': n.important && n.isRed,
        })}
      >
        {n.text}
      </div>
      {
        n.note &&
        <div className="notice__note">{n.note}</div>
      }
      {
        n.action &&
        <Button
          className="button_notice-action"
          onClick={() => doAction(n.action)}
        >
          {n.action.text}
        </Button>
      }
    </div>
);

NoticeItem.propTypes = {
  n: PropTypes.shape().isRequired,
  doAction: PropTypes.func.isRequired,
  removeNotice: PropTypes.func.isRequired,
  repairNotice: PropTypes.func.isRequired,
};

export default NoticeItem;
