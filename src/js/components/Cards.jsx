import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InlineSvg from 'svg-inline-react';
import Card from './Card';
import Popup from './Popup';
import {
  checkCardNumber,
  checkCardHolder,
  checkCardDate,
  checkCVV,
} from '../utils';
import {
  addCardAction,
  removeCardAction,
  makeDefaultAction,
} from '../actions/Cards';


class Cards extends Component {
  state = {
    selected: '',
    number: '',
    holder: '',
    date: '',
    cvv: '',
    showPopup: false,
    editCardId: '',
  };

  onPermitChange = (payPermitted) => {
    const { onPermitChange } = this.props;

    if (onPermitChange) {
      onPermitChange(payPermitted);
    }
  };

  onChange = (name, value) => {
    const { onPermitChange } = this.props;
    const { isNewCardValid, state } = this;
    const nextState = Object.assign({}, state, { [name]: value });
    nextState[name] = value;

    const {
      number,
      holder,
      date,
      cvv,
    } = nextState;
    const card = {
      number,
      holder,
      date,
      cvv,
      type: 'visa',
      token: `${number}${holder}${date}${cvv}`,
    };

    this.setState({
      [name]: value,
    });

    onPermitChange(isNewCardValid(nextState), isNewCardValid(nextState) ? card : undefined);
  };

  onCardSelect = (e) => {
    const { onPermitChange, isNewCardValid } = this;
    const {
      number,
      holder,
      date,
      cvv,
    } = this.state;
    const { id } = e.currentTarget.dataset;
    const card = id === 'new' ? {
      number,
      holder,
      date,
      cvv,
      type: 'visa',
      token: `${number}${holder}${date}${cvv}`,
    } : undefined;

    onPermitChange(id !== 'new' || (id === 'new' && isNewCardValid()), card);

    this.setState({
      selected: id,
    });
  };

  onCardEdit = ({ target }) => {
    this.setState({
      showPopup: true,
      editCardId: target.dataset.id,
    });
  };

  onPopupClose = () => {
    this.setState({
      showPopup: false,
    });
  };

  onCardRemove = (id) => {
    const { removeCard } = this.props;

    this.setState({
      showPopup: false,
    });

    removeCard(id);
  };

  onMakeCardDefault = (id) => {
    const { makeDefault } = this.props;

    this.setState({
      showPopup: false,
    });

    makeDefault(id);
  };

  isNewCardValid = (nextState) => {
    const state = nextState || this.state;
    const {
      number,
      holder,
      date,
      cvv,
    } = state;

    return checkCardNumber(number) &&
      checkCardHolder(holder) &&
      checkCardDate(date) &&
      checkCVV(cvv);
  };

  render() {
    const { className, data } = this.props;
    const {
      onChange,
      onCardSelect,
      onCardEdit,
      onPopupClose,
      onCardRemove,
      onMakeCardDefault,
    } = this;
    const {
      number,
      holder,
      date,
      cvv,
      showPopup,
      editCardId,
    } = this.state;
    const selected = this.state.selected || data.defaultCard;
    const currentCard = data.items.find(i => i.token === editCardId);
    // console.log(currentCard)

    return (
      <div className={`cards ${className}`}>
        <div className="cards__row">
          <div className="cards__inner">
            {
              data.items.map(c => (
                <Card
                  key={c.token}
                  id={c.token}
                  onChange={onChange}
                  onSelect={onCardSelect}
                  onEdit={onCardEdit}
                  selected={selected}
                  type={c.type}
                  title={c.title}
                  colors={c.colors}
                  defaultCard={data.defaultCard}
                />
              ))
            }
            <Card
              key="new"
              type="new"
              id="new"
              onSelect={onCardSelect}
              selected={selected}
              onChange={onChange}
              values={{
                number,
                holder,
                date,
                cvv,
              }}
            />
          </div>
        </div>
        <Popup show={showPopup} onClose={onPopupClose}>
          <div>
            <div className="card card_visa card_big">
              <div className="card__number">*6266</div>
              <div className="card__close" onClick={onPopupClose} />
            </div>
            <div className="card__edit">
              <div className="card__edit-item" onClick={() => onMakeCardDefault(editCardId)}>
                <span className="card__edit-icon">
                  <InlineSvg src={require('../../../media/icons/card.svg')} raw />
                </span>
                Карта по умолчанию
              </div>
              <div className="card__edit-item" onClick={() => onCardRemove(editCardId)}>
                <span className="card__edit-icon">
                  <InlineSvg src={require('../../../media/icons/bucket.svg')} raw />
                </span>
                удалить
              </div>
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.Cards,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: card => dispatch(addCardAction(card)),
    removeCard: id => dispatch(removeCardAction(id)),
    makeDefault: id => dispatch(makeDefaultAction(id)),
  };
}

Cards.propTypes = {
  data: PropTypes.shape().isRequired,
  onPermitChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  addCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  makeDefault: PropTypes.func.isRequired,
};

Cards.defaultProps = {
  className: '',
};


export default connect(mapStateToProps, mapDispatchToProps)(Cards);
