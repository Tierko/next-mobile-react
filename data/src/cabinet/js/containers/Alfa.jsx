import React, { Component } from 'react';
import Button from '../../../common/js/components/Button';
import { Pages } from '../constants';

class Alfa extends Component {
  onConfirm = () => {
    const { history, location: { state } } = this.props;

    history.push({
      pathname: `${Pages.RESULT}/success`,
      state,
    });
  };

  render() {
    const { onConfirm } = this;

    return (
      <div className="alfa">
        <div className="alfa__inner">
          <img src="/media/content/bank.jpg" />
          <Button onClick={onConfirm}>Подтвердить</Button>
        </div>
      </div>
    );
  }
}

export default Alfa;
