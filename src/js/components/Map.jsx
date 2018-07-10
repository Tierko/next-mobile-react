import React, { Component } from 'react';
import OM from 'ol/Map';
import View from 'ol/View';
import { Tile, VectorTile } from 'ol/layer';
import { OSM, TileJSON, Vector } from 'ol/source';
import {Fill, Stroke, Style} from 'ol/style';
import MVT from 'ol/format/MVT.js';

import ComboBox from './ComboBox';
import countries from '../../data/countries';

class Map extends Component {
  state = {
    country: {},
  };

  onItemSelect = (country) => {
    this.setState({
      country,
    });
  };
  // componentDidMount() {
  //   this.map = new OM({
  //     layers: [
  //       // new Tile({
  //       //   source: new OSM(),
  //       // }),
  //       new VectorTile({
  //         source: new TileJSON({
  //           url: 'https://maps.tilehosting.com/data/v3.json?key=9q6ehrA5R6LCrV2LF0ZR'
  //         }),
  //         style: new Style({
  //           fill: new Fill(),
  //           stroke: new Stroke({
  //             color: '#333',
  //             width: 2
  //           })
  //         })
  //       }),
  //     ],
  //     target: this.container,
  //     view: new View({
  //       center: [0, 0],
  //       zoom: 3,
  //     }),
  //   });
  // }

  render() {
    const { onItemSelect } = this;
    const { country } = this.state;

    return (
      <div className="map">
        <ComboBox
          items={countries}
          value={country}
          onSelect={onItemSelect}
          placeholder="В какой стране вам нужен роуминг?"
        />
        <div className="map__container" id="map" ref={(e) => { this.container = e; }}>

        </div>
      </div>
    );
  }
}

export default Map;
