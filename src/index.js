import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import App1 from './App1';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Api crud
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// )

// local storage crud
root.render(
  <BrowserRouter>
    <App1 />
  </BrowserRouter>
);

