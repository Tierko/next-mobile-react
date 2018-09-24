import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const RequestStatusDelivery = ({ data }) => (
  <div className="welcome__content request-status request-status_delivery">
    <img
      className={cs('request-status__img', { 'request-status__img_round': !!data.text })}
      src={data.img}
      alt=""
    />
    <div className="request-status__header request-status__header_delivery">{data.header}</div>
    {
      data.text &&
      <div className="request-status__text">
        {data.text}
      </div>
    }
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
