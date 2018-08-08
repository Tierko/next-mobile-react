import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from './Card';
import {
  checkCardNumber,
  checkCardHolder,
  checkCardDate,
  checkCVV,
} from '../utils';

class Cards extends Component {
  state = {
    selected: '',
    number: '',
    holder: '',
    date: '',
    cvv: '',
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
    const tmp = name === 'holder' ? value.toUpperCase().replace(/[^a-z\s]/gi, '') : value;
    const nextState = Object.assign({}, state, { [name]: tmp });
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
      [name]: tmp,
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


    const cardE = e.currentTarget;
    const { row, inner } = this;
    const selected = document.querySelector('.card_selected');

    if (selected && !cardE.classList.contains('card_selected')) {
      selected.classList.remove('card_selected');
    }

    if (cardE && row) {
      const isNewCard = cardE.classList.contains('card_new');
      const offset = this.calculateOffsetStart() + 8 + (isNewCard ? -117 : 0);
      const cardBound = cardE.getBoundingClientRect();
      const innerBound = inner.getBoundingClientRect();

      setTimeout(() => {
        row.scroll({
          left: cardBound.x - innerBound.x - offset,
          top: 0,
          behavior: 'smooth',
        });
      }, 100);
    }

    this.setState({
      selected: id,
    });
  };

  onCardEdit = ({ target }) => {
    const { onEdit } = this.props;

    onEdit(target.dataset.id);
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

  calculateOffsetStart = () => {
    const { row } = this;
    const CARD_WIDTH = 168 + 16;

    if (!row) {
      return 0;
    }

    return (row.clientWidth - CARD_WIDTH) / 2;
  };

  calculateOfssetEnd = () => {
    const { row } = this;
    const CARD_WIDTH = 285 + 16;

    if (!row) {
      return 0;
    }

    return (row.clientWidth - CARD_WIDTH) / 2;
  };

  setOffset = () => {
    const { calculateOffsetStart, calculateOfssetEnd, inner } = this;
    const offsetStart = calculateOffsetStart();
    const offsetEnd = calculateOfssetEnd();
    inner.style.paddingLeft = `${offsetStart}px`;
    inner.style.paddingRight = `${offsetEnd}px`;
  };

  componentDidMount() {
    const { setOffset } = this;
    setOffset();
  }

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
      editCardId,
    } = this.state;
    const selected = this.state.selected || data.defaultCard;
    const currentCard = data.items.find(i => i.token === editCardId);

    return (
      <div className="cards__wrapper">
        <div className={`cards ${className}`}>
          <div className="cards__row" ref={(e) => { this.row = e; }}>
            <div className="cards__inner" ref={(e) => { this.inner = e; }}>
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
