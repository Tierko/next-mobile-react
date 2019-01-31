import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import cs from 'classnames';

import MobileNav from '~/common/js/components/MobileNav';
import Input from '~/common/js/components/Input';
import Button from '~/common/js/components/Button';
import { TITLES } from '~/common/js/constants';
import HeaderMobile from '@cabinet/components/HeaderMobile';
import Aside from '@cabinet/components/Aside';
import InputRuble from '@cabinet/components/InputRuble';
import CheckboxSlide from '@cabinet/components/CheckboxSlide';
import Select from '@cabinet/components/SelectLang';
import Note from '@cabinet/components/Note';
import Transitions from '@cabinet/components/Transitions';
import Notice from '@cabinet/components/Notice';
import PropTypes from 'prop-types';
import {debounce} from 'throttle-debounce';


class Settings extends Component {
  state = {
    isEdited: false,
    showNote: false,
  };

  componentDidMount() {
    this.props.pageSettingsActions.createProfileForm();
  }

  onSave = () => {
    this.props.profileFormActions.submit()
      .then(() => {
        this.setState({
          isEdited: false,
          showNote: true,
        });
      });
  };

  onChange = (name, value) => {
    this.props.profileFormActions.resetErrors();
    this.props.profileFormActions.changeField(name, value);

    this.setState({ isEdited: true });

    const { error } = this.props;
    const isValid = !error.email
    const canBeSave = isValid;
    const { onSave } = this;

    if (canBeSave) {
      debounce(1000, onSave)();
    }
  };

  setCash = value => () => {
    const { spendingsNotification } = this.props.profileForm;

    if (spendingsNotification) {
      this.onChange('spendingsAmount', value);
    }
  };

  onNoteFade = () => {
    this.setState({
      showNote: false,
    });
  };

  constructor(props) {
    super(props);
  }

  state = {
    emailValidation: true
  };

  render() {
    const {
      onSave,
      onChange,
      onLangSelect,
      onNoteFade,
    } = this;

    const {
      isEdited,
      showNote,
    } = this.state;

    const meta = {
      title: TITLES.SETTINGS,
    };

    if (!this.props.profileForm) {
      return null;
    }

    const { error, profileForm } = this.props;

    const isValid = !error.email && (!profileForm.spendingsNotification || !error.spendingsAmount)

    const {
      email,
      sendPaychecks,
      spendingsNotification,
      spendingsAmount,
    } = profileForm;

    const canBeSave = isEdited && isValid;

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile />
        <MobileNav type="dashboard" />
        {/*<Notice />*/}
        <div className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content dashboard__content_white">
              <div className="settings">
                <div className="dashboard__header">Настройки</div>
                <Input className="input_settings-email" name="email" value={email} onChange={onChange} placeholder="Почта" errorText={error && error.email} />
                <div className="service">
                  <div className="service__control">
                    <div className="service__name">Квитанции об&nbsp;оплате</div>
                    <CheckboxSlide className="checkbox-slide_settings" value={sendPaychecks} name="sendPaychecks" onChange={onChange} />
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
  profileForm: PropTypes.shape().isRequired,
  profileFormActions: PropTypes.shape().isRequired,
  error: PropTypes.shape().isRequired,
  pageSettingsActions: PropTypes.shape().isRequired,
};

export default Settings;
