import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import RoamingMap from '../components/RoamingMap';
import Tabs from '../components/Tabs';
import RoamingZone from '../components/RoamingZone';
import RoamingCountries from '../components/RoamingCountries';
import RoamingInternet from '../components/RoamingInternet';
import RoamingTariffZone from '../components/RoamingTariffZone';
import RoamingTariffCountry from '../components/RoamingTariffCountry';
import Transitions from '../components/Transitions';
import { Pages, TITLES } from '../constants';

class Roaming extends Component {
  state = {
    tab: 1,
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

    if (!country.properties || country.properties.iso_a2 !== 'RU') {
      this.setState({
        country: Object.assign(country, { center: getCenter(country) }),
        tab: zone || tab,
      });

      history.push(Pages.ROAMING);
    }
  };

  getZoneByCountry = (zones, country) => {
    if (!country.properties) {
      return 0;
    }

    const zone = zones.items.find(z => z.countries.indexOf(country.properties.iso_a2) !== -1);

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
    const meta = {
      title: TITLES.ROAMING,
    };

    return (
      <DocumentMeta {...meta}>
        <MobileNav key="nav" type="dashboard" />
        <div key="dashboard" className="dashboard">
          <Aside />
          <div className="dashboard__content dashboard__content_roaming">
            <Transitions>
              <RoamingMap
                zone={getCurrentZone()}
                features={features.items}
                country={country}
                onCountrySelect={onCountrySelect}
              />
              {
                !zoneId &&
                <Transitions>
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
                      zones && zones.map(z => (
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
                </Transitions>
              }
              {
                zone && type === 'countries' &&
                <Transitions>
                  <RoamingCountries items={features.items} zone={zone} />
                </Transitions>
              }
              {
                zoneId && type === 'internet' &&
                <Transitions>
                  <RoamingInternet zoneId={zoneId} />
                </Transitions>
              }
              {
                zoneId && type === 'zone-tariff' &&
                <Transitions>
                  <RoamingTariffZone id={zoneId} />
                </Transitions>
              }
              {
                countryId && type === 'country-tariff' && zone &&
                <Transitions>
                  <RoamingTariffCountry zone={zone} items={features.items} id={countryId} />
                </Transitions>
              }
            </Transitions>
          </div>
        </div>
      </DocumentMeta>
    );
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
