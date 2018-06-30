import React, { Component } from 'react';

const PageFade = PageFadeComponent => class extends Component {
  componentDidMount() {
    setTimeout(() => {
      // document.getElementById('root').style.opacity = '1';
      // document.getElementById('root').style.visibility = 'visible';
    }, 100);
  }

  componentWillUnmount() {
    // document.getElementById('root').style.opacity = '0';
    // document.getElementById('root').style.visibility = 'hidden';
  }

  render() {
    return (
      <PageFadeComponent {...this.props} />
    );
  }
};

export default PageFade;
