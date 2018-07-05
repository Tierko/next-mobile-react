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
            <h2>Тариф</h2>
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
            <h2>Баланс</h2>
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
            <h2>История расходов</h2>
            <div style={{ display: 'flex' }}>
              <Button onClick={() => setData('history', 0)}>
                за 2 месяца
              </Button>
              <Button onClick={() => setData('history', 1)}>
                Без истории
              </Button>
            </div>
            <h2>История операций</h2>
            <div style={{ display: 'flex' }}>
              <Button onClick={() => setData('operations', 0)}>
                Есть операции
              </Button>
              <Button onClick={() => setData('operations', 1)}>
                Нет операций
              </Button>
            </div>
          </div>
        </div>
      </div>,
    ]);
  }
}

export default Calls;
