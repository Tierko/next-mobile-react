import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/js/components/Button';

const Intro = ({ to, data }) => {
  const { text, note, btn } = data;

  if (!text || !note || !btn) {
    return false;
  }

  return (
    <div className="intro">
      <div className="intro__text" dangerouslySetInnerHTML={{ __html: text }} />
      <div className="intro__note" dangerouslySetInnerHTML={{ __html: note }} />
      <Button className="button_light" onClick={to}>
        <div dangerouslySetInnerHTML={{ __html: btn }} />
      </Button>
    </div>
  );
};

Intro.propTypes = {
  to: PropTypes.func.isRequired,
  data: PropTypes.shape(),
};

Intro.defaultProps = {
  data: {},
};

export default Intro;
