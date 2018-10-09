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

  onSelect = (country) => {
    const { onCountrySelect } = this.props;

    if (!country.properties) {
      this.setState({
        showSearch: false,
      });
    }

    onCountrySelect(country);
  };

  toggleSearch = () => {
    const { showSearch } = this.state;
    const { country, onCountrySelect } = this.props;

    if (showSearch && country.properties) {
      onCountrySelect({});
    } else {
      this.setState({
        showSearch: !showSearch,
      });
    }
  };

  render() {
    const {
      hideHomeLink,
      showRoamingSearch,
      features,
      country,
      zone,
    } = this.props;
    const { showSearch } = this.state;
    const { toggleSearch, onSelect } = this;

    return (
      <div className="header-mobile">
        <div className="header-mobile__logo">
          {
            !hideHomeLink &&
            <Link className="header-mobile__link" to={Pages.OVERVIEW} />
          }
        </div>
        {
          showSearch && showRoamingSearch && features && country && onSelect && zone &&
          <ComboBox
            items={features}
            value={country}
            onSelect={onSelect}
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
