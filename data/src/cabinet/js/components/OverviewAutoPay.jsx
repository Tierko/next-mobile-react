import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pages } from '../constants';
import { formatCost } from '../utils';

const OverviewAutoPay = ({ autoPay }) => {
  if (!(autoPay.monthlyEnabled || autoPay.lessEnabled)) {
    return false;
  }

  return (
    <div className="overview-auto-pay">
      <div className="overview-auto-pay__title">
        Подключен <Link className="link" to={Pages.AUTO_PAY}>автоплатеж</Link>
      </div>
      <div className="overview-auto-pay__list">
        {
          autoPay.monthlyEnabled &&
          <div>
            на&nbsp;{
              formatCost(autoPay.monthlySum)
            } ежемесячно {
              autoPay.monthlyDay
            } числа
          </div>
        }
        {
          autoPay.lessEnabled &&
          <div>
            на&nbsp;{
              formatCost(autoPay.lessSum)
            }, если на&nbsp;счету меньше чем {
              formatCost(autoPay.lessLess)
            }
          </div>
        }
      </div>
    </div>
  );
};

OverviewAutoPay.propTypes = {
  autoPay: PropTypes.shape().isRequired,
};

function mapDispatchToProps(state) {
  return {
    autoPay: state.AutoPay,
  };
}

export default connect(mapDispatchToProps)(OverviewAutoPay);
