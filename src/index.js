import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Error from './errormessage'
import * as serviceWorker from './serviceWorker';

// if there is an error with the Google API show this screen
window.gm_authFailure = () => {
  ReactDOM.render(<Error />, document.getElementById('root'));
}

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.register();
