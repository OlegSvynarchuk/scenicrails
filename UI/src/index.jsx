import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import "leaflet/dist/leaflet.css"

import store from './redux/store.js'

import App from './app.jsx'

ReactDOM.render(
<Provider store={store}>
    <Router>
         <App />
    </Router>
</Provider>
,
document.getElementById('root'));