import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cs from 'classnames';
import DocumentMeta from 'react-document-meta';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import Payment from '../components/Payment';
import Button from '../../../common/js/components/Button';
import CardEditor from '../components/CardEditor';
import Transitions from '../components/Transitions';
import BreadCrumbs from '../components/Breadcrumbs';
import { Pages, TITLES, MONTHS, MONTHS_M } from '../constants';
import { formatCost, getShortPan } from '../utils';
import { addCardAction } from '../actions/Cards';

class Pay extends Component {
  state = {
    sum: 2000,
    editCardId: '',
  };

  onPay = (card) => {
    const { history, addCard } = this.props;
    const { sum } = this.state;
    const links = [{
      url: Pages.AUTO_PAY,
      title: 'Сделать платеж регулярным',
      primary: true,
    }, {
      url: Pages.OVERVIEW,
      title: 'Вернуться на главную',
    }];

    if (card) {
      addCard(card);
    }

    history.push({
      pathname: `${Pages.RESULT}/success`,
      state: {
        title: 'Оплата прошла успешно',
        text: `На ваш счет зачислено ${formatCost(sum)}`,
        links,
      },
    });
  };

  onSumChange = (sum) => {
    this.setState({
      sum,
    });
  };

  onEdit = (editCardId) => {
    this.setState({
      editCardId,
    });
  };

  onClose = () => {
    this.setState({
      editCardId: '',
    });
  };

  changeAutoPay = () => {
    const { history } = this.props;

    history.push(Pages.AUTO_PAY);
  };

  convertMonth = (str) => {
    if (!str) {
      return str;
    }

    const monthYear = str.split(' ');

    if (monthYear.length !== 2) {
      return str;
    }

    const index = MONTHS.findIndex(m => m.toLowerCase() === monthYear[0].toLowerCase());

    if (index === -1) {
      return str;
    }

    return `${MONTHS_M[index]} ${monthYear[1]}`;
  };

  render() {
    const { sum, editCardId } = this.state;
    const { autoPay, cards, history } = this.props;
    const autoPayEnabled = autoPay.lessEnabled || autoPay.monthlyEnabled;
    const {
      onPay,
      changeAutoPay,
      onSumChange,
      onEdit,
      onClose,
      convertMonth,
    } = this;
    const meta = {
      title: TITLES.PAY,
    };
    const currentCard = cards.items.find(c => c.token === editCardId);

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile />
        <MobileNav key="nav" type="dashboard" />
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content dashboard__content_pay pay">
              <div className={cs('pay__inner', { pay__inner_fade: !!editCardId })}>
                {
                  history.location.state &&
                  <BreadCrumbs items={[{ title: 'Тарифы', link: Pages.SERVICES }]} />
                }
                <div className="dashboard__header">
                  {
                    history.location.state ?
                      'Оплата' :
                      'Пополнение'
                  }
                </div>
                <Payment
                  isEditable={!this.props.location.state}
                  onPay={onPay}
                  sum={sum}
                  onSumChange={onSumChange}
                  onEdit={onEdit}
                />
                {
                  autoPayEnabled &&
                  <div className="dashboard__header">
                    Подключен автоплатеж
                    <div className="dashboard__header-sub">
                      С&nbsp;карты по&nbsp;умолчанию {getShortPan(cards.defaultCard)}
                    </div>
                  </div>
                }
                {
                  autoPay.monthlyEnabled &&
                  <div className="pay__auto-pay-from">
                    Оплата {
                      formatCost(autoPay.monthlySum)
                    } каждый месяц {
                      autoPay.monthlyDay
                    } числа до&nbsp;{convertMonth(autoPay.monthlyUntil)}
                  </div>
                }
                {
                  autoPay.lessEnabled &&
                  <div className="pay__auto-pay-from">
                    Пополнять счет не&nbsp;{
                      formatCost(autoPay.lessSum)
                    }, если баланс меньше {formatCost(autoPay.lessLess)}
                  </div>
                }
                {
                  autoPayEnabled &&
                  <Button className="button_pay-change" onClick={changeAutoPay}>Изменить</Button>
                }
                {
                  !autoPayEnabled &&
                  <div>
                    <Link className="link" to={Pages.AUTO_PAY} >
                      Подключить автоплатеж
                    </Link>
                  </div>
                }
              </div>
              {
                currentCard &&
                <CardEditor card={currentCard} onClose={onClose} defaultCard={cards.defaultCard} />
              }
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

Pay.propTypes = {
  history: PropTypes.shape().isRequired,
  addCard: PropTypes.func.isRequired,
  autoPay: PropTypes.shape().isRequired,
  cards: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return {
    autoPay: state.AutoPay,
    cards: state.Cards,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCard: card => dispatch(addCardAction(card)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
