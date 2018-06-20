import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pages } from '../constants';

const Roaming = ({ className, data }) => (
  <div className={`roaming ${className}`}>
    <Link className="roaming__title" to={Pages.Roaming}>Роуминг</Link>
    <div className="roaming__items">
      {
        data.map(i => (
          <div key={i.id} className="roaming__item">
            <div className="roaming__item-name">
              <Link to={Pages.Roaming} className="link">{i.zoneName}</Link>
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
