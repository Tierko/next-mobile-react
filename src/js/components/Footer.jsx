import React from 'react';

const Footer = () => (
  <div className="footer">
    <div className="footer__copy">
      &copy; 2018 Next Mobile
    </div>
    <div className="footer__dev">
      <a href="https://www.artlebedev.ru/">
        <img className="footer__dev-img" src="/media/images/als-logo.svg" alt="Студия Артеми Лебедева" />
      </a>
      <div className="footer__dev-text">
        Задизайнено в <a href="https://www.artlebedev.ru/" className="footer__link">Студии Артемия&nbsp;Лебедева</a>
        <br />
        <a href="https://www.artlebedev.ru/" className="footer__link">Информация о сайте</a>
      </div>
    </div>
  </div>
);

export default Footer;
