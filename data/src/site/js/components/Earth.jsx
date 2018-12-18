import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

class Earth extends Component {
  globe = () => {
    if (this.running) {
      return;
    }
    const { earth, cont, d3 } = this;
    const { style } = this.props;
    const context = earth && earth.getContext('2d');
    const width = cont && cont.clientWidth;
    const height = cont && cont.clientHeight;
    const size = cont && d3.min([width, height]);
    let { features } = this.props;

    this.running = true;

    features = features.map((f) => {
      const excludes = ['MARTINIKA', 'REYUNYON', 'BQ-BO', 'GP', 'MAYOTTE'];

      if (excludes.indexOf(f.properties.code) !== -1) {
        f.geometry.type = 'MultiPolygon';
      }

      return f;
    });

    features = features.filter(f => f.geometry);

    if (!context || !cont) {
      return;
    }

    d3.select('#earth')
      .attr('width', `${width}px`)
      .attr('height', `${height}px`);

    const projection = d3.geoOrthographic()
      .clipAngle(90)
      .scale(0.5 * size)
      .translate([0.5 * width, 0.5 * height]);

    const geoGenerator = d3.geoPath()
      .projection(projection)
      .context(context);

    this.projection = projection;

    const drawFeatures = (fts) => {
      context.beginPath();
      geoGenerator({ type: 'FeatureCollection', features: fts });
      context.fill();
    };

    const update = (t) => {
      const { defaultAnimation, fastAnimation, center } = this;
      const currentAngles = [-t / 100 % 360, 0];
      context.clearRect(0, 0, width, height);

      if (defaultAnimation && !fastAnimation) {
        projection.rotate(currentAngles);
      }

      if (!defaultAnimation && fastAnimation) {
        projection.rotate(center);
      }

      context.lineWidth = 1;
      context.fillStyle = style === 'dark' ? '#06145f' : '#eaeaf6';

      drawFeatures(features);

      setTimeout(() => {
        window.requestAnimationFrame(update);
      }, 25);
    };

    window.requestAnimationFrame(update);
  };

  setCenter = () => {
    const { country, features } = this.props;
    const countryCode = country.code;
    const { d3 } = this;
    const feature = features.find(l => l.properties.code === countryCode);

    if (feature && feature.geometry) {
      const center = d3.geoCentroid(feature);
      const firstCoords = feature.geometry.coordinates[0][0];

      this.defaultAnimation = false;
      this.fastAnimation = true;

      this.center = [-center[0] || -firstCoords[0], -center[1] || -firstCoords[1]];
    }
  };

  onResize = () => {
    const { projection, d3, cont } = this;
    const width = cont && cont.clientWidth;
    const height = cont && cont.clientHeight;
    const size = cont && d3.min([width, height]);

    if (!cont) {
      return;
    }

    d3.select('#earth')
      .attr('width', `${width}px`)
      .attr('height', `${height}px`);

    projection.clipAngle(90)
      .scale(0.5 * size)
      .translate([0.5 * width, 0.5 * height]);
  };

  componentDidMount() {
    const { globe, onResize } = this;
    this.defaultAnimation = true;

    require.ensure(['d3'], (require) => {
      this.d3 = require('d3');

      globe();
    });

    window.addEventListener('resize', onResize);
  }

  componentDidUpdate(prevProps) {
    const { setCenter } = this;
    const { country } = this.props;

    if (prevProps.country.code !== country.code) {
      setCenter();
    }

    if (prevProps.country.code && !country.code) {
      this.defaultAnimation = true;
      this.fastAnimation = false;
    }

  }

  componentWillUnmount() {
    const { onResize } = this;

    window.removeEventListener('resize', onResize);
  }

  render() {
    const { style, size } = this.props;
    const { country } = this.props;

    return (
      <div className={`earth earth_${style} earth_${size}`} ref={(e) => { this.cont = e; }} >
        <canvas className="earth__canvas" id="earth" ref={(e) => { this.earth = e; }} />
        <div className={cs('earth__marker', { earth__marker_show: !!country.code && country.code !== 'GLNE' })} />
      </div>
    );
  }
}

Earth.propTypes = {
  style: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  country: PropTypes.shape(),
  features: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

Earth.defaultProps = {
  country: null,
};

export default Earth;
