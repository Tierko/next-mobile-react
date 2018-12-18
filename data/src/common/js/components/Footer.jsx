import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const Footer = ({ als, light, data }) => {
  const src = `/media/images/als-${light ? 'light' : 'dark'}.svg`;
  const domain = data.domain || '&copy; 2018&nbsp;Next Mobile';
  const alsText = data.als || '\n' +
    'Задизайнено в <a href="https://www.artlebedev.ru/" class="footer__link footer__link_stud">Студии Артемия&nbsp;Лебедева</a>\n' +
    '<br />\n' +
    '<a href="https://www.artlebedev.ru/" class="footer__link">Информация о&nbsp;сайте</a>';

  return (
    <div className={cs('footer', { footer_light: light })}>
      <div className="footer__left">
        <div
          className="footer__copy"
          dangerouslySetInnerHTML={{ __html: domain }}
        />
        {
          als &&
          <div
            className={cs('footer__dev', {
              footer__dev_light: light,
            })}
          >
            <a className="footer__dev-link" href="https://www.artlebedev.ru/">
              <img className="footer__dev-img" alt="" src={src} />
            </a>
            <div
              className="footer__dev-text"
              dangerouslySetInnerHTML={{ __html: alsText }}
            />
          </div>
        }
      </div>
      <div className="footer__right">
        <div className="footer__contacts">
          <div className="footer__contact">
            <a href="mailto:info@nextmobile.ru" className="link">info@nextmobile.ru</a>
          </div>
          <div className="footer__contact">
            <a href="tel:88006006677" className="link">8 800 600-66-77</a> или <a href="tel:6677" className="link">6677</a>
          </div>
        </div>
        <div className="footer__chats">
          <div>Напишите нам</div>
          <div>
            <a className="footer__chat" href="tg://resolve?domain=<USERNAME>">
              <img src="/media/icons/tg.svg" alt="" />
            </a>
            <a className="footer__chat" href="https://wa.me/00000000000">
              <img src="/media/icons/wa.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  als: PropTypes.bool,
  light: PropTypes.bool,
  data: PropTypes.shape(),
};

Footer.defaultProps = {
  als: false,
  light: false,
  data: {},
};

export default Footer;
