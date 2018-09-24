import React from 'react';
import PropTypes from 'prop-types';

const Best = ({ className }) => (
  <div className={`best ${className}`}>
    <div className="best__header">Берем лучшее от&nbsp;других операторов</div>
    <div className="best__text">Связь одного оператора может прерываться. Но&nbsp;наша система выберет ту&nbsp;сеть, которая работает в&nbsp;данном месте лучше всего и&nbsp;переключит на&nbsp;нее</div>
  </div>
);

Best.propTypes = {
  className: PropTypes.string,
};

Best.defaultProps = {
  className: '',
};

export default Best;
