import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pages } from '../constants';

const RoamingDashboard = ({ className, data }) => (
  <div className={`roaming-dashboard ${className}`}>
    <Link className="roaming-dashboard__title" to={Pages.ROAMING}>Роуминг</Link>
    <div className="roaming-dashboard__list">
      {
        data.map(i => (
          <div key={i.id} className="roaming-dashboard__item">
            <div className="roaming-dashboard__item-name">
              <Link to={Pages.ROAMING} className="link">{i.zoneName}</Link>
            </div>
            <div>
              {
                i.services.map(s => (
                  <div key={s.id} className="roaming-dashboard__item-info">
                    <div className={`roaming-dashboard__item-desc roaming-dashboard__item-desc_${s.type}`}>{s.desc}</div>
                    <div className="roaming-dashboard__item-conditions">{s.conditions}</div>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
    <table className="roaming-dashboard__table" cellSpacing={0} cellPadding={0}>
      <tbody>
        <tr>
          <td rowSpan={2} className="roaming-dashboard__item-name">
            <Link to={Pages.ROAMING} className="link">Зона 1</Link>
          </td>
          <td className="roaming-dashboard__item-desc roaming-dashboard__item-desc_fast">Пакет быстрого интернета</td>
          <td>2,01 ГБ еще 12 дней</td>
        </tr>
        <tr>
          <td className="roaming-dashboard__item-desc roaming-dashboard__item-desc_regular">Помегабайтный интернет</td>
          <td>58 ₽ / Мб</td>
        </tr>
        <tr>
          <td className="roaming-dashboard__item-name">
            <Link to={Pages.ROAMING} className="link">Зона 1</Link>
          </td>
          <td className="roaming-dashboard__item-desc roaming-dashboard__item-desc_regular">Помегабайтный интернет</td>
          <td>320 ₽ / Мб</td>
        </tr>
      </tbody>
    </table>
  </div>
);

RoamingDashboard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  className: PropTypes.string,
};

RoamingDashboard.defaultProps = {
  className: '',
};

export default RoamingDashboard;
