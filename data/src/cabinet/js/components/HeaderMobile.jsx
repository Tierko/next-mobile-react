import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import ComboBox from './ComboBox';
import { Pages } from '../constants';

class HeaderMobile extends Component {
  state = {
    showSearch: false,
  };

  toggleSearch = () => {
    const { showSearch } = this.state;

    this.setState({
      showSearch: !showSearch,
    });
  };

  render() {
    const {
      hideHomeLink,
      showRoamingSearch,
      features,
      country,
      onCountrySelect,
      zone,
    } = this.props;
    const { showSearch } = this.state;
    const { toggleSearch } = this;

    return (
      <div className="header-mobile">
        <div className="header-mobile__logo">
          {
            !hideHomeLink &&
            <Link className="header-mobile__link" to={Pages.OVERVIEW} />
          }
        </div>
        {
          showSearch && showRoamingSearch && features && country && onCountrySelect && zone &&
          <ComboBox
            items={features}
            value={country}
            onSelect={onCountrySelect}
            placeholder="В какой стране вам нужен роуминг?"
            zoneName={zone.title}
            className="combo-box_mobile"
          />
        }
        {
          showRoamingSearch &&
          <div
            className={cs('header-mobile__search-button', {
              'header-mobile__search-button_zoom': !showSearch || country.properties,
              'header-mobile__search-button_close': showSearch,
            })}
            onClick={toggleSearch}
          />
        }
      </div>
    );
  }
}

HeaderMobile.propTypes = {
  hideHomeLink: PropTypes.bool,
  showRoamingSearch: PropTypes.bool,
  features: PropTypes.arrayOf(PropTypes.shape()),
  country: PropTypes.shape(),
  onCountrySelect: PropTypes.func,
  zone: PropTypes.shape(),
};

HeaderMobile.defaultProps = {
  hideHomeLink: false,
  showRoamingSearch: false,
  features: null,
  country: null,
  onCountrySelect: null,
  zone: null,
};

export default HeaderMobile;
