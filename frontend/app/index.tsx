import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';


import { MuiThemeProvider } from '@material-ui/core';
import themes from './themes/default';

import App from './src/App';
import store from './store';
import './src/App';

render(
    <MuiThemeProvider theme={themes}>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </MuiThemeProvider>, document.getElementById('root'));