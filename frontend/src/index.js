import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/icons/icons.css';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import store from './reduxToolkit/Store';
import {Provider} from 'react-redux'
import "./styles/icons/icons.css";
import "./styles/icons/dark.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}> 

 <BrowserRouter> 
 
    <App />

  </BrowserRouter>

  </Provider>
  );

