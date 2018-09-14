import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Pages/Home';
import BarrenLandAnalysis from './Pages/BarrenLandAnalysis';

import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/barren-land-analysis' component={BarrenLandAnalysis} />>
        </Switch>
    </BrowserRouter>
, document.getElementById('appRoot'));


registerServiceWorker();
