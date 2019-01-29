import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import Input from '../../../common/js/components/Input';
import FaqItem from '../../../common/js/components/FaqItem';
import { TITLES } from '../../../cabinet/js/constants';

class FaqWebView extends Component {
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
        <div className="faq-web-view">
          <Input name="search" value={search} onChange={onChange} placeholder="Поиск" />
          {
            filteredData.map(section => (
              !!section.items.length &&
              <div className="faq__section">
                <div className="faq__subheader">{section.title}</div>
                <div className="faq__questions">
                  {
                    section.items.map(i => (
                      <FaqItem key={i.id} title={i.title} text={i.text} search={search} />
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </DocumentMeta>
    );
  }
}

export default FaqWebView;
