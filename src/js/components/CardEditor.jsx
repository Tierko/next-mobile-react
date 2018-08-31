import React from 'react';
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

const CardEditor = ({
  onClose,
  makeDefault,
  removeCard,
  card: { token, colors },
}) => {
  if (!token) {
    return false;
  }

  const style = colors && colors.length === 2 ?
    { backgroundImage: `linear-gradient(to top right, ${colors[0]}, ${colors[1]})` } :
    { backgroundColor: '#e72b2b' };

  return (
    <div className={cs('card-editor', { 'card-editor_show': !!token })}>
      <ButtonIcon onClick={onClose} icon="back.svg" className="button-icon_card-editor" />
      <div>
        <div className={`card card_big card_${getPaySystem(token)}`} style={style}>
          <div className="card__number">{getShortPan(token)}</div>
        </div>
        <div className="card__edit">
          <div className="card__edit-item" onClick={() => { makeDefault(token); onClose(); }}>
            <span className="card__edit-icon">
              <InlineSvg src={require('../../../media/icons/card.svg')} raw />
            </span>
            <span className="card__edit-title">Карта по умолчанию</span>
          </div>
          <div className="card__edit-item" onClick={() => { removeCard(token); onClose(); }}>
            <span className="card__edit-icon">
              <InlineSvg src={require('../../../media/icons/bucket.svg')} raw />
            </span>
            <span className="card__edit-title">Удалить</span>
          </div>
        </div>
      </div>
    </div>
  );
};

CardEditor.propTypes = {
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
