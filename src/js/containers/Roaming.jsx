import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import RoamingMap from '../components/RoamingMap';
import Tabs from '../components/Tabs';
import RoamingZone from '../components/RoamingZone';
import RoamingCountries from '../components/RoamingCountries';
import RoamingInternet from '../components/RoamingInternet';
import RoamingTariffZone from '../components/RoamingTariffZone';
import RoamingTariffCountry from '../components/RoamingTariffCountry';
import { Pages } from '../constants';
// import data from '../../data';

class Roaming extends Component {
  state = {
    tab: 1,
    features: [],
    roamingZones: [],
    country: {},
  };

  onTabChange = (tab) => {
    const { country } = this.state;

    if (country.properties) {
      return;
    }

    this.setState({
      tab,
    });
  };

  onCountrySelect = (country) => {
    const { tab } = this.state;
    const { history, data: { zones: roamingZones } } = this.props;
    const { getCenter, getZoneByCountry } = this;
    const zone = getZoneByCountry(roamingZones, country);

    this.setState({
      country: Object.assign(country, { center: getCenter(country) }),
      tab: zone || tab,
    });

    history.push(Pages.ROAMING);
  };

  getZoneByCountry = (zones, country) => {
    if (!country.properties) {
      return 0;
    }

    const zone = zones.find(z => z.countries.indexOf(country.properties.iso_a2) !== -1);

    if (!zone) {
      return 0;
    }

    return zone.id;
  };

  getCurrentZone = () => {
    const { fillEmptyZone } = this;
    const { tab } = this.state;
    const { zones, features } = this.props.data;
    const roamingZones = fillEmptyZone(zones.items, features.items);

    return roamingZones.find(z => z.id === tab) || {};
  };

  getCenter = (f) => {
    const coordinates = [];

    if (!f.geometry) {
      return false;
    }

    f.geometry.coordinates.forEach(a => (
      a.forEach(c => (
        f.geometry.type === 'MultiPolygon' ? c.forEach(m => coordinates.push(m)) : coordinates.push(c)
      ))
    ));

    const x = coordinates.map(c => c[0]);
    const y = coordinates.map(c => c[1]);
    const minX = Math.min.apply(null, x);
    const minY = Math.min.apply(null, y);
    const maxX = Math.max.apply(null, x);
    const maxY = Math.max.apply(null, y);

    const lat = (minX + maxX) / 2;
    const lon = (minY + maxY) / 2;

    return [lon, lat];
  };

  componentDidMount() {
    // fetch('/data/map.geo.json', {
    //   headers: new Headers({
    //     'Content-Types': 'text/json',
    //   }),
    // })
    //   .then(features => features.json())
    //   .then(features => this.setState({
    //     features,
    //   }));
  }

  fillEmptyZone = (zones, features) => {
    const filtered = [];
    const emptyZoneIndex = zones.findIndex(z => z.countries.length === 0);

    if (emptyZoneIndex === -1) {
      return zones;
    }

    zones.forEach(z => {
      if (z.countries) {
        z.countries.forEach(c => filtered.push(c));
      }
    });

    const countries = features.map(f => {
      if (filtered.indexOf(f.properties.iso_a2) === -1) {
        return f.properties.iso_a2;
      }

      return null;
    });

    zones[emptyZoneIndex].countries = countries.filter(c => c);

    return zones;
  };

  render() {
    const {
      onTabChange,
      getCurrentZone,
      onCountrySelect,
      fillEmptyZone,
    } = this;
    const {
      tab,
      country,
    } = this.state;
    const {
      match: { params: { type, zoneId, countryId } },
      history,
      data: { zones: roamingZones },
      data: { features },
    } = this.props;
    const zones = fillEmptyZone(roamingZones.items, features.items);
    const zone = roamingZones.items.find(z => z.id === zoneId * 1);

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content dashboard__content_roaming">
          <RoamingMap
            zone={getCurrentZone()}
            features={features.items}
            country={country}
            onCountrySelect={onCountrySelect}
          />
          {
            !zoneId &&
            <div className="roaming roaming_zones">
              {

              }
              <Tabs
                tabs={zones}
                active={tab}
                onTabChange={onTabChange}
                disable={!!country.properties}
              />
              {
                zones.map(z => (
                  <RoamingZone
                    key={z.id}
                    data={z}
                    active={tab}
                    history={history}
                    features={features.items}
                    zones={zones}
                  />
                ))
              }
            </div>
          }
          {
            zone && type === 'countries' &&
            <RoamingCountries items={features.items} zone={zone} />
          }
          {
            zoneId && type === 'internet' &&
            <RoamingInternet />
          }
          {
            zoneId && type === 'zone-tariff' &&
            <RoamingTariffZone id={zoneId} />
          }
          {
            countryId && type === 'country-tariff' && zone &&
            <RoamingTariffCountry zone={zone} items={features.items} id={countryId} />
          }
        </div>
      </div>,
    ]);
  }
}

function mapStateToProps(state) {
  return {
    data: state.Roaming,
  };
}

Roaming.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  data: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Roaming);
