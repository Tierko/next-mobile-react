import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

class FaqItem extends Component {
  state = {
    open: false,
    height: 0,
  };

  toggle = ({ currentTarget }) => {
    const { open } = this.state;
    const text = currentTarget.querySelector('.faq__question-text');
    const textInner = currentTarget.querySelector('.faq__question-text-inner');
    let height = 0;

    if (text && textInner && !open) {
      height = textInner.clientHeight;
    }

    this.setState({
      open: !open,
      height,
    });
  };



  render() {
    const { title, text, search } = this.props;
    const { open, height } = this.state;
    const { toggle } = this;

    return (
      <div
        className={cs('faq__question', { faq__question_expand: open })}
        onClick={toggle}
      >
        <div className="faq__question-title" dangerouslySetInnerHTML={{ __html: title }} />
        <div
          className={cs('faq__question-text', { 'faq__question-text_expand': open })}
          style={{ maxHeight: `${height}px` }}
        >
          <div className="faq__question-text-inner" dangerouslySetInnerHTML={{ __html: text }} />
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
