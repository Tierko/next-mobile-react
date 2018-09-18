import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/js/components/Button';

const Intro = ({ to }) => (
  <div className="intro">
    <div className="intro__text">Next выходит за&nbsp;рамки обычного оператора</div>
    <div className="intro__note">Общайтесь без ограничения зоны покрытия дома и&nbsp;в&nbsp;роуминге</div>
    <Button className="button_light" onClick={to}>Перейти на Next</Button>
  </div>
);

Intro.propTypes = {
  to: PropTypes.func.isRequired,
};

export default Intro;
