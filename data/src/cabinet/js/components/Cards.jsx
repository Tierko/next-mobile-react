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
  };

  componentDidMount() {
    const { setOffset, addClasses, onCardSelect } = this;
    const { data: { defaultCard } } = this.props;
    setOffset();
    addClasses();
    const card = document.getElementById(`card-${defaultCard}`);

    if (card) {
      onCardSelect({
        currentTarget: card,
      });
    }
  }

  onChange = (name, value) => {
    const { onPermitChange } = this.props;
    const { isNewCardValid, state } = this;
    const tmp = name === 'holder' ? value.toUpperCase().replace(/[^a-z\s]/gi, '') : value;
    const nextState = Object.assign({}, state, { [name]: tmp });
    const holderError = value.search(/[^a-z\s]/gi, '') !== -1 && name === 'holder';
    nextState[name] = value;

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
      selected,
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
    const scroll = id === 'new' ? maxScroll + 142 : cardNumber * 163;
    let timeout = 0;

    if (selected === 'new' || id === 'new') {
      timeout = 400;
    }

    setTimeout(() => {
      row.scroll({
        left: scroll,
        top: 0,
        behavior: 'smooth',
      });
    }, timeout);

    this.setState({
      selected: id,
    });
  };

  onPermitChange = (payPermitted) => {
    const { onPermitChange } = this.props;

    if (onPermitChange) {
      onPermitChange(payPermitted);
    }
  };

  onCardEdit = ({ currentTarget }) => {
    const { onEdit } = this.props;
    const { getAttr } = this;

    onEdit(getAttr(currentTarget, 'id'));
  };

  getAttr = (e, attr) => {
    if (e.dataset) {
      return e.dataset[attr];
    }

    return e.getAttribute(`data-${attr}`);
  };

  setOffset = () => {
    const { calculateOffsetStart, calculateOffsetEnd, inner } = this;
    const offsetStart = calculateOffsetStart();
    const offsetEnd = calculateOffsetEnd();
    inner.style.paddingLeft = `${offsetStart}px`;
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
    const CARD_WIDTH = 285 + 16;

    if (!row) {
      return 0;
    }

    return (row.clientWidth - CARD_WIDTH) / 2;
  };

  calculateOffsetStart = () => {
    const { row } = this;
    const CARD_WIDTH = 168 + 16;

    if (!row) {
      return 0;
    }

    return (row.clientWidth - CARD_WIDTH) / 2;
  };

  isNewCardValid = (nextState) => {
    const state = nextState || this.state;
    const {
      number,
      date,
      cvv,
      holder,
    } = state;

    return checkCardNumber(number) &&
      checkCardDate(date) && holder && checkCVV(cvv);
  };

  render() {
    const { className, data } = this.props;
    const {
      onChange,
      onCardSelect,
      onCardEdit,
    } = this;
    const {
      number,
      holder,
      date,
      cvv,
      holderError,
    } = this.state;
    const selected = this.state.selected || data.defaultCard;

    return (
      <div className={cs('cards__wrapper', { cards__wrapper_new: selected === 'new' })}>
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
