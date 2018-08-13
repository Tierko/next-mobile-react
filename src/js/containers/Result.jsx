import React from 'react';
import { Link } from 'react-router-dom';
import cs from 'classnames';
import MobileNav from '../components/MobileNav';
import Aside from '../components/Aside';
import Transitions from '../components/Transitions';
import { Pages } from '../constants';

const Result = ({ match, location }) => {
  const { params: { status } } = match;
  const state = location.state || {};
  const { title, text, links } = state;

  return ([
    <MobileNav key="nav" type="dashboard" />,
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
              <span>
                { title || (status === 'success' ? 'Операция успешно завершена' : 'Не удалось завершить операцию') }
              </span>
            </div>
            <div className="result__text">
              { text || (status === 'success' ? 'Все в порядке, изменения внесены' : 'Ой! Что-то произошло. Мы выясним что и свяжемся с вами') }
            </div>
            {
              (!links || !links.length) &&
              <div>
                <Link className="result__link" to={Pages.OVERVIEW}>Продолжить работу</Link>
              </div>
            }
            {
              links && links.map(l => (
                <div>
                  <Link className="result__link" to={l.url}>{l.title}</Link>
                </div>
              ))
            }
          </div>
        </div>
      </Transitions>
    </div>,
  ]);
};

export default Result;
