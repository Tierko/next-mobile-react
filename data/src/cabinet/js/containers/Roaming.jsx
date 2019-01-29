import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import cs from 'classnames';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import RoamingMap from '../components/RoamingMap';
import TabsRoaming from '../components/TabsRoaming';
import RoamingZone from '../components/RoamingZone';
import RoamingCountries from '../components/RoamingCountries';
import RoamingInternet from '../components/RoamingInternet';
import RoamingTariffZone from '../components/RoamingTariffZone';
import RoamingTariffCountry from '../components/RoamingTariffCountry';
import Transitions from '../components/Transitions';
import Notice from '../components/Notice';
import { Pages, TITLES } from '../constants';

class Roaming extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params: { zoneId } },
    } = this.props;

    this.state = {
      tab: zoneId * 1 || 1,
      country: {},
    };
  }

  componentDidUpdate({ match: { params: { countryId: prevCountryId } } }) {
    const { match: { params: { countryId } } } = this.props;

    if (prevCountryId && prevCountryId !== countryId) {
      this.render();
    }
  }

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
    const { getZoneByCountry } = this;
    const zone = getZoneByCountry(roamingZones, country);

    if (!country.properties || country.properties.code !== 'RU') {
      this.setState({
        tab: zone || tab,
        country,
      });

      history.push(Pages.ROAMING);
    }
  };

  getZoneByCountry = (zones, country) => {
    if (!country.properties) {
      return 0;
    }

    const zone = zones.items.find(z => z.countries.indexOf(country.properties.code) !== -1);

    if (!zone) {
      return 0;
    }

    return zone.id;
  };

  getCurrentZone = () => {
    const { tab } = this.state;
    const { zones } = this.props.data;

    return zones.items.find(z => z.id === tab) || {};
  };

  render() {
    const {
      onTabChange,
      getCurrentZone,
      onCountrySelect,
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
    const zones = roamingZones.items;
    const zone = roamingZones.items.find(z => z.id === zoneId * 1);
    const meta = {
      title: TITLES.ROAMING,
    };
    const featuresSorted = features.items.slice().sort((a, b) => {
      if (a.properties.name.ru > b.properties.name.ru) {
        return 1;
      }

      if (a.properties.name.ru < b.properties.name.ru) {
        return -1;
      }

      return 0;
    });
    const currentZone = getCurrentZone();

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile
          showRoamingSearch
          zone={currentZone}
          features={featuresSorted}
          onCountrySelect={onCountrySelect}
          country={country}
        />
        <MobileNav key="nav" type="dashboard" hideSpot />
        <Notice />
        <div key="dashboard" className="dashboard">
          <Aside />
          <div className="dashboard__content dashboard__content_white dashboard__content_roaming">
            <Transitions>
              <RoamingMap
                zone={currentZone}
                features={featuresSorted}
                country={country}
                countryId={countryId}
                onCountrySelect={onCountrySelect}
              />
              {
                !type &&
                <Transitions>
                  <div className="roaming roaming_zones">
                    <TabsRoaming
                      tabs={zones}
                      active={tab}
                      onTabChange={onTabChange}
                      disable={!!country.properties}
                      className={cs({
                        'tabs_mobile-hide': !!country.properties,
                      })}
                    />
                    {
                      !!country.properties && currentZone &&
                      <div className="roaming__title-instead-tabs">Роуминг в {currentZone.title}</div>
                    }
                    {
                      zones && zones.map(z => (
                        <RoamingZone
                          key={z.id}
                          data={z}
                          active={tab}
                          history={history}
                          features={featuresSorted}
                          zones={zones}
                          country={country}
                        />
                      ))
                    }
                  </div>
                </Transitions>
              }
              {
                zone && type === 'countries' &&
                <Transitions>
                  <RoamingCountries items={featuresSorted} zone={zone} />
                </Transitions>
              }
              {
                zoneId && type === 'internet' &&
                <Transitions>
                  <RoamingInternet zoneId={zoneId} />
                </Transitions>
              }
              {
                zone && type === 'zone-tariff' &&
                <Transitions>
                  <RoamingTariffZone zone={zone} />
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
