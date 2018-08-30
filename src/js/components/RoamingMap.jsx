import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, GeoJSON } from 'react-leaflet';
import cs from 'classnames';
import ComboBox from './ComboBox';
import Loader from './Loader';
import { HOME } from '../constants';
import { mapNumbers } from '../utils';

class RoamingMap extends Component {
  state = {
    zoomInDisabled: false,
    zoomOutDisabled: false,
    maxZoom: 5,
    minZoom: 0.3,
  };

  onClick = (e) => {
    const { onCountrySelect } = this.props;
    const { map } = this;


    onCountrySelect(e.layer.toGeoJSON());
    map.leafletElement.fitBounds(e.layer.getBounds(), { maxZoom: 5 });
  };

  setStyle = (f) => {
    const { zone: { countries }, countryId } = this.props;
    const { featureDefaultStyle, featureSelectZone, featureSelectCountry } = this;
    const { country } = this.props;

    if (countryId && f.properties.iso_a2 === countryId) {
      return featureSelectCountry();
    }

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
    color: '#E3E3EC',
    fillColor: '#5a961a',
    fillOpacity: 1,
    weight: 0.5,
  });

  featureDefaultStyle = () => ({
    color: '#E3E3EC',
    fillColor: 'rgba(255, 255, 255, 0.65)',
    fillOpacity: 1,
    weight: 0.5,
  });

  featureSelectZone = () => ({
    color: '#E3E3EC',
    fillColor: '#97da34',
    fillOpacity: 1,
    weight: 0.5,
  });

  zoomIn = () => {
    const { map, getCurrentZoom } = this;
    const { maxZoom } = this.state;
    const currentZoom = getCurrentZoom();

    this.setState({
      zoomInDisabled: currentZoom !== -1 && currentZoom >= maxZoom,
    });

    map.leafletElement.zoomIn();
  };

  zoomOut = () => {
    const { map } = this;

    map.leafletElement.zoomOut();
  };

  onZoomLevelsChange = () => {
    const { getCurrentZoom } = this;
    const { minZoom, maxZoom } = this.state;
    const currentZoom = getCurrentZoom();

    if (currentZoom !== -1) {
      this.setState({
        zoomInDisabled: currentZoom >= maxZoom,
        zoomOutDisabled: currentZoom <= minZoom,
      });
    }
  };

  getCurrentZoom = () => {
    const { map } = this;

    if (map) {
      return map.leafletElement._zoom;
    }

    return -1;
  };

  getMinZoom = () => {
    const map = document.getElementById('map');
    let width = 0;

    if (map) {
      width = map.clientWidth;
    }

    if (width > 1200) {
      width = 1200;
    }

    if (width < 320) {
      width = 320;
    }

    return mapNumbers(width, 320, 1200, 0.3, 1.4);
  };

  fitCountry = (e) => {
    const { countryId } = this.props;
    const { map } = this;
    const geoJSON = e && e.layer.toGeoJSON && e.layer.toGeoJSON();


    if (map && countryId && geoJSON && geoJSON.properties) {
      if (geoJSON.properties.iso_a2 === countryId) {
        map.leafletElement.fitBounds(e.layer.getBounds(), { maxZoom: 5 });
      }
    }
  };

  render() {
    const {
      onClick,
      setStyle,
      zoomIn,
      zoomOut,
      onZoomLevelsChange,
      getMinZoom,
    } = this;
    const {
      zone,
      zone: { zoom, title },
      features,
      country,
      onCountrySelect,
    } = this.props;
    const {
      zoomInDisabled,
      zoomOutDisabled,
      maxZoom,
    } = this.state;
    const center = country.properties ? undefined : zone.center;

    return (
      <div className="map">
        <div className="map__container" id="map">
          {
            !features.length &&
            <Loader className="loader_map" />
          }
          {
            !!features.length &&
            <Map
              center={center}
              zoom={0}
              zoomControl={false}
              zoomAnimation
              zoomAnimationThreshold={5}
              animate
              minZoom={getMinZoom()}
              maxZoom={maxZoom}
              ref={(e) => { this.map = e; }}
              onzoom={onZoomLevelsChange}
              onlayeradd={this.fitCountry}
            >
              <GeoJSON
                data={features}
                style={setStyle}
                onclick={onClick}
              />
            </Map>
          }
          <div className="map__controls">
            <div
              className={cs('map__button map__button_plus', {
                map__button_disabled: zoomInDisabled,
              })}
              onClick={zoomIn}
            />
            <div className="map__span" />
            <div
              className={cs('map__button map__button_minus', {
                map__button_disabled: zoomOutDisabled,
              })}
              onClick={zoomOut}
            />
          </div>
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
  countryId: PropTypes.string,
};

RoamingMap.defaultProps = {
  countryId: '',
};

export default RoamingMap;
