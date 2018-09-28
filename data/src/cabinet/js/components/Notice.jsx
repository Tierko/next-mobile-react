import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { connect } from 'react-redux';
import { readNoticeAction, removeNoticeAction } from '../actions/Notice';

class Notice extends Component {
  state = {
    show: false,
  };

  componentDidMount() {
    const { onESC } = this;

    document.addEventListener('keydown', onESC);
  }

  componentWillUnmount() {
    const { onESC } = this;

    document.removeEventListener('keydown', onESC);
  }

  onESC = ({ keyCode }) => {
    if (keyCode === 27) {
      this.setState({
        show: false,
      });
    }
  };

  toggle = () => {
    const { show } = this.state;

    this.setState({
      show: !show,
    });
  };

  render() {
    const { className, notice, readNotice, removeNotice } = this.props;
    const { show } = this.state;
    const { toggle } = this;
    console.log(this.props)

    return (
      <div className={`notice ${className}`}>
        <div
          onClick={toggle}
          className={cs('notice__button', {
            notice__button_close: show,
          })}
        >
          <div className="notice__count">9</div>
        </div>
        <div className={cs('notice__inner', { notice__inner_show: show })}>
          <div className="notice__header">Уведомления</div>
          <div className="notice__list">
            {
              notice.slice().reverse().map(n => (
                <div key={n.id} className="notice__item">
                  <div className="notice__title">
                    <div className="notice__date">{n.date}</div>
                    <div className="notice__remove" />
                  </div>
                  <div className="notice__text">{n.text}</div>
                  {
                    n.note && <div className="notice__note">{n.note}</div>
                  }
                  {
                    n.action && <div className="notice__action"></div>
                  }
                </div>
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
    readNotice: id => dispatch(readNoticeAction(id)),
    removeNotice: id => dispatch(removeNoticeAction(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
