import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LinkBack from './LinkBack';
import ProgressLinear from './ProgressLinear';
import Package from './Package';
import { Pages, DAYS } from '../constants';
import { convertStrings } from '../utils';
import { getRoamingInternetAction } from '../actions/Roaming';

class RoamingInternet extends Component {
  componentDidMount() {
    const { getRoamingInternet } = this.props;

    getRoamingInternet();
  }

  render() {
    const { roaming, zoneId } = this.props;
    const zone = roaming.zones.items.find(z => z.id === zoneId * 1);
    console.log(roaming)

    if (!zone) {
      return false;
    }

    return (
      <div className="roaming">
        <div className="roaming__title">
          <LinkBack href={Pages.ROAMING} className="link-back_roaming" />
          Интернет в {zone.title}
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
            <div>Действует еще {zone.additionalPackage.expired} {convertStrings(zone.additionalPackage.expired, DAYS)}</div>
          </Fragment>
        }
        <Package data={roaming.itnernet.fast} simple />
        <Package data={roaming.itnernet.regular} simple />
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
