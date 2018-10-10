import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TariffTable from '../../../common/js/components/TariffTable';
import Button from '../../../common/js/components/Button';
import { Pages } from '../../../cabinet/js/constants';

const HomeTariff = ({
  to,
  translate,
  r,
  data,
}) => {
  const { header, btn } = translate;
  const headerArr = header && header.split('##');

  if (!header || !btn || !headerArr.length || !data.length) {
    return false;
  }

  return (
    <div className="home-tariff">
      <div className="home-tariff__header">
        <Link className="home__link" to={Pages[`TARIFF_R${r}`]} dangerouslySetInnerHTML={{ __html: headerArr[0] }} />
        <span dangerouslySetInnerHTML={{ __html: headerArr[1] }} />
      </div>
      <TariffTable home r={r} data={data} />
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
  translate: PropTypes.shape(),
  r: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.shape()),
};

HomeTariff.defaultProps = {
  to: null,
  translate: {},
  r: 1,
  data: [],
};

export default HomeTariff;
