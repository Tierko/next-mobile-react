import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ als }) => (
  <div className="footer">
    <div className="footer__copy">
      &copy; 2018 Next Mobile
    </div>
    {
      als &&
      <div className="footer__dev">
        <a className="footer__dev-link" href="https://www.artlebedev.ru/">
          <img className="footer__dev-img" src="/media/images/als-logo.svg" alt="Студия Артеми Лебедева" />
        </a>
        <div className="footer__dev-text">
          Задизайнено в <a href="https://www.artlebedev.ru/" className="footer__link footer__link_stud">Студии Артемия&nbsp;Лебедева</a>
          <br />
          <a href="https://www.artlebedev.ru/" className="footer__link">Информация о сайте</a>
        </div>
      </div>
    }
  </div>
);

Footer.propTypes = {
  als: PropTypes.bool,
};

Footer.defaultProps = {
  als: false,
};

export default Footer;
