import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import DashboardLogin from './DashboardLogin';
import Login from './Login';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<BrowserRouter>
		<React.StrictMode>
			{/*       <DashboardLogin /> */}
			<App />
		</React.StrictMode>
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
