import React from 'react';

const Loader = () => (
  <div className="loader">
    <svg className="loader__svg">
      <defs>
        <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#003eff' }} />
          <stop offset="100%" style={{ stopColor: '#02c4fe' }} />
        </linearGradient>
      </defs>
      <circle className="loader__circle" cx={30} cy={30} r={28} stroke="url(#loaderGradient)" />
    </svg>
  </div>
);

export default Loader;
