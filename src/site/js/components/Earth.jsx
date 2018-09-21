import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

class Earth extends Component {
  globe = () => {
    const { earth, cont, d3 } = this;
    const { style } = this.props;
    const context = earth.getContext('2d');
    const width = cont.clientWidth;
    const height = cont.clientHeight;
    const size = d3.min([width, height]);

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

    const drawFeatures = () => {
      const { features } = this;
      context.beginPath();
      geoGenerator({ type: 'FeatureCollection', features });
      context.fill();
    };

    const update = (t) => {
      const { features, defaultAnimation, fastAnimation, center, prevAngles } = this;
      const currentAngles = [-t / 100 % 360, 0];
      context.clearRect(0, 0, width, height);

      if (defaultAnimation && !fastAnimation) {
        projection.rotate(currentAngles);
        this.prevAngles = currentAngles;
      }

      if (!defaultAnimation && fastAnimation) {
        projection.rotate(center);
      }

      context.lineWidth = 1;
      context.fillStyle = style === 'dark' ? '#06145f' : '#eaeaf6';
      drawFeatures(features);

      window.requestAnimationFrame(update);
    };

    fetch('/media/info/map.geo.json', {
      headers: new Headers({
        credentials: 'same-origin',
        method: 'GET',
        'Content-Types': 'text/json',
      }),
    })
      .then(data => data.json())
      .then((data) => {
        this.features = data;

        window.requestAnimationFrame(update);
      });
  };

  setCenter = () => {
    const { country } = this.props;
    const countryCode = country.flag;
    const { features, d3, projection } = this;
    const feature = features.find(l => l.properties.iso_a2 === countryCode);

    if (feature) {
      const center = d3.geoCentroid(feature);
      this.defaultAnimation = false;
      this.fastAnimation = true;
      this.center = [-center[0], -center[1]];
      // projection.rotate([-center[0], -center[1]]);
    }
  };

  onResize = () => {
    const { projection, d3, cont } = this;
    const width = cont.clientWidth;
    const height = cont.clientHeight;
    const size = d3.min([width, height]);

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
    const { setCenter, onResize } = this;
    const { country } = this.props;

    if (!prevProps.country && country) {
      setCenter();
    }

    if (prevProps.country && !country) {
      this.defaultAnimation = true;
      this.fastAnimation = false;
    }

    window.removeEventListener('resize', onResize);
  }

  render() {
    const { style, size } = this.props;
    const { country } = this.props;

    return (
      <div className={`earth earth_${style} earth_${size}`} ref={(e) => { this.cont = e; }} >
        <canvas className="earth__canvas" id="earth" ref={(e) => { this.earth = e; }} />
        <div className={cs('earth__marker', { earth__marker_show: !!country })} />
      </div>
    );
  }
}

Earth.propTypes = {
  style: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  country: PropTypes.shape(),
};

Earth.defaultProps = {
  country: null,
};

export default Earth;
