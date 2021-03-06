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
} from '../actions/Notice';

class Notice extends Component {
  state = {
    show: false,
  };

  componentDidMount() {
    const { onESC, outsideClick } = this;

    document.addEventListener('keydown', onESC);
    document.addEventListener('click', outsideClick);
  }

  componentDidUpdate(prevProps, prevState) {
    const { readNotice, excludeNotice } = this.props;
    const { show } = this.state;

    if (prevState.show && !show) {
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
    if (keyCode === 27) {
      this.setState({
        show: false,
      });
    }
  };

  outsideClick = ({ target }) => {
    const { notice } = this;

    if (target.className.indexOf('notice__remove') !== -1) {
      return;
    }

    if (target.className.indexOf('notice__item-cancel') !== -1) {
      return;
    }

    try {
      if (!notice.contains(target)) {
        this.setState({
          show: false,
        });
      }
    } catch (e) {}
  };

  toggle = () => {
    const { show } = this.state;

    this.setState({
      show: !show,
    });
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
    } = this.props;
    const { show } = this.state;
    const { toggle, doAction } = this;
    const unReadCount = notice.reduce((acc, n) => (
      n.isRed ? acc : acc + 1
    ), 0);

    return (
      <div className={`notice ${className}`} ref={(e) => { this.notice = e; }}>
        <div
          onClick={toggle}
          className={cs('notice__button', {
            notice__button_close: show,
            notice__button_unread: !!unReadCount,
          })}
        >
          {
            !!unReadCount &&
            <div
              className={cs(`notice__count notice__count_${unReadCount.toString().length}`, {
                notice__count_hide: show,
              })}
            >
              {unReadCount}
            </div>
          }
        </div>
        <div className={cs('notice__inner', { notice__inner_show: show })}>
          <div className="notice__header">Уведомления</div>
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
    notice: state.Notice.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    readNotice: () => dispatch(readNoticeAction()),
    removeNotice: id => dispatch(removeNoticeAction(id)),
    excludeNotice: () => dispatch(excludeNoticeAction()),
    repairNotice: id => dispatch(repairNoticeAction(id)),
  };
}

Notice.propTypes = {
  className: PropTypes.string,
  notice: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  readNotice: PropTypes.func.isRequired,
  removeNotice: PropTypes.func.isRequired,
  excludeNotice: PropTypes.func.isRequired,
  repairNotice: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

Notice.defaultProps = {
  className: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Notice));
