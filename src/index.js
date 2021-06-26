import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Profiles from './container/Profiles';
import Profiles from './Component/Profiles/_index';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Profiles />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
