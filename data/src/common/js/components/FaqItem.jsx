import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

class FaqItem extends Component {
  state = {
    open: false,
    height: 0,
  };

  componentDidMount() {
    const { onResize } = this;

    window.addEventListener('resize', onResize);
  }

  componentWillUnmount() {
    const { onResize } = this;

    window.removeEventListener('resize', onResize);
  }

  toggle = () => {
    const { open } = this.state;
    const { text, textInner } = this;
    let height = 0;

    if (text && textInner && !open) {
      height = textInner.clientHeight;
    }

    this.setState({
      open: !open,
      height,
    });
  };

  markMatches = (title, search) => {
    const index = title.toUpperCase().indexOf(search.toUpperCase());

    if (!search || index === -1) {
      return title;
    }

    if (index !== title.indexOf(search)) {
      search = title.substr(index, search.length);
    }

    return title.replace(search, `<b>${search}</b>`);
  };

  onResize = () => {
    const { textInner } = this;
    const { open } = this.state;

    if (open && textInner) {
      this.setState({
        height: textInner.clientHeight,
      });
    }
  };

  render() {
    const { title, text, search } = this.props;
    const { open, height } = this.state;
    const { toggle, markMatches } = this;
    const matchedTitle = markMatches(title, search);

    return (
      <div
        className={cs('faq__question', { faq__question_expand: open })}
        onClick={toggle}
      >
        <div className="faq__question-title" dangerouslySetInnerHTML={{ __html: matchedTitle }} />
        <div
          style={{ maxHeight: `${height}px` }}
          ref={(e) => { this.text = e; }}
          className={cs('faq__question-text', { 'faq__question-text_expand': open })}
        >
          <div
            className="faq__question-text-inner"
            ref={(e) => { this.textInner = e; }}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>
    );
  }
}

FaqItem.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};

export default FaqItem;
