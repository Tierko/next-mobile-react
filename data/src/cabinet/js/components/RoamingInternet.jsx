import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Breadcrumbs from './Breadcrumbs';
import ProgressLinear from './ProgressLinear';
import Package from './Package';
import { Pages, DAYS } from '../constants';
import { convertStrings, getData } from '../utils';
import { getRoamingInternetAction } from '../actions/Roaming';

class RoamingInternet extends Component {
  componentDidMount() {
    const { getRoamingInternet } = this.props;

    getRoamingInternet();
  }

  render() {
    const { roaming: { zones, internet }, zoneId } = this.props;
    const zone = zones.items.find(z => z.id === zoneId * 1);

    if (!zone) {
      return false;
    }

    return (
      <div className="roaming">
        <div className="roaming__title">
          <Breadcrumbs
            items={[
              { title: 'Роуминг', link: Pages.ROAMING },
              { title: zone.name, link: `${Pages.ROAMING}/${zone.id}` },
            ]}
          />
          Интернет в {zone.title.toLowerCase()}
        </div>
        {
          zone.additionalPackage &&
          <Fragment>
            <div>
              Остаток стандартного пакета: {zone.additionalPackage.current.toString().replace('.', ',')} ГБ из {zone.additionalPackage.max}
            </div>
            <ProgressLinear
              className="progress-linear_internet-zone"
              current={zone.additionalPackage.current}
              max={zone.additionalPackage.max}
            />
            <div>Действует еще&nbsp;{zone.additionalPackage.expired} {convertStrings(zone.additionalPackage.expired, DAYS)}</div>
          </Fragment>
        }
        {
          internet.data.fast && internet.data.regular &&
          <Fragment>
            <Package data={internet.data.fast} simple remain={getData('remain')[0]} fast />
            <Package data={internet.data.regular} simple remain={getData('remain')[1]} />
          </Fragment>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { Roaming } = state;

  return {
    roaming: Roaming,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getRoamingInternet: () => dispatch(getRoamingInternetAction()),
  };
}

RoamingInternet.propTypes = {
  roaming: PropTypes.shape().isRequired,
  getRoamingInternet: PropTypes.func.isRequired,
  zoneId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoamingInternet);
