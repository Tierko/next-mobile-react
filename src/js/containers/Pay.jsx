import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cs from 'classnames';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Payment from '../components/Payment';
import Button from '../components/Button';
import CardEditor from '../components/CardEditor';
import Transitions from '../components/Transitions';
import { Pages, TITLES } from '../constants';
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

  render() {
    const { sum, editCardId } = this.state;
    const { autoPay, cards } = this.props;
    const autoPayEnabled = autoPay.lessEnabled || autoPay.monthlyEnabled;
    const {
      onPay,
      changeAutoPay,
      onSumChange,
      onEdit,
      onClose,
    } = this;
    const meta = {
      title: TITLES.PAY,
    };

    return (
      <DocumentMeta {...meta}>
        <MobileNav key="nav" type="dashboard" />
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content dashboard__content_pay pay">
              <div className={cs('pay__inner', { pay__inner_fade: !!editCardId })}>
                <div className="dashboard__header">Пополнение</div>
                <Payment
                  isEditable
                  onPay={onPay}
                  sum={sum}
                  onSumChange={onSumChange}
                  onEdit={onEdit}
                />
                {
                  autoPayEnabled &&
                  <div className="dashboard__header">Подключен автоплатеж</div>
                }
                {
                  autoPay.monthlyEnabled &&
                  <Fragment>
                    <div className="pay__auto-pay-from">
                      {formatCost(autoPay.monthlySum)} с карты {getShortPan(cards.defaultCard)}
                    </div>
                    <div>
                      Оплата каждый месяц {autoPay.monthlyDay} числа до {autoPay.monthlyUntil}
                    </div>
                  </Fragment>
                }
                {
                  autoPay.lessEnabled &&
                  <Fragment>
                    <div className="pay__auto-pay-from">
                      {formatCost(autoPay.lessSum)} с карты {getShortPan(cards.defaultCard)}
                    </div>
                    <div>
                      Если сумма на балансе меньше {formatCost(autoPay.lessLess)}
                    </div>
                  </Fragment>
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
              <CardEditor id={editCardId} onClose={onClose} />
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
