import { ACTION_TYPES } from '../constants';

const initState = {
  defaultCard: '4254863245896266',
  items: [{
    token: '4254863245896266',
    colors: ['#e72b2b', '#ff693e'],
  }, {
    token: '2254563796521258',
    colors: ['#e72b2b', '#ff693e'],
  }, {
    token: '5254563796528514',
    colors: ['#0e4471', '#015198'],
  }],
};

const Cards = (state = initState, action) => {
  switch (action.type) {
  case ACTION_TYPES.CARDS_ADD:
    return Object.assign({}, state, { items: [...state.items, action.card] });
  case ACTION_TYPES.CARDS_REMOVE:
    return Object.assign({}, state, { items: state.items.filter(i => i.token !== action.id) });
  case ACTION_TYPES.CARDS_MAKE_DEFAULT:
    return Object.assign({}, state, { defaultCard: action.id });
  default:
    return state;
  }
};

export default Cards;
