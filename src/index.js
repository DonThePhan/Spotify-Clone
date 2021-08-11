import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { MusicContextProvider } from './components/Store/music-context';

ReactDOM.render(
	<MusicContextProvider>
		<App />
	</MusicContextProvider>,
	document.getElementById('root')
);
