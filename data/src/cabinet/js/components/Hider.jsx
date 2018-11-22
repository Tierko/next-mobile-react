import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class Hider extends Component {
  constructor(props) {
    super(props);

    this.child = createRef();
    this.parent = createRef();

    this.state = {
      targetHeight: 'none',
    };
  }

  componentDidMount() {
    this.updateHeight();
  }

  componentDidUpdate(prevProps) {
    const parent = this.parent.current;
    const { show } = this.props;
    const prevShow = prevProps.show;

    if (show === prevShow) {
      return;
    }

    if (show) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (this.show) {
          parent.style.overflow = 'visible';
        }
      }, 1000);
    }
  }

  updateHeight = () => {
    const child = this.child.current;

    this.setState({
      targetHeight: `${child.clientHeight}px`,
    });
  };

  render() {
    const { children, show } = this.props;
    const { targetHeight } = this.state;
    const { parent, child } = this;
    const height = show ? targetHeight : '0';
    const style = { maxHeight: height };

    if (!show) {
      style.overflow = 'hidden';
    }

    return (
      <div className="hider" ref={parent} style={style}>
        <div className="hider__inner" ref={child}>{children}</div>
      </div>
    );
  }
}

Hider.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node.isRequired,
};


Hider.defaultProps = {
  show: false,
};

export default Hider;
