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
import Notice from '../components/Notice';
import { Pages, TITLES } from '../constants';
import { dataBuffer } from '../utils';

const mergeDate = dataBuffer();

class Services extends Component {
  state = {
    services: [{
      id: 1,
      name: 'Кто звонил',
      checked: true,
      desc: 'Мы будем присылать СМС о том, кто вам звонил, пока вы были недоступны.',
      price: 'Бесплатно',
      disabled: false,
    }, {
      id: 2,
      name: 'Антиопределитель номера',
      checked: false,
      desc: 'Ваш номер нельзя будет определить при звонке.',
      price: 'Бесплатно',
      disabled: false,
    }],
    currentTariff: (localStorage.getItem('tariff') || 0) * 1 || 37,
  };

  toggleService = (id, value) => {
    const { enableService } = this;
    const services = this.state.services.slice();
    const index = services.findIndex(s => s.id === id);

    if (index !== -1) {
      services[index].checked = value;
      services[index].disabled = true;

      this.setState({
        services,
      });

      enableService(id);
    }
  };

  enableService = (id) => {
    const services = this.state.services.slice();
    const index = services.findIndex(s => s.id === id);

    if (index !== -1) {

      setTimeout(() => {
        services[index].disabled = false;

        this.setState({
          services,
        });
      }, 1500);
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

  render() {
    const {
      services,
      currentTariff,
    } = this.state;
    const {
      toggleService,
      changeTariff,
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
        <Notice />
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content">
              <div className="block">
                <div className="dashboard__header">Тарифы</div>
                <Tariffs current={currentTariff} onChange={changeTariff} />
                <InterCalls data={data} more />
              </div>
              <TariffServices services={services} onChange={toggleService} />
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
