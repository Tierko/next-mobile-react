import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NoticeItem from './NoticeItem';
import {
  readNoticeAction,
  removeNoticeAction,
  excludeNoticeAction,
  repairNoticeAction,
  hideNoticeAction,
} from '../actions/Notice';

class Notice extends Component {
  componentDidMount() {
    const { onESC, outsideClick } = this;

    document.addEventListener('keydown', onESC);
    document.addEventListener('click', outsideClick);
  }

  componentDidUpdate(prevProps) {
    const { readNotice, excludeNotice, show } = this.props;

    if (prevProps.show && !show) {
      readNotice();

      setTimeout(() => {
        excludeNotice();
      }, 500);
    }
  }

  componentWillUnmount() {
    const { onESC, outsideClick } = this;

    document.removeEventListener('keydown', onESC);
    document.removeEventListener('click', outsideClick);
  }

  onESC = ({ keyCode }) => {
    const { hideNotice } = this.props;

    if (keyCode === 27) {
      hideNotice();
    }
  };

  outsideClick = ({ target }) => {
    const { notice } = this;
    const { hideNotice } = this.props;

    if (!target.className) {
      return;
    }

    if (target.className.indexOf('aside__button_notice') !== -1) {
      return;
    }

    if (target.className.indexOf('notice__remove') !== -1) {
      return;
    }

    if (target.className.indexOf('notice__item-cancel') !== -1) {
      return;
    }

    try {
      if (!notice.contains(target)) {
        hideNotice();
      }
    } catch (e) {}
  };

  doAction = (action) => {
    const { history } = this.props;

    if (action.type === 'link') {
      history.push(action.value);
    }
  };

  render() {
    const {
      className,
      notice,
      removeNotice,
      repairNotice,
      show,
      hideNotice,
    } = this.props;
    const { doAction } = this;

    return (
      <div className={`notice ${className}`} ref={(e) => { this.notice = e; }}>
        <div className={cs('notice__inner', { notice__inner_show: show })}>
          <div className="notice__header">
            Уведомления
            <div className="notice__close" onClick={hideNotice} />
          </div>
          <div className="notice__list">
            {
              !notice.length &&
              <div className="notice__empty">У вас нет уведомлений</div>
            }
            {
              notice.slice().reverse().map(n => (
                <NoticeItem
                  key={n.id}
                  n={n}
                  doAction={doAction}
                  removeNotice={removeNotice}
                  repairNotice={repairNotice}
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notice: [],
    show: [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    readNotice: () => dispatch(readNoticeAction()),
    removeNotice: id => dispatch(removeNoticeAction(id)),
    excludeNotice: () => dispatch(excludeNoticeAction()),
    repairNotice: id => dispatch(repairNoticeAction(id)),
    hideNotice: () => dispatch(hideNoticeAction()),
  };
}

Notice.propTypes = {
  className: PropTypes.string,
  notice: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  readNotice: PropTypes.func.isRequired,
  removeNotice: PropTypes.func.isRequired,
  excludeNotice: PropTypes.func.isRequired,
  repairNotice: PropTypes.func.isRequired,
  hideNotice: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  show: PropTypes.bool.isRequired,
};

Notice.defaultProps = {
  className: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Notice));
