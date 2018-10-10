import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Cabinet = ({ to, translate }) => {
  if (!translate.header || !translate.text) {
    return false;
  }

  const header = translate.header && translate.header.split('##');

  return (
    <div className="cabinet">
      <div className="cabinet__image">
        <img className="cabinet__img cabinet__img_desktop" src="/media/images/phones.png" alt="" />
        <img className="cabinet__img cabinet__img_mobile" src="/media/images/phones-mobile.png" alt="" />
      </div>
      <div className="cabinet__desc">
        <div className="cabinet__header">
          {
            header && header.length === 3 &&
              <Fragment>
                <span dangerouslySetInnerHTML={{ __html: header[0] }} /> <span className="home__link" onClick={to} dangerouslySetInnerHTML={{ __html: header[1] }} /> <span dangerouslySetInnerHTML={{ __html: header[2] }} />
              </Fragment>
          }
        </div>
        <div className="cabinet__text" dangerouslySetInnerHTML={{ __html: translate.text }} />
        <div className="cabinet__stores">
          <a className="cabinet__store" href="#">
            <img className="cabinet__store-img" src="/media/images/as.svg" alt="App Store" />
          </a>
          <a className="cabinet__store" href="#">
            <img className="cabinet__store-img" src="/media/images/gp.svg" alt="Google play" />
          </a>
        </div>
      </div>
    </div>
  );
};

Cabinet.propTypes = {
  to: PropTypes.func.isRequired,
  translate: PropTypes.shape(),
};

Cabinet.defaultProps = {
  translate: {},
};

export default Cabinet;
