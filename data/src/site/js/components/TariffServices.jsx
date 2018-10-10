import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TariffServices extends Component {
  state = {
    services: [],
  };

  componentDidMount() {
    fetch('/api/v1/', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify({
        action: 'services.getList',
        lang: 'ru',
      }),
    })
      .then(data => data.json())
      .then(services => this.setState({
        services,
      }));
  }

  render() {
    const { services } = this.state;
    const { header } = this.props.translate;

    if (!services.length || !header) {
      return false;
    }

    return (
      <div className="tariff-services">
        <div className="tariff-services__header">{header}</div>
        {
          services.map(s => (
            <div className="tariff-services__row" key={s.id}>
              <div className="tariff-services__title" dangerouslySetInnerHTML={{ __html: s.name }} />
              <div className="tariff-services__text" dangerouslySetInnerHTML={{ __html: s.text }} />
              <div className="tariff-services__text" dangerouslySetInnerHTML={{ __html: s.price }} />
            </div>
          ))
        }
      </div>
    );
  }
}

TariffServices.propTypes = {
  translate: PropTypes.shape(),
};

TariffServices.defaultProps = {
  translate: {},
};

export default TariffServices;
