import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

const Footer = ({ als, light, data }) => {
  const color = light ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
  const domain = data.domain || '&copy; 2018&nbsp;Next Mobile';
  const alsText = data.als || '\n' +
    'Задизайнено в <a href="https://www.artlebedev.ru/" class="footer__link footer__link_stud">Студии Артемия&nbsp;Лебедева</a>\n' +
    '<br />\n' +
    '<a href="https://www.artlebedev.ru/" class="footer__link">Информация о&nbsp;сайте</a>';

  return (
    <div className={cs('footer', { footer_light: light })}>
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
            <svg
              version="1"
              id="ALS_logo_svg"
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              y="0"
              width="100"
              height="46"
              viewBox="0 0 100 46"
              className="footer__dev-img"
            >
              <path fill={color} d="M99 1v32H1V1h98m1-1H0v34h100V0z" />
              <path fill={color} d="M80.649 22.75l-.601 4.261h-.249l-.337-4.136L78.811 4H77l1.499 26h2.619L83.6 4h-2.072zM67.569 4H64v26h3.439C69.415 30 70 28.84 70 27V6.766C70 4.924 69.545 4 67.569 4zM68 27.462c0 1.323.06 1.538-1 1.538h-1V5h1c1.06 0 1 .216 1 1.537v20.925zM72 30h4v-1h-2V16h1.341v-1H74V5h2V4h-4zM18 4l-2 26h1.525l.736-8H20l.226 8h2.076L20.85 4H18zm.333 17l.599-11.745.298-3.156h.57l.2 3.156V21h-1.667zM43 4h-2v26h4v-1h-2zM46 30h4v-1h-2V16h1.326v-1H48V5h1.989V4H46zM30.713 5h1.666v25h1.861V5h1.601V4h-5.128zM36.617 27.939c-.669 0-1.206.533-1.206 1.191 0 .663.537 1.193 1.206 1.193.667 0 1.205-.53 1.205-1.193 0-.657-.537-1.191-1.205-1.191zM55.709 4H51v26h3.94c1.249 0 2.045-1.002 2.06-2.094V17.631c0-1.254-.219-1.568-.666-1.821v-.564c.551-.276.666-.557.666-1.434v-8.23C57 4.66 56.652 4 55.709 4zM55 28.104c-.012.689-.057.832-.61.832h-1.403L53 16h1.406c.551 0 .594.301.594 1.422v10.682zm0-14.463c0 1.091.028 1.303-.551 1.359H53l-.014-10h1.447c.466 0 .567.216.567.792v7.849zM27.594 4H24v26h2V18h1.331c.61 0 .669.282.669 1v11h2l-.011-9.89c0-1.425.073-1.795-.724-2.259v-.603c.529-.057.735-.125.735-1.533V7c0-1.842-.446-3-2.406-3zM28 16c0 .805.019 1-.636 1H26V5l.839-.016C27.883 5 28 5.677 28 7v9zM59 30h4v-1h-2V16h1.336v-1H61V5h2V4h-4z" />
              <path fill={color} d="M3.54,39.837c0-0.7-0.6-1.101-1.1-1.101s-1,0.3-1.4,0.601l-0.4-0.5c0.5-0.5,1.2-0.801,1.9-0.801c1,0,1.9,0.601,1.9,1.801c0,1.5-1.8,3.199-2.8,4.199h2.9v0.801h-4v-0.601C1.54,43.137,3.54,41.337,3.54,39.837z M8.439,44.937c-1.9,0-2.4-2-2.4-3.5s0.5-3.5,2.4-3.5s2.4,2,2.4,3.5S10.24,44.937,8.439,44.937z M8.439,38.637c-1.3,0-1.5,1.8-1.5,2.8s0.2,2.8,1.5,2.8c1.3,0,1.5-1.8,1.5-2.8C9.939,40.536,9.74,38.637,8.439,38.637z M12.339,39.337l1.9-1.2h0.6v6l1.2,0.2v0.399h-3.3v-0.399l1.2-0.2v-5l-1.5,0.5L12.339,39.337z M19.94,44.937c-1.2,0-2.2-0.6-2.2-1.8c0-0.9,0.8-1.5,1.399-1.8c-0.699-0.4-1.3-0.801-1.3-1.7c0-1,0.9-1.601,2-1.601c1.101,0,2,0.5,2,1.601c0,0.899-0.6,1.3-1.3,1.7c0.7,0.399,1.5,0.899,1.5,1.8C22.139,44.236,21.04,44.937,19.94,44.937z M19.839,41.637c-0.6,0.3-1.3,0.7-1.3,1.5c0,0.7,0.6,1.2,1.4,1.2c0.8,0,1.399-0.4,1.399-1.2S20.44,41.937,19.839,41.637z M19.94,38.637c-0.601,0-1.2,0.3-1.2,1s0.7,1.1,1.3,1.3c0.6-0.3,1.1-0.6,1.1-1.3C21.139,39.036,20.54,38.637,19.94,38.637z" />
            </svg>
          </a>
          <div
            className="footer__dev-text"
            dangerouslySetInnerHTML={{ __html: alsText }}
          />
        </div>
      }
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
