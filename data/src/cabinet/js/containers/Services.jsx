import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import TariffServices from '../components/TariffServices';
import Tariffs from '../../../common/js/components/Tariffs';
import InterCalls from '../../../common/js/components/InterCalls';
import Transitions from '../components/Transitions';
import Button from '../../../common/js/components/Button';
import Note from '../components/Note';
import { Pages, TITLES } from '../constants';
import { dataBuffer } from '../utils';

const mergeDate = dataBuffer();

class Services extends Component {
  state = {
    unsaved: false,
    showNote: false,
    services: [{
      id: 1,
      name: 'Кто звонил',
      checked: true,
      desc: 'Мы будем присылать СМС о том, кто вам звонил, пока вы были недоступны.',
      price: 'Бесплатно',
    }, {
      id: 2,
      name: 'Антиопределитель номера',
      checked: false,
      desc: 'Ваш номер нельзя будет определить при звонке.',
      price: 'Бесплатно',
    }],
    currentTariff: (localStorage.getItem('tariff') || 0) * 1 || 37,
  };

  toggleService = (id, value) => {
    const { services } = this.state;
    const index = services.slice().findIndex(s => s.id === id);

    if (index !== -1) {
      services[index].checked = value;

      this.setState({
        services,
        unsaved: true,
      });
    }
  };

  changeTariff = (tariff) => {
    const { history } = this.props;

    this.setState({
      currentTariff: tariff.id,
    });

    history.push({
      pathname: Pages.PAY,
      state: {
        tariff,
      },
    });

    localStorage.setItem('tariff', tariff.id);
  };

  onSave = () => {
    this.setState({
      unsaved: false,
      showNote: true,
    });
  };

  onNoteFade = () => {
    this.setState({
      showNote: false,
    });
  };

  render() {
    const {
      services,
      currentTariff,
      showNote,
      unsaved,
    } = this.state;
    const {
      toggleService,
      changeTariff,
      onSave,
      onNoteFade,
    } = this;
    const meta = {
      title: TITLES.SERVICES,
    };
    const { countries, interCalls } = this.props;
    const data = mergeDate(countries, interCalls.data);

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile />
        <MobileNav key="nav" type="dashboard" />
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content">
              <div className="block">
                <div className="dashboard__header">Тарифы</div>
                <Tariffs current={currentTariff} onChange={changeTariff} />
                <InterCalls data={data} more />
              </div>
              <div className="block">
                <TariffServices services={services} onChange={toggleService} />
                <Button className="button_services" onClick={onSave} disabled={!unsaved}>
                  Сохранить
                </Button>
                <Note
                  className="note_services"
                  message="Настройки сохранены"
                  color="green"
                  onFadeOut={onNoteFade}
                  show={showNote}
                />
              </div>
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

Services.propTypes = {
  history: PropTypes.shape().isRequired,
  countries: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  interCalls: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  return {
    countries: state.Roaming.features.items,
    interCalls: state.InterCalls,
  };
}

export default connect(mapStateToProps)(Services);
