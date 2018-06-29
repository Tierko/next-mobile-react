import React from 'react';
import PropTypes from 'prop-types';

const RequestStatusDelivery = ({ data }) => (
  <div className="welcome__content request-status request-status_delivery">
    <img className="request-status__sim" src="/media/images/sim.png" alt="" />
    <div className="request-status__header request-status__header_delivery">{data.header}</div>
    {
      data.meta.map(d => (
        <div key={d.id} className="request-status__row">
          <div className="request-status__row-title">{d.title}</div>
          <div className="request-status__row-value">{d.value}</div>
        </div>
      ))
    }
  </div>
);

RequestStatusDelivery.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default RequestStatusDelivery;
