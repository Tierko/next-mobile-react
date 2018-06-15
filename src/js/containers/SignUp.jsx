import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavLobby from '../components/NavLobby';
import SignUpInit from '../components/SignUpInit';
import SingUpStep1 from '../components/SignUpStep1';

class SignUp extends Component {

  render() {
    const { history, match: { params: { step } } } = this.props;
    console.log(step)

    return (
      <div className="sign-up">
        <NavLobby />
        {
          !step &&
          <SignUpInit history={history} />
        }
        {
          step === '1' &&
          <SingUpStep1 history={history} />
        }
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default SignUp;
