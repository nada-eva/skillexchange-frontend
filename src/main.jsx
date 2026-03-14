// main.jsx — Monte l'application React dans le div#root de index.html
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';  // styles globaux

// createRoot : API React 18 pour le rendu concurrent
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode : active des avertissements supplémentaires en développement
  <React.StrictMode>
    <App />
  </React.StrictMode>
);