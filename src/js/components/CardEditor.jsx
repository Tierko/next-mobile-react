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

const CardEditor = ({
  id,
  onClose,
  makeDefault,
  removeCard,
}) => (
  <div className={cs('card-editor', { 'card-editor_show': !!id })}>
    <ButtonIcon onClick={onClose} icon="back.svg" className="button-icon_card-editor" />
    <div>
      <div className="card card_visa card_big">
        <div className="card__number">*6266</div>
      </div>
      <div className="card__edit">
        <div className="card__edit-item" onClick={() => makeDefault(id)}>
          <span className="card__edit-icon">
            <InlineSvg src={require('../../../media/icons/card.svg')} raw />
          </span>
          Карта по умолчанию
        </div>
        <div className="card__edit-item" onClick={() => removeCard(id)}>
          <span className="card__edit-icon">
            <InlineSvg src={require('../../../media/icons/bucket.svg')} raw />
          </span>
          удалить
        </div>
      </div>
    </div>
  </div>
);

CardEditor.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  makeDefault: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    removeCard: id => dispatch(removeCardAction(id)),
    makeDefault: id => dispatch(makeDefaultAction(id)),
  };
}

export default connect(null, mapDispatchToProps)(CardEditor);
