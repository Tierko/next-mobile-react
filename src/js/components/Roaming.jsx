import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pages } from '../constants';

const Roaming = ({ className, data }) => (
  <div className={`roaming ${className}`}>
    <Link className="roaming__title" to={Pages.ROAMING}>Роуминг</Link>
    <div className="roaming__list">
      {
        data.map(i => (
          <div key={i.id} className="roaming__item">
            <div className="roaming__item-name">
              <Link to={Pages.ROAMING} className="link">{i.zoneName}</Link>
            </div>
            <div>
              {
                i.services.map(s => (
                  <div key={s.id} className="roaming__item-info">
                    <div className={`roaming__item-desc roaming__item-desc_${s.type}`}>{s.desc}</div>
                    <div className="roaming__item-conditions">{s.conditions}</div>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
    <table className="roaming__table" cellSpacing={0} cellPadding={0}>
      <tbody>
        <tr>
          <td rowSpan={2} className="roaming__item-name">
            <Link to={Pages.ROAMING} className="link">Зона 1</Link>
          </td>
          <td className="roaming__item-desc roaming__item-desc_fast">Пакет быстрого интернета</td>
          <td>2,01 ГБ еще 12 дней</td>
        </tr>
        <tr>
          <td className="roaming__item-desc roaming__item-desc_regular">Помегабайтный интернет</td>
          <td>58 ₽ / Мб</td>
        </tr>
        <tr>
          <td className="roaming__item-name">
            <Link to={Pages.ROAMING} className="link">Зона 1</Link>
          </td>
          <td className="roaming__item-desc roaming__item-desc_regular">Помегабайтный интернет</td>
          <td>320 ₽ / Мб</td>
        </tr>
      </tbody>
    </table>
  </div>
);

Roaming.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  className: PropTypes.string,
};

Roaming.defaultProps = {
  className: '',
};

export default Roaming;
