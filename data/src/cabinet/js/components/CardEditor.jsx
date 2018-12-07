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
import { autoPayDisableAction } from '../actions/AutoPay';
import {
  getShortPan,
  getPaySystem,
} from '../utils';

class CardEditor extends Component {
  state = {
    cardUnzoomed: false,
  };

  componentDidMount() {
    const { onKeyDown, onClick } = this;

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);

    setTimeout(() => {
      this.setState({
        cardUnzoomed: true,
      });
    }, 1);
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

  onRemove = (token) => {
    const {
      removeCard,
      onClose,
      autoPayDisable,
      cards,
    } = this.props;

    if (cards.length === 1) {
      autoPayDisable();
    }

    removeCard(token);
    onClose();
  };

  render() {
    const {
      defaultCard,
      onClose,
      makeDefault,
      card: { token, colors },
    } = this.props;
    const { cardUnzoomed } = this.state;
    const { onRemove } = this;

    const isCardDefault = defaultCard === token;

    const style = colors && colors.length === 2 ?
      { backgroundImage: `linear-gradient(to top right, ${colors[0]}, ${colors[1]})` } :
      { backgroundColor: '#e72b2b' };

    return (
      <div className={cs('card-editor', { 'card-editor_show': !!token })}>
        <ButtonIcon onClick={onClose} icon="back.svg" className="button-icon_card-editor" />
        <div className="card-editor__inner" ref={(e) => { this.cardEditor = e; }}>
          <div
            className={cs(`card card_editor card_big card_${getPaySystem(token)}`, {
              'card_editor-unzoomed': cardUnzoomed,
            })}
            style={style}
          >
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
              <span className="card__edit-title">Выбрать картой по&nbsp;умолчанию</span>
            </div>
            <div className="card__edit-item" onClick={() => onRemove(token)}>
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
  autoPayDisable: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

CardEditor.defaultProps = {
  card: {},
};

function mapStateToProps(state) {
  return {
    cards: state.Cards.items,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeCard: token => dispatch(removeCardAction(token)),
    makeDefault: token => dispatch(makeDefaultAction(token)),
    autoPayDisable: () => dispatch(autoPayDisableAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardEditor);
