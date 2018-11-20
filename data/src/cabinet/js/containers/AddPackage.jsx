import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import Package from '../components/Package';
import Transitions from '../components/Transitions';
import Breadcrumbs from '../components/Breadcrumbs';
import { Pages, TITLES } from '../constants';
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
    const meta = {
      title: TITLES.ADD_PACKAGE,
    };

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile />
        <MobileNav key="nav" type="dashboard" />
        <div key="dashboard" className="dashboard">
          <Aside />
          <Transitions>
            <div className="dashboard__content dashboard__content_white">
              <Breadcrumbs items={[{ title: 'Обзор', link: Pages.OVERVIEW }]} />
              <div className="dashboard__header">Дополнительный пакет</div>
              {
                data.map((d, i) => <Package key={d.id} data={d} remain={remain[i]} />)
              }
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
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
