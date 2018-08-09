import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, GeoJSON, ZoomControl } from 'react-leaflet';
import ComboBox from './ComboBox';
import { HOME } from '../constants';

class RoamingMap extends Component {
  onClick = (e) => {
    const { onCountrySelect } = this.props;

    onCountrySelect(e.layer.toGeoJSON());
  };

  setStyle = (f) => {
    const { zone: { countries } } = this.props;
    const { featureDefaultStyle, featureSelectZone, featureSelectCountry } = this;
    const { country } = this.props;

    if (
      country.properties &&
      f.properties.iso_a2 === country.properties.iso_a2 &&
      f.properties.iso_a2 !== HOME
    ) {
      return featureSelectCountry();
    }

    if (
      countries &&
      countries.indexOf(f.properties.iso_a2) !== -1 &&
      f.properties.iso_a2 !== HOME
    ) {
      return featureSelectZone();
    }

    return featureDefaultStyle();
  };

  featureSelectCountry = () => ({
    color: '#e6e6f3',
    fillColor: '#5a961a',
    fillOpacity: 1,
    weight: 1,
  });

  featureDefaultStyle = () => ({
    color: '#e6e6f3',
    fillColor: '#fff',
    fillOpacity: 1,
    weight: 1,
  });

  featureSelectZone = () => ({
    color: '#e6e6f3',
    fillColor: '#97da34',
    fillOpacity: 1,
    weight: 1,
  });

  render() {
    const { onClick, setStyle } = this;
    const {
      zone: { center, zoom, title },
      features,
      country,
      onCountrySelect,
    } = this.props;

    return (
      <div className="map">
        <div className="map__container" id="map">
          {
            !!features.length &&
            <Map center={country.center || center} zoom={zoom} zoomControl={false} animate>
              <GeoJSON
                data={features}
                style={setStyle}
                onclick={onClick}
              />
              <ZoomControl position="bottomright" />
            </Map>
          }
        </div>
        <ComboBox
          items={features}
          value={country}
          onSelect={onCountrySelect}
          placeholder="В какой стране вам нужен роуминг?"
          zoneName={title}
        />
      </div>
    );
  }
}

RoamingMap.propTypes = {
  zone: PropTypes.shape().isRequired,
  features: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  country: PropTypes.shape().isRequired,
  onCountrySelect: PropTypes.func.isRequired,
};

export default RoamingMap;
