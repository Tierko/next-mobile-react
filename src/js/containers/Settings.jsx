import React, { Component } from 'react';
import Aside from '../components/Aside';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

class Settings extends Component {
  state = {
    email: '',
    lang: '',
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  onSave = () => {};

  render() {
    const { onSave, onChange } = this;
    const { email, lang } = this.state;

    return (
      <div className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <h1>Настройки</h1>
          <Input name="email" value={email} onChange={onChange} placeholder="Почта" />
          <Button onClick={onSave}>Сохранить изменения</Button>
          <Checkbox />
        </div>
      </div>
    );
  }
}

export default Settings;
