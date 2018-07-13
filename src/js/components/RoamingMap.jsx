import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, GeoJSON, ZoomControl } from 'react-leaflet';
import ComboBox from './ComboBox';

class RoamingMap extends Component {
  state = {
    country: {},
  };

  onItemSelect = (country) => {
    this.setState({
      country,
    });
  };

  featureDefaultStyle = (f) => {
    
    return {
      color: '#e6e6f3',
      fillColor: '#fff',
      fillOpacity: 1,
      weight: 2,
    }
  };

  featureSelectStyle = () => ({
    color: '#e6e6f3',
    fillColor: '#97da34',
    fillOpacity: 1,
    weight: 2,
  });

  onClick = (e, a) => {
    e.layer.setStyle(this.featureSelectStyle())
    console.log(e.layer)
  };

  onEachFuture =(f) => {
    const { iso_a2 } = f.properties;
    const { countries } = this.props.zone;

    if (countries.indexOf(iso_a2) !== -1) {
    }
    f.style = this.featureSelectStyle()();

    // console.log(f)

    return f;
  };

  render() {
    const { onItemSelect, featureDefaultStyle, onClick, onEachFuture } = this;
    const { country } = this.state;
    const { zone: { center, zoom }, features } = this.props;

    return (
      <div className="map">
        <div className="map__container" id="map">
          {
            !!features.length &&
            <Map center={center} zoom={zoom} zoomControl={false} animate>
              <GeoJSON
                data={features}
                style={featureDefaultStyle}
                onEachFeature={onEachFuture}
                onclick={onClick}
              />
              <ZoomControl position="bottomright" />
            </Map>
          }
        </div>
        <ComboBox
          items={features}
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
  features: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RoamingMap;
