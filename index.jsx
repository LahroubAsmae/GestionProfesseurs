import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';  // Utilisation correcte de BrowserRouter
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>  {/* Envelopper toute l'application avec Router */}
    <App />
  </Router>
);
