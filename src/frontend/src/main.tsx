import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import "material-symbols";
import "swiper/css";
import "swiper/css/bundle";

// Styles
import "./styles/style.scss";

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-tabs/style/react-tabs.css';

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import reportWebVitals from './reportWebVitals';
//import {BrowserRouter} from "react-router-dom";
import {StrictMode} from "react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();