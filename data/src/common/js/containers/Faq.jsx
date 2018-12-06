import React, { Component } from 'react';
import { Link, Element } from 'react-scroll';
import DocumentMeta from 'react-document-meta';
import Transitions from '../../../cabinet/js/components/Transitions';
import Aside from '../../../cabinet/js/components/Aside';
import Input from '../components/Input';
import FaqItem from '../components/FaqItem';
import FaqContacts from '../components/FaqContacts';
import Notice from '../../../cabinet/js/components/Notice';
import HeaderMobile from '../../../cabinet/js/components/HeaderMobile';
import MobileNav from '../components/MobileNav';
import { TITLES } from '../../../cabinet/js/constants';

class Faq extends Component {
  state = {
    search: '',
    loaded: false,
    error: false,
    data: [],
  };

  componentDidMount() {
    fetch('/media/info/faq.json', {
      credentials: 'same-origin',
      method: 'GET',
    })
      .then(faq => faq.json())
      .then(faq => this.setState({
        loaded: true,
        data: faq,
      }));
  }

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  filter = (data, search) => {
    return data.map((s) => {
      if (!search) {
        return s;
      }

      return {
        title: s.title,
        items: s.items.slice().filter(i => (
          i.title.toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
          i.text.toUpperCase().indexOf(search.toUpperCase()) !== -1
        )),
      };
    });
  };

  render() {
    const { data, search } = this.state;
    const { onChange, filter } = this;
    const filteredData = filter(data, search);
    const meta = {
      title: TITLES.FAQ,
    };

    return (
      <DocumentMeta {...meta}>
        <HeaderMobile />
        <MobileNav key="nav" type="dashboard" />
        <Notice />
        <div key="dashboard" className="dashboard">
          <Aside hideLink />
          <Transitions>
            <div className="dashboard__content dashboard__content_white dashboard__content_faq">
              <div className="faq">
                <div className="faq__content">
                  <div className="faq__header">Часто задаваемые вопросы</div>
                  <Input name="search" value={search} onChange={onChange} placeholder="Поиск" />
                  {
                    filteredData.map(section => (
                      !!section.items.length &&
                      <Element name={`q${section.id}`}>
                        <div className="faq__section">
                          <div className="faq__subheader">{section.title}</div>
                          <div className="faq__questions">
                            {
                              section.items.map(i => (
                                <FaqItem title={i.title} text={i.text} search={search} />
                              ))
                            }
                          </div>
                        </div>
                      </Element>
                    ))
                  }
                </div>
                <div className="faq__aside">
                  {
                    data.map(i => (
                      <Link className="faq__aside-item" smooth spy to={`q${i.id}`}>{i.title}</Link>
                    ))
                  }
                </div>
              </div>
              <FaqContacts />
            </div>
          </Transitions>
        </div>
      </DocumentMeta>
    );
  }
}

export default Faq;