import React, { Component } from 'react';
import Button from '../../../common/js/components/Button';

class Intro extends Component {
  go = () => {

  };

  render() {
    const { go } = this;
    return (
      <div className="intro">
        <div className="intro__text">Next выходит за&nbsp;рамки обычного оператора</div>
        <div className="intro__note">Общайтесь без ограничения зоны покрытия дома и&nbsp;в&nbsp;роуминге</div>
        <Button onClick={go}>Перейти на Next</Button>
      </div>
    );
  }
}

export default Intro;
