import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Transitions = ({
  children,
  id,
  classNames,
  className,
  timeout,
}) => (
  <TransitionGroup>
    <CSSTransition
      enter
      exit
      appear
      key={id}
      timeout={timeout}
      classNames={classNames}
      className={`${classNames}-init ${className}`}
    >
      <div>{children}</div>
    </CSSTransition>
  </TransitionGroup>
);

Transitions.propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  className: PropTypes.string,
  timeout: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.number,
  ]),
};

Transitions.defaultProps = {
  classNames: 'fade',
  className: '',
  timeout: {
    enter: 200,
    exit: 200,
  },
};

export default Transitions;
