import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Package from '../components/Package';
import LinkBack from '../components/LinkBack';
import Transitions from '../components/Transitions';
import { Pages } from '../constants';
import getPackages from '../actions/Packages';
import { getData } from '../utils';

class AddPackage extends Component {
  componentDidMount() {
    const { requestPackages } = this.props;

    requestPackages();
  }

  render() {
    const { data } = this.props;
    const remain = getData('remain');

    return ([
      <MobileNav key="nav" type="dashboard" />,
      <div key="dashboard" className="dashboard">
        <Aside />
        <Transitions>
          <div className="dashboard__content">
            <LinkBack href={Pages.OVERVIEW} className="link-back_offset-bottom" />
            <div className="dashboard__header">Дополнительный пакет</div>
            <div className="dashboard__text">Через 10&nbsp;дней будут начислены 200 мин и&nbsp;2&nbsp;ГБ по&nbsp;тарифу Супервип</div>
            {
              data.map((d, i) => <Package key={d.id} data={d} remain={remain[i]} />)
            }
          </div>
        </Transitions>
      </div>,
    ]);
  }
}

function mapStateToProps(state) {
  const { Packages } = state;

  return { data: Packages.items };
}

function mapDispatchToProps(dispatch) {
  return {
    requestPackages: () => dispatch(getPackages),
  };
}

AddPackage.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  requestPackages: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPackage);
