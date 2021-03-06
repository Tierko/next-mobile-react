import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import DocumentMeta from 'react-document-meta';
import HeaderMobile from '../components/HeaderMobile';
import MobileNav from '../../../common/js/components/MobileNav';
import Aside from '../components/Aside';
import Transitions from '../components/Transitions';
import { Pages } from '../constants';

const Result = ({ match, location }) => {
  const { params: { status } } = match;
  const state = location.state || {};
  const { links } = state;
  let { title, text } = state;
  title = title || (status === 'success' ? 'Операция успешно завершена' : 'Не\u00A0удалось завершить операцию');
  text = text || (status === 'success' ? 'Все в\u00A0порядке, изменения внесены' : 'Ой! Что-то произошло. Мы\u00A0выясним что и\u00A0свяжемся с\u00A0вами');

  const meta = {
    title,
  };

  return (
    <DocumentMeta {...meta}>
      <HeaderMobile />
      <MobileNav key="nav" type="dashboard" />
      <div key="dashboard" className="dashboard">
        <Aside />
        <Transitions>
          <div className="dashboard__content">
            <div className="result">
              <div className={`result__image result__image_${status}`} />
              <div
                className={cs('result__header', {
                  result__header_ok: status === 'success',
                  result__header_error: status !== 'success',
                })}
              >
                <span>{title}</span>
              </div>
              <div className="result__text">{text}</div>
              {
                (!links || !links.length) &&
                <div>
                  <Link className="button button_primary button_result" to={Pages.OVERVIEW}>
                    Продолжить работу
                  </Link>
                </div>
              }
              {
                links && links.map(l => (
                  <div key={l.url}>
                    <Link
                      className={
                        l.primary ?
                          'button button_primary button_result' :
                          'button button_secondary button_result'
                      }
                      to={l.url}
                    >
                      {l.title}
                    </Link>
                  </div>
                ))
              }
            </div>
          </div>
        </Transitions>
      </div>
    </DocumentMeta>
  );
};

Result.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};

export default Result;
