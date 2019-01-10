import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { animateScroll } from 'react-scroll';
import DocumentMeta from 'react-document-meta';
import MobileNav from '../../../common/js/components/MobileNav';
import Header from '../../../common/js/components/Header';
import Footer from '../../../common/js/components/Footer';

class Legal extends Component {
  componentDidMount() {
    animateScroll.scrollToTop();
  }

  render() {
    const {
      translations,
    } = this.props.data;
    const {
      title,
      info,
      nav,
      copyright,
    } = translations.data;

    return (
      <DocumentMeta title={title ? title.info : ''}>
        <div className="legal">
          <MobileNav type="home" translate={nav} dark />
          <Header mode="site" info={info} translate={nav} />
          <div className="legal__inner">
            <h1>Юридическая информация</h1>
            <div className="legal__block">
              <h2>Лицензии и свидетельства</h2>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Лицензия на оказание телематических услуг</a>
              </div>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Лицензия на оказание услуг подвижной радиотелефонной связи</a>
              </div>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Лицензия на оказание услуг связи по передаче данных</a>
              </div>
              <div className="legal__item legal__item_jpg">
                <a href="/" className="link">Свидетельство ОГРН</a>
              </div>
              <div className="legal__item legal__item_jpg">
                <a href="/" className="link">Свидетельство ИНН</a>
              </div>
            </div>
            <div className="legal__block">
              <h2>Договора, бланки, заявления</h2>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Договор об оказании услуг связи для физ.лиц</a>
              </div>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Договор об оказании услуг связи для юр.лиц</a>
              </div>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Условия оказания услуг связи</a>
              </div>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Договор об оказании услуг фикс.связи корп.клиентам</a>
              </div>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Условия оказания услуг фикс.связи корп.клиентам</a>
              </div>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Приложение к условиям оказания услуг фикс.связи корп.клиентам</a>
              </div>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Сроки устранения неисправностей</a>
              </div>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Условия Информационно-справочного обслуживания</a>
              </div>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Заявление на согласие на обработку персональных данных</a>
              </div>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Заявление на отзыв согласия на обработку персональных данных</a>
              </div>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Бланк для жалоб и предложений</a>
              </div>
            </div>
            <div className="legal__block">
              <h2>Другое</h2>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Реквизиты</a>
              </div>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Правила оказания услуг телефонной связи</a>
              </div>
              <div className="legal__item legal__item_pdf">
                <a href="/" className="link">Политика обработки персональных данных</a>
              </div>
            </div>
          </div>
          <Footer
            als
            translate={copyright}
            mode="site"
            className="footer_wide"
            light
          />
        </div>
      </DocumentMeta>
    );
  }
}

Legal.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Legal;
