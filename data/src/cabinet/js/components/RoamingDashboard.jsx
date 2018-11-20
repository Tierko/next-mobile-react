import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pages, DAYS } from '../constants';
import { convertStrings, formatCost } from '../utils';

const RoamingDashboard = ({ data: { zones, currentZoneId } }) => {
  return (
    <div className="block block_round">
      <div className="block__header">
        Подключенный <Link className="link" to={Pages.ROAMING}>роуминг</Link>
      </div>
      <div className="roaming-dashboard__list">
        {
          zones.items.map(i => (
            <div key={i.id} className="roaming-dashboard__item">
              <div className="roaming-dashboard__item-name">
                <Link to={`${Pages.ROAMING}/${i.id}`} className="link">{i.name}</Link>
              </div>
              <div className="roaming-dashboard__item-info">
                {
                  i.additionalPackage &&
                  <Fragment>
                    <div className="roaming-dashboard__item-desc roaming-dashboard__item-desc_fast">
                      Пакет быстрого интернет-трафика
                    </div>
                    <div className="roaming-dashboard__item-conditions">
                      {i.additionalPackage.current.toString().replace('.', ',')} ГБ еще {i.additionalPackage.expired} {convertStrings(i.additionalPackage.expired, DAYS)}
                    </div>
                  </Fragment>
                }
                <div className="roaming-dashboard__item-desc roaming-dashboard__item-desc_regular">
                  Помегабайтный трафик
                </div>
                <div className="roaming-dashboard__item-conditions">
                  {formatCost(i.tariff.internet.byMb)} / МБ
                </div>
              </div>
              <div>
              </div>
            </div>
          ))
        }
      </div>
      <table className="roaming-dashboard__table">
        <tbody>
          {
            zones.items.filter(i => i.id !== currentZoneId).map(i => (
              i.additionalPackage ?
                <Fragment key={i.id}>
                  <tr key={`${i.id}-f`} className="roaming-dashboard__tr">
                    <td rowSpan={2} className="roaming-dashboard__item-name">
                      <Link to={`${Pages.ROAMING}/${i.id}`} className="link">
                        {i.name}
                      </Link>
                    </td>
                    <td className="roaming-dashboard__item-desc">
                      Пакет быстрого интернет-трафика
                    </td>
                    <td>
                      {i.additionalPackage.current.toString().replace('.', ',')} ГБ еще {i.additionalPackage.expired} {convertStrings(i.additionalPackage.expired, DAYS)}
                    </td>
                  </tr>
                  <tr key={`${i.id}-r`}>
                    <td className="roaming-dashboard__item-desc">
                      Помегабайтный трафик
                    </td>
                    <td>
                      {formatCost(i.tariff.internet.byMb)} / МБ
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div className="roaming-dashboard__divider" />
                    </td>
                  </tr>
                </Fragment> :
                <Fragment key={i.id}>
                  <tr key={`${i.id}-r`} className="roaming-dashboard__tr">
                    <td className="roaming-dashboard__item-name">
                      <Link to={`${Pages.ROAMING}/${i.id}`} className="link">{i.name}</Link>
                    </td>
                    <td className="roaming-dashboard__item-desc">
                      Помегабайтный трафик
                    </td>
                    <td>{formatCost(i.tariff.internet.byMb)} / МБ</td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <div className="roaming-dashboard__divider" />
                    </td>
                  </tr>
                </Fragment>
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
