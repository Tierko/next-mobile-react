import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SmallTabs from './SmallTabs';
import Button from '../../../../common/js/components/Button';
import Numbers from './Numbers';
import Transitions from '../../components/Transitions';
import { formatPhone, formatCost } from '../../utils';

class SignUpNumberSelect extends Component {
  state = {
    tab: 'all',
    showList: false,
    selectedPhone: '',
    numbers: [],
    numbersLoaded: false,
  };

  tabs = [{
    id: 'all',
    title: 'Все',
  }, {
    id: 'usual',
    title: 'Обычный',
  }, {
    id: 'vip',
    title: 'ВИП',
  }];

  componentDidMount() {
    fetch('/media/info/numbers.json', {
      headers: new Headers({
        credentials: 'same-origin',
        method: 'GET',
        'Content-Types': 'text/json',
      }),
    })
      .then(data => data.json())
      .then(numbers => this.setState({
        numbers,
      }));
  }

  static getDerivedStateFromProps(props, state) {
    if (state.numbers.length && !state.selectedPhone && state.numbers[0]) {
      return Object.assign({}, state, { selectedPhone: state.numbers[0].phone });
    }

    return state;
  }

  changeTab = (tab) => {
    const { setRandomNumber } = this;

    this.setState({
      tab,
    });

    setRandomNumber(tab);
  };

  toggleNumbers = () => {
    const { showList } = this.state;

    this.setState({
      showList: !showList,
    });
  };

  setRandomNumber = (currentTab) => {
    const { numbers } = this.state;
    const tab = typeof currentTab === 'string' ? currentTab : this.state.tab;
    const { selectPhone } = this;
    const filteredNumbers = numbers.filter(n => tab === 'all' || n.type === tab);
    let index = Math.random() * filteredNumbers.length;
    index = index.toFixed();

    if (filteredNumbers.length) {
      selectPhone(0, filteredNumbers[index].phone);
    }
  };

  selectPhone = (_, selectedPhone) => {
    this.setState({
      selectedPhone,
    });
  };

  render() {
    const { nextStep } = this.props;
    const {
      tabs,
      toggleNumbers,
      changeTab,
      setRandomNumber,
      selectPhone,
    } = this;
    const {
      tab,
      numbers,
      numbersLoaded,
      selectedPhone,
      showList,
    } = this.state;
    const filteredNumbers = numbers.filter(n => tab === 'all' || n.type === tab);
    const currentPhone = filteredNumbers.find(f => f.phone === selectedPhone);

    return (
      <Transitions>
        <div className="welcome__content sign-up sign-up_numbers">
          <div className="sign-up__message sign-up__message_select-number">
            Выберите новый номер телефона
          </div>
          <SmallTabs className="small-tabs_numbers" onChange={changeTab} active={tab} items={tabs} />
          {
            showList &&
            <Numbers
              numbers={filteredNumbers}
              selectPhone={selectPhone}
              selectedPhone={selectedPhone}
            />
          }
          {
            !showList && currentPhone &&
            <div>
              <div className="sign-up__chosen-number">
                <div className="sign-up__update" onClick={setRandomNumber} />
                {formatPhone(currentPhone.phone)}
                <span className="sign-up__chosen-number-p">{formatCost(currentPhone.price, true)}</span>
              </div>
            </div>
          }
          <div className="sign-up__toggle-numbers" onClick={toggleNumbers}>
            {
              showList ? 'Показать случайный номер' : 'Показать номера списком'
            }
          </div>
          <Button
            onClick={() => nextStep('personal')}
            className="button_sign-up-continue"
            primary
          >
            Продолжить
          </Button>
        </div>
      </Transitions>
    );
  }
}

SignUpNumberSelect.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default SignUpNumberSelect;
