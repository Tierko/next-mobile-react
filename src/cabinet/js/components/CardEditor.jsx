import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InlineSvg from 'svg-inline-react';
import { connect } from 'react-redux';
import cs from 'classnames';
import ButtonIcon from './ButtonIcon';
import {
  removeCardAction,
  makeDefaultAction,
} from '../actions/Cards';
import {
  getShortPan,
  getPaySystem,
} from '../utils';

class CardEditor extends Component {
  componentDidMount() {
    const { onKeyDown, onClick } = this;

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);
  }

  componentWillUnmount() {
    const { onKeyDown, onClick } = this;

    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('click', onClick);
  }

  onKeyDown = ({ keyCode }) => {
    const { onClose } = this.props;

    if (keyCode === 27) {
      onClose();
    }
  };

  onClick = ({ target }) => {
    const { onClose } = this.props;
    const { cardEditor } = this;

    try {
      if (!cardEditor.contains(target) && cardEditor) {
        onClose();
      }
    } catch (e) {}
  };

  render() {
    const {
      defaultCard,
      onClose,
      makeDefault,
      removeCard,
      card: { token, colors },
    } = this.props;

    const isCardDefault = defaultCard === token;

    const style = colors && colors.length === 2 ?
      { backgroundImage: `linear-gradient(to top right, ${colors[0]}, ${colors[1]})` } :
      { backgroundColor: '#e72b2b' };

    return (
      <div className={cs('card-editor', { 'card-editor_show': !!token })}>
        <ButtonIcon onClick={onClose} icon="back.svg" className="button-icon_card-editor" />
        <div className="card-editor__inner" ref={(e) => { this.cardEditor = e; }}>
          <div className={`card card_big card_${getPaySystem(token)}`} style={style}>
            <div className="card__number">{getShortPan(token)}</div>
          </div>
          <div className="card__edit">

            <div
              className={cs('card__edit-item', {
                'card__edit-item_disabled': isCardDefault,
              })}
              onClick={() => {
                if (!isCardDefault) {
                  makeDefault(token);
                  onClose();
                }
              }}
            >
              <span className="card__edit-icon card__edit-icon_default">
                <InlineSvg src={require('../../../../media/icons/card.svg')} raw />
              </span>
              <span className="card__edit-title">Карта по умолчанию</span>
            </div>
            <div className="card__edit-item" onClick={() => { removeCard(token); onClose(); }}>
              <span className="card__edit-icon card__edit-icon_remove">
                <InlineSvg src={require('../../../../media/icons/bucket.svg')} raw />
              </span>
              <span className="card__edit-title">Удалить</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CardEditor.propTypes = {
  defaultCard: PropTypes.string.isRequired,
  card: PropTypes.shape(),
  onClose: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  makeDefault: PropTypes.func.isRequired,
};

CardEditor.defaultProps = {
  card: {},
};

function mapDispatchToProps(dispatch) {
  return {
    removeCard: token => dispatch(removeCardAction(token)),
    makeDefault: token => dispatch(makeDefaultAction(token)),
  };
}

export default connect(null, mapDispatchToProps)(CardEditor);
