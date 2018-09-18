import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TariffTable from '../../../common/js/components/TariffTable';
import Button from '../../../common/js/components/Button';
import { Pages } from '../../../cabinet/js/constants';

const HomeTariff = ({ to, r }) => (
  <div className="home-tariff">
    <div className="home-tariff__header">
      <Link className="home__link" to={Pages[`TARIFF_R${r}`]}>Тарифы</Link>, с&nbsp;которыми не&nbsp;нужно заботиться об&nbsp;остатках
    </div>
    <TariffTable home />
    {
      to &&
      <Button className="button_light button_tariff-home" onClick={to}>Перейти на Next</Button>
    }
  </div>
);

HomeTariff.propTypes = {
  to: PropTypes.func,
};

HomeTariff.defaultProps = {
  to: null,
};

export default HomeTariff;
