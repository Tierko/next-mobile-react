import React, { Component } from 'react';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Button from '../components/Button';

class Calls extends Component {
  setData = (type, value) => {
    localStorage.setItem(type, value);
    location.reload();
  };

  render() {
    const { setData } = this;
    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <div className="dashboard__content">
          <div>
            <div>Тариф</div>
            <div style={{ display: 'flex' }}>
              <Button onClick={() => setData('tariff', 0)}>
                Супервип
              </Button>
              <Button onClick={() => setData('tariff', 1)}>
                Премиум
              </Button>
              <Button onClick={() => setData('tariff', 2)}>
                Лайт
              </Button>
            </div>
            <div>Баланс</div>
            <div style={{ display: 'flex' }}>
              <Button onClick={() => setData('balance', 0)}>
                500
              </Button>
              <Button onClick={() => setData('balance', 1)}>
                5000
              </Button>
              <Button onClick={() => setData('balance', 2)}>
                0
              </Button>
            </div>
          </div>
        </div>
      </div>,
    ]);
  }
}

export default Calls;
