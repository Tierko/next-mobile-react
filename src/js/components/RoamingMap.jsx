import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, GeoJSON, ZoomControl } from 'react-leaflet';
import ComboBox from './ComboBox';
import countries from '../../data/countries';

class RoamingMap extends Component {
  state = {
    country: {},
    features: [],
  };

  onItemSelect = (country) => {
    this.setState({
      country,
    });
  };

  componentDidMount() {
    fetch('/data/map.geo.json', {
      headers: new Headers({
        'Content-Types': 'text/json',
      }),
    })
      .then(data => data.json())
      .then(data => this.setState({
        features: data.features,
      }));
  }

  mapStyle = () => ({
    color: '#e6e6f3',
    fillColor: '#fff',
    fillOpacity: 1,
    weight: 2,
  });

  onClick = () => {};

  render() {
    const { onItemSelect, mapStyle, onClick } = this;
    const { country, features } = this.state;
    const { zone: { center, zoom } } = this.props;

    return (
      <div className="map">
        <div className="map__container" id="map">
          {
            !!features.length &&
            <Map center={center} zoom={zoom} onclick={onClick} zoomControl={false} animate>
              <GeoJSON data={features} style={mapStyle} />
              <ZoomControl position="bottomright" />
            </Map>
          }
        </div>
        <ComboBox
          items={countries}
          value={country}
          onSelect={onItemSelect}
          placeholder="В какой стране вам нужен роуминг?"
        />
      </div>
    );
  }
}

RoamingMap.propTypes = {
  zone: PropTypes.shape().isRequired,
};

export default RoamingMap;
