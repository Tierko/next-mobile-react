import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/js/components/Button';

const Intro = ({ to, data }) => (
  <div className="intro">
    <div className="intro__text" dangerouslySetInnerHTML={{ __html: data.intro_text }} />
    <div className="intro__note" dangerouslySetInnerHTML={{ __html: data.intro_note }} />
    <Button className="button_light" onClick={to}>
      <div dangerouslySetInnerHTML={{ __html: data.intro_btn }} />
    </Button>
  </div>
);

Intro.propTypes = {
  to: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired,
};

export default Intro;
