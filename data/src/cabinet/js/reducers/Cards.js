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
  {
    let { defaultCard } = state;

    if (state.items.length === 0) {
      defaultCard = action.card.token;
    }

    return Object.assign({}, state, {
      items: [...state.items, action.card],
      defaultCard,
    });
  }
  case ACTION_TYPES.CARDS_REMOVE:
  {
    const card = state.items.find(i => i.token === action.id);
    const filteredItems = state.items.filter(i => i.token !== action.id);
    let { defaultCard } = state;

    if (card && card.token === action.id && filteredItems[0]) {
      defaultCard = filteredItems[0].token;
    }

    return Object.assign({}, state, {
      items: filteredItems,
      defaultCard,
    });
  }
  case ACTION_TYPES.CARDS_MAKE_DEFAULT:
    return Object.assign({}, state, { defaultCard: action.id });
  default:
    return state;
  }
};

export default Cards;
