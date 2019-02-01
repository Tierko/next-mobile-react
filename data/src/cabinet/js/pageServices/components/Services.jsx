import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentMeta from 'react-document-meta';

import MobileNav from '~/common/js/components/MobileNav';
import Tariffs from '~/common/js/components/Tariffs';
import InterCalls from '~/common/js/components/InterCalls';
import Button from '~/common/js/components/Button';

import HeaderMobile from '@cabinet/components/HeaderMobile';
import Aside from '@cabinet/components/Aside';
import Transitions from '@cabinet/components/Transitions';
import Note from '@cabinet/components/Note';

import TariffServices from './TariffServices';

import { Pages, TITLES } from '~/common/js/constants';
import { dataBuffer } from '@cabinet/utils';
import { debounce } from 'throttle-debounce';

const mergeDate = dataBuffer();

class Services extends Component {
  state = {
    unsaved: false,
    showNote: false,
  };

  toggleService = (id, value) => {
    this.setState((currentState) => ({
      unsaved: {
        ...currentState.unsaved,
        [id]: value,
      },
    }));

    debounce(1000, onSave)();
  };

  changeTariff = (tariff) => {
    const {
      history,
      dashboard,
      pageServicesActions,
    } = this.props;

    // Find monthly payment
    const payment = tariff.parameters.find(param => param.type === 3)

    const currentBalance = (dashboard.dashboard.balance || '0').replace(',', '.')
    const currentPayment = (payment.value || '0').replace(',', '.')
    if (+currentPayment > +currentBalance) {
      history.push({
        pathname: Pages.PAY,
        state: {
          tariff,
        },
      });
    } else {
      pageServicesActions.changeTariff(tariff.code)
    }
  };

  onSave = () => {
    const {
      pageServicesActions,
    } = this.props

    pageServicesActions.saveToogledServices(this.state.unsaved).then(() => {
      this.setState({
        unsaved: false,
        showNote: true,
      });
    })

  };

  onNoteFade = () => {
    this.setState({
      showNote: false,
    });
  };

  render() {
    const {
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
    const {
      interCalls,

      productsInfo,
      roamingCountriesEntities,
    } = this.props;

    let currentTariff = productsInfo.tariffs.find(t => t.active)
    let currentRoamingCountries = []
    if (currentTariff) {
      currentTariff = currentTariff.id
      currentRoamingCountries = roamingCountriesEntities.getById(currentTariff).data
    }

    // Apply local service toggling, so we can later save it
    let currentServices = productsInfo.services
    if (unsaved) {
      currentServices = currentServices.map(service => ({
        ...service,
        active: unsaved[service.id] === undefined ? service.active : unsaved[service.id],
      }))
    }

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile />
        <MobileNav key="nav" type="dashboard" />
        {/*<Notice />*/}
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content">
              <div className="block">
                <div className="dashboard__header">Тарифы</div>
                <Tariffs current={currentTariff} onChange={changeTariff} data={productsInfo.tariffs} />
                <InterCalls data={currentRoamingCountries} more />
              </div>
              <TariffServices services={currentServices} onChange={toggleService} />
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

Services.propTypes = {
  history: PropTypes.shape().isRequired,

  interCalls: PropTypes.shape().isRequired,

  productsInfo: PropTypes.shape().isRequired,
  roamingCountriesEntities: PropTypes.shape().isRequired,

  pageServicesActions: PropTypes.shape().isRequired,
};

export default Services
