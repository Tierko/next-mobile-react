import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import Card from './Card';
import {
  checkCardNumber,
  checkCardDate,
  checkCVV,
} from '../utils';

class Cards extends Component {
  state = {
    selected: '',
    number: '',
    holder: '',
    holderError: false,
    date: '',
    cvv: '',
    editCardId: '',
    prevShow: false,
    nextShow: false,
  };

  componentDidMount() {
    const { setOffset, addClasses, onCardSelect } = this;
    const { data: { defaultCard } } = this.props;
    const numberInput = document.querySelector('.input-card_number input');
    const dateInput = document.querySelector('.input-card_date input');
    const cvvInput = document.querySelector('.card__cvv .card__cvv-input');
    setOffset();
    addClasses();
    const card = document.getElementById(`card-${defaultCard}`);

    if (card) {
      onCardSelect({
        currentTarget: card,
      });
    }

    this.numberInput = numberInput;
    this.dateInput = dateInput;
    this.cvvInput = cvvInput;
  }

  componentDidUpdate(prevProps, prevState) {
    const { numberInput } = this;
    const { selected } = this.state;

    if (selected && selected !== prevState.selected && selected === 'new' && numberInput) {
      setTimeout(() => numberInput.focus(), 650);
    }
  }

  manageFocus = (name, value, count, nextInput, prevInput) => {
    const { state } = this;

    if (nextInput && value.length === count) {
      if (state[name].length === count - 1) {
        nextInput.focus();
      }

      if (state[name].length === count && state[name][count - 1] !== value[count - 1]) {
        nextInput.focus();
      }
    }

    if (prevInput && value.length === 0) {
      if (state[name].length === 1) {
        prevInput.focus();
      }
    }
  };

  onChange = (name, value) => {
    const { onPermitChange } = this.props;
    const {
      isNewCardValid,
      state,
      manageFocus,
      numberInput,
      dateInput,
      cvvInput,
    } = this;
    const tmp = name === 'holder' ? value.toUpperCase().replace(/[^a-z\s]/gi, '') : value;
    const nextState = Object.assign({}, state, { [name]: tmp });
    const holderError = value.search(/[^a-z\s]/gi, '') !== -1 && name === 'holder';
    nextState[name] = value;

    if (name === 'number') {
      manageFocus(name, value, 19, dateInput);
    }

    if (name === 'date') {
      manageFocus(name, value, 7, cvvInput, numberInput);
    }

    if (name === 'cvv') {
      manageFocus(name, value, 3, null, dateInput);
    }

    const {
      number,
      holder,
      date,
      cvv,
    } = nextState;
    const card = {
      token: number.replace(/\s/g, ''),
      holder,
      date,
      cvv,
    };

    this.setState({
      [name]: tmp,
      holderError,
    });

    onPermitChange(isNewCardValid(nextState), isNewCardValid(nextState) ? card : undefined);
  };

  onCardSelect = (e) => {
    const cardE = e.currentTarget;
    const { onPermitChange, isNewCardValid, getAttr } = this;
    const {
      number,
      holder,
      date,
      cvv,
    } = this.state;
    const id = getAttr(cardE, 'id');
    const card = id === 'new' ? {
      holder,
      date,
      cvv,
      token: number.replace(/\s/g, ''),
    } : undefined;

    onPermitChange(id !== 'new' || (id === 'new' && isNewCardValid()), card);
    const { row, inner } = this;
    const maxScroll = inner.clientWidth - row.clientWidth;
    const cardNumber = getAttr(cardE, 'number') * 1;
    const scroll = id === 'new' ? maxScroll + 142 : cardNumber * 202;

    row.scroll({
      left: scroll,
      top: 0,
      behavior: 'smooth',
    });

    this.setState({
      selected: id,
      prevShow: cardNumber > 0 || id === 'new',
      nextShow: id !== 'new',
    });
  };

  onPermitChange = (payPermitted) => {
    const { onPermitChange } = this.props;

    if (onPermitChange) {
      onPermitChange(payPermitted);
    }
  };

  onCardEdit = (id) => {
    const { onEdit } = this.props;

    onEdit(id);
  };

  getAttr = (e, attr) => {
    if (e.dataset) {
      return e.dataset[attr];
    }

    return e.getAttribute(`data-${attr}`);
  };

  setOffset = () => {
    const { calculateOffsetEnd, inner } = this;
    const offsetEnd = calculateOffsetEnd();
    inner.style.paddingRight = `${offsetEnd}px`;
  };

  addClasses = () => {
    const cards = document.querySelectorAll('.card__wrapper');

    [].forEach.call(cards, (e, i) => {
      if (i !== cards.length - 1) {
        e.setAttribute('data-number', i);
      }
    });
  };

  calculateOffsetEnd = () => {
    const { row } = this;
    const CARD_WIDTH = 328 + 16;

    if (!row) {
      return 0;
    }

    return (row.clientWidth - CARD_WIDTH);
  };

  isNewCardValid = (nextState) => {
    const state = nextState || this.state;
    const {
      number,
      date,
      cvv,
    } = state;

    return checkCardNumber(number) &&
      checkCardDate(date) && checkCVV(cvv);
  };

  rollCard = ({ target }) => {
    const { selected } = this.state;
    const { onCardSelect } = this;
    const direction = target.getAttribute('data-direction');
    const currentCard = document.getElementById(`card-${selected}`);
    let card = null;

    if (currentCard && direction === 'next') {
      card = currentCard.nextSibling;
    }

    if (currentCard && direction === 'prev') {
      card = currentCard.previousSibling;
    }

    if (currentCard && direction === 'next' && selected !== 'new') {
      currentCard.classList.add('card__wrapper_hide');
    }

    if (currentCard.previousSibling && direction === 'prev') {
      currentCard.previousSibling.classList.remove('card__wrapper_hide');
    }

    if (card) {
      onCardSelect({
        currentTarget: card,
      });
    }
  };

  render() {
    const { className, data } = this.props;
    const {
      onChange,
      onCardSelect,
      onCardEdit,
      rollCard,
    } = this;
    const {
      number,
      holder,
      date,
      cvv,
      holderError,
      prevShow,
      nextShow,
    } = this.state;
    const selected = this.state.selected || data.defaultCard;

    return (
      <div className={cs('cards__wrapper', { cards__wrapper_new: selected === 'new' })}>
        <div
          className={cs('cards__arrow cards__arrow_prev', {
            cards__arrow_hide: !prevShow,
          })}
          data-direction="prev"
          onClick={rollCard}
        />
        <div
          className={cs('cards__arrow cards__arrow_next', {
            cards__arrow_hide: !nextShow,
          })}
          data-direction="next"
          onClick={rollCard}
        />
        <div className={`cards ${className}`}>
          <div className="cards__row" ref={(e) => { this.row = e; }}>
            <div className="cards__inner" ref={(e) => { this.inner = e; }}>
              <div className="cards__fix">
                <Card
                  key="apple-pay"
                  id="apple-pay"
                  onSelect={onCardSelect}
                  selected={selected}
                  type="apple-pay"
                  defaultCard={data.defaultCard}
                />
                {
                  data.items.map(c => (
                    <Card
                      key={c.token}
                      id={c.token}
                      onChange={onChange}
                      onSelect={onCardSelect}
                      onEdit={onCardEdit}
                      selected={selected}
                      type="card"
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
                    holderError,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.Cards,
  };
}

Cards.propTypes = {
  data: PropTypes.shape().isRequired,
  onPermitChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Cards.defaultProps = {
  className: '',
};


export default connect(mapStateToProps)(Cards);
