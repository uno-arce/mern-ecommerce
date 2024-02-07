import React from 'react';
import ReactDOM from 'react-dom/client';

// Importation of bootstrap package
import 'bootstrap/dist/css/bootstrap.min.css'

// Global CSS
import './global.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);