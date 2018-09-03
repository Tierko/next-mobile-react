import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Button from '../components/Button';
import Transitions from '../components/Transitions';
import { TITLES } from '../constants';
import { toggleRoaming } from '../actions/Roaming';
import { getData } from '../utils';

class Calls extends Component {
  setData = (type, value) => {
    localStorage.setItem(type, value);
    location.reload();
  };

  reset = () => {
    localStorage.clear();
    location.reload();
  };


  render() {
    const { setData, reset } = this;
    const { state: { Roaming }, roamingSwitch } = this.props;

    return (
      <DocumentMeta title={TITLES.DATA}>
        <MobileNav key="nav" type="dashboard" />
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content">
              <div>
                <h2>Сброс</h2>
                <div>
                  <Button className="button_data" onClick={reset}>Сбросить данные</Button>
                </div>
                <h2>Тариф</h2>
                <div>
                  <Button className="button_data" onClick={() => setData('tariff', 0)} disabled={getData('tariff').id === 1}>
                    Супервип
                  </Button>
                  <Button className="button_data" onClick={() => setData('tariff', 1)} disabled={getData('tariff').id === 2}>
                    Премиум
                  </Button>
                  <Button className="button_data" onClick={() => setData('tariff', 2)} disabled={getData('tariff').id === 3}>
                    Лайт
                  </Button>
                </div>
                <h2>Баланс</h2>
                <div>
                  <Button className="button_data" onClick={() => setData('balance', 0)} disabled={getData('balance') === 500}>
                    500
                  </Button>
                  <Button className="button_data" onClick={() => setData('balance', 1)} disabled={getData('balance') === 5000}>
                    5000
                  </Button>
                  <Button className="button_data" onClick={() => setData('balance', 2)} disabled={getData('balance') === 16.5}>
                    16,5
                  </Button>
                  <Button className="button_data" onClick={() => setData('balance', 3)} disabled={getData('balance') === 0}>
                    0
                  </Button>
                  <Button className="button_data" onClick={() => setData('balance', 4)} disabled={getData('balance') === -100}>
                    &minus;100
                  </Button>
                  <Button className="button_data" onClick={() => setData('balance', 5)} disabled={getData('balance') === -2000}>
                    &minus;2000
                  </Button>
                  <Button className="button_data" onClick={() => setData('balance', 6)} disabled={getData('balance') === -113.5}>
                    &minus;113,5
                  </Button>
                </div>
                <h2>История расходов</h2>
                <div>
                  <Button className="button_data" onClick={() => setData('history', 0)} disabled={getData('history').length === 1}>
                    За 1 месяц
                  </Button>
                  <Button className="button_data" onClick={() => setData('history', 1)} disabled={getData('history').length === 2}>
                    За 2 месяца
                  </Button>
                  <Button className="button_data" onClick={() => setData('history', 2)} disabled={getData('history').length === 0}>
                    Без истории
                  </Button>
                  <Button className="button_data" onClick={() => setData('history', 3)} disabled={getData('history').length === 10}>
                    За 10 месяцев
                  </Button>
                </div>
                <h2>История операций</h2>
                <div>
                  <Button className="button_data" onClick={() => setData('operations', 0)} disabled={getData('operations').length !== 0}>
                    Есть операции
                  </Button>
                  <Button className="button_data" onClick={() => setData('operations', 1)} disabled={getData('operations').length === 0}>
                    Нет операций
                  </Button>
                </div>
                <h2>Через какое время платеж</h2>
                <div>
                  <Button className="button_data" onClick={() => setData('payment', 0)} disabled={getData('payment').days === 15}>
                    Через 15 дней
                  </Button>
                  <Button className="button_data" onClick={() => setData('payment', 1)} disabled={getData('payment').days === 10}>
                    Через 10 дней
                  </Button>
                  <Button className="button_data" onClick={() => setData('payment', 2)} disabled={getData('payment').days === 5}>
                    Через 5 дней
                  </Button>
                </div>
                <h2>Уведомления</h2>
                <div>
                  Синее сообщение
                  <div>
                    <Button className="button_data" onClick={() => setData('noteBlue', 1)} disabled={getData('noteBlue')}>
                      Включить
                    </Button>
                    <Button className="button_data" onClick={() => setData('noteBlue', 0)} disabled={!getData('noteBlue')}>
                      Выключить
                    </Button>
                  </div>
                  Зеленое сообщение
                  <div>
                    <Button className="button_data" onClick={() => setData('noteGreen', 1)} disabled={getData('noteGreen')}>
                      Включить
                    </Button>
                    <Button className="button_data" onClick={() => setData('noteGreen', 0)} disabled={!getData('noteGreen')}>
                      Выключить
                    </Button>
                  </div>
                  Красное сообщение
                  <div>
                    <Button className="button_data" onClick={() => setData('noteRed', 1)} disabled={getData('noteRed')}>
                      Включить
                    </Button>
                    <Button className="button_data" onClick={() => setData('noteRed', 0)} disabled={!getData('noteRed')}>
                      Выключить
                    </Button>
                  </div>
                </div>
                <h2>Остаток по тарифу (трафик, звонки)</h2>
                <div>
                  <Button className="button_data" onClick={() => setData('remain', 0)} disabled={getData('remain')[0].current === 16}>
                    16 ГБ / 700 мин
                  </Button>
                  <Button className="button_data" onClick={() => setData('remain', 1)} disabled={getData('remain')[0].current === 8}>
                    8 ГБ / 538 мин
                  </Button>
                  <Button className="button_data" onClick={() => setData('remain', 2)} disabled={getData('remain')[0].current === 4}>
                    4 ГБ / 243 мин
                  </Button>
                  <Button className="button_data" onClick={() => setData('remain', 3)} disabled={getData('remain')[0].current === 2}>
                    2 ГБ / 7 мин
                  </Button>
                  <Button className="button_data" onClick={() => setData('remain', 4)} disabled={getData('remain')[0].current === 0}>
                    0 ГБ / 0 мин
                  </Button>
                </div>
                <h2>Роуминг</h2>
                <div>
                  <Button className="button_data" onClick={roamingSwitch} disabled={!Roaming.currentZoneId}>
                    Отключить
                  </Button>
                  <Button className="button_data" onClick={roamingSwitch} disabled={Roaming.currentZoneId}>
                    Включить
                  </Button>
                </div>
              </div>
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    roamingSwitch: () => dispatch(toggleRoaming()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calls);
