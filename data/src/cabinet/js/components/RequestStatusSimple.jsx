import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Logo from './Logo';
import Button from '../../../common/js/components/Button';

const handler = (action, history) => {
  if (action.type === 'link') {
    history.push(action.value);
  }
};

const RequestStatusSimple = ({
  header,
  message,
  color,
  action,
  history,
}) => (
  <div className="welcome__content request-status">
    <Logo type={color} />
    <div className={`request-status__header request-status__header_${color}`}>{header}</div>
    <div className="request-status__message">{message}</div>
    {
      action &&
      <div className="request-status__action">
        <Button
          className="button_request-action"
          onClick={() => handler(action, history)}
          primary
        >
          {action.title}
        </Button>
      </div>
    }
  </div>
);

RequestStatusSimple.propTypes = {
  header: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  action: PropTypes.shape(),
};

RequestStatusSimple.defaultProps = {
  action: null,
};

export default withRouter(RequestStatusSimple);
