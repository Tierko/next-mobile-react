import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TariffTable from '../../../common/js/components/TariffTable';
import Button from '../../../common/js/components/Button';
import { Pages } from '../../../cabinet/js/constants';

const HomeTariff = ({ to, data, r }) => {
  const { header, btn } = data;
  const headerArr = header && header.split('##');

  if (!header || !btn || !headerArr.length) {
    return false;
  }

  return (
    <div className="home-tariff">
      <div className="home-tariff__header">
        <Link className="home__link" to={Pages[`TARIFF_R${r}`]} dangerouslySetInnerHTML={{ __html: headerArr[0] }} />
        <span dangerouslySetInnerHTML={{ __html: headerArr[1] }} />
      </div>
      <TariffTable home r={r} />
      {
        to &&
        <Button className="button_light button_tariff-home" onClick={() => to('signup/after')}>
          <span dangerouslySetInnerHTML={{ __html: btn }} />
        </Button>
      }
    </div>
  );
};

HomeTariff.propTypes = {
  to: PropTypes.func,
  data: PropTypes.shape(),
};

HomeTariff.defaultProps = {
  to: null,
  data: {},
};

export default HomeTariff;
