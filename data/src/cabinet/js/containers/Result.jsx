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
  title = title || (status === 'success' ? 'Операция успешно завершена' : 'Не удалось завершить операцию');
  text = text || (status === 'success' ? 'Все в порядке, изменения внесены' : 'Ой! Что-то произошло. Мы выясним что и свяжемся с вами')

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
              <div
                className={cs('status', {
                  status_ok: status === 'success',
                  status_error: status !== 'success',
                })}
              >
                <span>{title}</span>
              </div>
              <div className="result__text">{text}</div>
              {
                (!links || !links.length) &&
                <div>
                  <Link className="result__link" to={Pages.OVERVIEW}>Продолжить работу</Link>
                </div>
              }
              {
                links && links.map(l => (
                  <div key={l.url}>
                    <Link className="result__link" to={l.url}>{l.title}</Link>
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
