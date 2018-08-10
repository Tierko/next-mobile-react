import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pages, DAYS } from '../constants';
import { convertStrings, formatCost } from '../utils';

const RoamingDashboard = ({ className, data: { zones, currentZoneId } }) => {
  return (
    <div className={`roaming-dashboard ${className} ${currentZoneId ? 'roaming-dashboard_roaming' : ''}`}>
      <Link className="roaming-dashboard__title" to={Pages.ROAMING}>
        { currentZoneId ? 'Роуминг в других зонах' : 'Роуминг' }
      </Link>
      <div className="roaming-dashboard__list">
        {
          zones.items.map(i => (
            <div key={i.id} className="roaming-dashboard__item">
              <div className="roaming-dashboard__item-name">
                <Link to={Pages.ROAMING} className="link">{i.name}</Link>
              </div>
              <div className="roaming-dashboard__item-info">
                {
                  i.additionalPackage &&
                  <Fragment>
                    <div className="roaming-dashboard__item-desc roaming-dashboard__item-desc_fast">
                      Пакет быстрого интернета
                    </div>
                    <div className="roaming-dashboard__item-conditions">
                      {i.additionalPackage.current.toString().replace('.', ',')} ГБ еще {i.additionalPackage.expired} {convertStrings(i.additionalPackage.expired, DAYS)}
                    </div>
                  </Fragment>
                }
                <div className="roaming-dashboard__item-desc roaming-dashboard__item-desc_regular">
                  Помегабайтный интернет
                </div>
                <div className="roaming-dashboard__item-conditions">
                  {formatCost(i.tariff.internet.byMb)} / Мб
                </div>
              </div>
              <div>
              </div>
            </div>
          ))
        }
      </div>
      <table className="roaming-dashboard__table" cellSpacing={0} cellPadding={0}>
        <tbody>
          {
            zones.items.map(i => (
              i.additionalPackage ?
                <Fragment key={i.id}>
                  <tr key={`${i.id}-f`} className="roaming-dashboard__tr">
                    <td rowSpan={2} className="roaming-dashboard__item-name">
                      <Link to={Pages.ROAMING} className="link">{i.name}</Link>
                    </td>
                    <td className="roaming-dashboard__item-desc roaming-dashboard__item-desc_fast">Пакет быстрого интернета</td>
                    <td>
                      {i.additionalPackage.current.toString().replace('.', ',')} ГБ еще {i.additionalPackage.expired} {convertStrings(i.additionalPackage.expired, DAYS)}
                    </td>
                  </tr>
                  <tr key={`${i.id}-r`}>
                    <td className="roaming-dashboard__item-desc roaming-dashboard__item-desc_regular">Помегабайтный интернет</td>
                    <td>{formatCost(i.tariff.internet.byMb)} / Мб</td>
                  </tr>
                </Fragment> :
                <tr key={`${i.id}-r`} className="roaming-dashboard__tr">
                  <td className="roaming-dashboard__item-name">
                    <Link to={Pages.ROAMING} className="link">{i.name}</Link>
                  </td>
                  <td className="roaming-dashboard__item-desc roaming-dashboard__item-desc_regular">Помегабайтный интернет</td>
                  <td>{formatCost(i.tariff.internet.byMb)} / Мб</td>
                </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

RoamingDashboard.propTypes = {
  data: PropTypes.PropTypes.shape().isRequired,
  className: PropTypes.string,
};

RoamingDashboard.defaultProps = {
  className: '',
};

export default RoamingDashboard;
