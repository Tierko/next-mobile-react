import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Link } from 'react-router-dom';
import RoamingCurrent from './RoamingCurrent';
import Transitions from './Transitions';
import { Pages, COUNTRIES, HOME } from '../constants';
import { convertStrings } from '../utils';

class RoamingZone extends Component {
  getCountries = () => {
    const { data, features } = this.props;
    let countries = features.filter(f => (
      data.countries.indexOf(f.properties.iso_a2) !== -1 && f.properties.iso_a2 !== HOME
    ));

    countries = countries.map(c => c.properties.name);

    if (countries.length > 2) {
      const count = countries.length - 2;
      return [countries[0], countries[1], `и еще ${count} ${convertStrings(count, COUNTRIES)}`].join(', ');
    }

    return countries.join(', ');
  };

  render() {
    const { getCountries } = this;
    const { active, data, history } = this.props;

    return (
      data.id === active &&
      <Transitions>
        <div className={cs('roaming-zone', { 'roaming-zone_show': data.id === active })}>
          <div className="roaming__title roaming__title_desktop">Роуминг в {data.title}</div>
          <Link to={`${Pages.ROAMING}/countries/${data.id}`} className="roaming-zone__countries">
            {getCountries()}
          </Link>
          <RoamingCurrent data={data} history={history} />
          <Link to={`${Pages.ROAMING}/zone-tariff/${data.id}`} className="roaming-zone__more">
            Подробнее о тарифах в {data.title}
          </Link>
        </div>
      </Transitions>
    );
  }
}

RoamingZone.propTypes = {
  data: PropTypes.shape().isRequired,
  active: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
  features: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RoamingZone;
