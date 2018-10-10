import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../common/js/components/Button';

const Intro = ({ to, translate }) => {
  const { text, note, btn } = translate;

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
  translate: PropTypes.shape(),
};

Intro.defaultProps = {
  translate: {},
};

export default Intro;
