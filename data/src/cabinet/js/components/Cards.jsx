import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cs from 'classnames';
import Card from './Card';
import {
  checkCardNumber,
  checkCardDate,
  checkCVV,
  luhnAlgorithm,
} from '../utils';
import { autoPayDisableAction } from '../actions/AutoPay';
import { makeDefaultAction, removeCardAction } from '../actions/Cards';

class Cards extends Component {
  state = {
    selected: '',
    number: '',
    holder: '',
    holderError: false,
    date: '',
    cvv: '',
    editCardId: '',
    error: '',
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
    const card = document.getElementById(`card-${defaultCard}`) || document.querySelector('.card__wrapper');

    if (card) {
      onCardSelect({ target: card });
    }

    this.numberInput = numberInput;
    this.dateInput = dateInput;
    this.cvvInput = cvvInput;

    window.addEventListener('resize', setOffset);
  }

  componentDidUpdate(prevProps, prevState) {
    const { numberInput, addClasses } = this;
    const { selected } = this.state;


    addClasses();

    if (selected && selected !== prevState.selected && selected === 'new' && numberInput) {
      setTimeout(() => numberInput.focus(), 650);
    }
  }

  componentWillUnmount() {
    const { setOffset } = this;

    window.removeEventListener('resize', setOffset);
  }

  onChange = (name, value) => {
    const { onPermitChange, data } = this.props;
    const {
      isNewCardValid,
      state,
      manageFocus,
      numberInput,
      dateInput,
      cvvInput,
    } = this;
    const nextState = Object.assign({}, state, { [name]: value });
    nextState[name] = value;

    if (name === 'date') {
      let dates = value.split(' / ');

      if (dates && dates[0].length && (+dates[0]) > 12) {
        dates = dates.join('');
        dates = `0${dates.substr(0, 1)} / ${dates.substr(2)}`;

        nextState[name] = dates;
        value = dates;
      }
    }

    if (
      data.items.length &&
      nextState.number.length === 19 &&
      data.items.find(d => d.token === nextState.number.replace(/\s/g, ''))
    ) {
      nextState.error = 'Карта с таких номером уже существует';
    } else if (
      data.items.length &&
      nextState.number.length === 19 &&
      !luhnAlgorithm(nextState.number)
    ) {
      nextState.error = 'Неверный номер карты';
    } else {
      nextState.error = '';
    }

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
      error,
    } = nextState;
    const card = {
      token: number.replace(/\s/g, ''),
      holder,
      date,
      cvv,
    };

    this.setState({
      [name]: value,
      error,
    });

    const isCardValid = isNewCardValid(nextState) && !error;

    onPermitChange(isCardValid, isCardValid ? card : undefined);
  };

  onCardSelect = ({ target }) => {
    if (target.className.indexOf('card__wrapper') === -1) {
      return;
    }

    const { onPermitChange, isNewCardValid, getAttr } = this;
    const {
      number,
      holder,
      date,
      cvv,
    } = this.state;
    const id = getAttr(target, 'id') || 'new';
    const cardNumber = getAttr(target, 'number') || 0;
    const card = id === 'new' ? {
      holder,
      date,
      cvv,
      token: number.replace(/\s/g, ''),
    } : undefined;

    onPermitChange(id !== 'new' || (id === 'new' && isNewCardValid()), card);
    const { row, inner } = this;
    const maxScroll = inner.clientWidth - row.clientWidth;
    const scroll = id === 'new' ? maxScroll : cardNumber * 159;

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
    const cardNew = document.getElementById('card-new');
    const CARD_WIDTH = cardNew ? cardNew.clientWidth : 0;

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
      error,
    } = state;

    return checkCardNumber(number) &&
      checkCardDate(date) && checkCVV(cvv) && !error;
  };

  rollCard = ({ target }) => {
    const { selected } = this.state;
    const { onCardSelect } = this;
    const direction = target && target.getAttribute('data-direction');
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

    if (currentCard && currentCard.previousSibling && direction === 'prev') {
      currentCard.previousSibling.classList.remove('card__wrapper_hide');
    }

    if (card) {
      onCardSelect({ target: card });
    }
  };

  onRemove = (token) => {
    const { onCardSelect } = this;
    const card = document.querySelector(`.card__wrapper:not(#card-${token})`);
    const {
      removeCard,
      autoPayDisable,
      data,
    } = this.props;

    if (data.items.length === 1) {
      autoPayDisable();
    }

    if (card) {
      onCardSelect({ target: card });
    }

    removeCard(token);
  };

  render() {
    const {
      className,
      data,
      makeDefault,
    } = this.props;
    const {
      onChange,
      onCardSelect,
      rollCard,
      onRemove,
    } = this;
    const {
      number,
      holder,
      date,
      cvv,
      holderError,
      prevShow,
      nextShow,
      error,
    } = this.state;
    const selected = this.state.selected || data.defaultCard;

    return (
      <div className="cards__wrapper">
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
        <div className={cs(`cards ${className}`, { cards_new: selected === 'new' })}>
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
                      selected={selected}
                      type="card"
                      colors={c.colors}
                      defaultCard={data.defaultCard}
                      removeCard={onRemove}
                      makeDefault={makeDefault}
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
                  error={error}
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

function mapDispatchToProps(dispatch) {
  return {
    removeCard: token => dispatch(removeCardAction(token)),
    makeDefault: token => dispatch(makeDefaultAction(token)),
    autoPayDisable: () => dispatch(autoPayDisableAction()),
  };
}

Cards.propTypes = {
  data: PropTypes.shape().isRequired,
  onPermitChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  removeCard: PropTypes.func.isRequired,
  makeDefault: PropTypes.func.isRequired,
  autoPayDisable: PropTypes.func.isRequired,
};

Cards.defaultProps = {
  className: '',
};


export default connect(mapStateToProps, mapDispatchToProps)(Cards);
