import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './custom.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'wouter';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
