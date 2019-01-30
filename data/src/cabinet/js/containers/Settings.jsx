import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import Input from '../../../common/js/components/Input';
import CheckboxSlide from '../components/CheckboxSlide';
import Notice from '../components/Notice';
import Transitions from '../components/Transitions';
import { TITLES } from '../constants';
import { getProfile, changeProfile, patchProfile } from '../actions/Profile';
import connect from 'react-redux/es/connect/connect';
import * as PropTypes from 'prop-types';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {getProfileSettings} = this.props;
    getProfileSettings();
  }

  onChange = (name, value) => {
    const {setProfileSettings} = this.props;

    setProfileSettings({name, value});

    if (name !== 'email') {
      const formData = new FormData();
      for ( var key in this.props.profile ) {
        formData.append(key, this.props.profile[key]);
      }
      patchProfile(formData);
    }
  };

  render() {
    const { onChange } = this;
    let {
      email,
      send_paychecks
    } = this.props.profile;
    const meta = {
      title: TITLES.SETTINGS,
    };

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile />
        <MobileNav type="dashboard" />
        <Notice />
        <div className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content dashboard__content_white">
              <div className="settings">
                <div className="dashboard__header">Настройки</div>
                <Input className="input_settings-email" name="email" value={email} onChange={onChange} placeholder="Почта" />
                <div className="service">
                  <div className="service__control">
                    <div className="service__name">Квитанции об&nbsp;оплате</div>
                    <CheckboxSlide className="checkbox-slide_settings" value={send_paychecks} name="send_paychecks" onChange={onChange} />
                  </div>
                  <div className="service__desc">После совершения платежа отправлять квитанцию на&nbsp;адрес {email}</div>
                </div>
              </div>
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

Settings.propTypes = {
  getProfileSettings: PropTypes.func.isRequired,
  setProfileSettings: PropTypes.func.isRequired,
  patchProfileSettings: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    profile: state.Profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProfileSettings: () => dispatch(getProfile()),
    setProfileSettings: (profileValue) => dispatch(changeProfile(profileValue)),
    patchProfileSettings: (profile) => dispatch(patchProfile(profile)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
