import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios";
import Cookies from "universal-cookie";

axios.defaults.baseURL = 'http://localhost:8000/';
const cookies = new Cookies();
axios.defaults.headers.common['Authorization'] = 'Bearer '+cookies.get("token");
axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

