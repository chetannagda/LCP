// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      {/* <GoogleOAuthProvider clientId="1043122021470-smig4eogosk6gde5v9qv0ls3ocetbnj1.apps.googleusercontent.com"> */}
        <App />
      {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);

reportWebVitals();
