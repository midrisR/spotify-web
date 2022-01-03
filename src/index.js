import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/css/styles.css';
import App from './App';
import { GlobalProvider } from './context/GlobalState';
ReactDOM.render(
	<GlobalProvider>
		<App />
	</GlobalProvider>,
	document.getElementById('root')
);
