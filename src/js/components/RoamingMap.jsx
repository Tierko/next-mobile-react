import React, { Component } from 'react';
import { Map, GeoJSON } from 'react-leaflet';
import ComboBox from './ComboBox';
import countries from '../../data/countries';

const position = [41.00, -109.05];

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

  mapStyle = (a) => {
    console.log(a)
    return {
      color: '#e6e6f3',
      fillColor: '#fff',
      fillOpacity: 1,
      weight: 2,
    };
  };

  onClick = (e) => {
    console.log(a)
  };

  render() {
    const { onItemSelect, mapStyle, onClick } = this;
    const { country, features } = this.state;

    return (
      <div className="map">
        <ComboBox
          items={countries}
          value={country}
          onSelect={onItemSelect}
          placeholder="В какой стране вам нужен роуминг?"
        />
        <div className="map__container" id="map" ref={(e) => { this.container = e; }}>
          {
            !!features.length &&
            <Map center={position} zoom={1} onclick={onClick}>
              <GeoJSON data={features} style={mapStyle} />
            </Map>
          }
        </div>
      </div>
    );
  }
}

export default RoamingMap;
