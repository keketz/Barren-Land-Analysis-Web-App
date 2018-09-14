import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Pages/Home';
import BarrenLandAnalysis from './Pages/BarrenLandAnalysis';
import DocumentSearch from './Pages/DocumentSearch';
import MyRetail from './Pages/MyRetail';

import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route exact path='/target-tech-talent-day/' component={Home} />
            <Route path='/target-tech-talent-day/barren-land-analysis' component={BarrenLandAnalysis} />
            <Route path='/target-tech-talent-day/document-search' component={DocumentSearch} />
            <Route path='/target-tech-talent-day/myRetail' component={MyRetail} />
        </Switch>
    </BrowserRouter>
, document.getElementById('appRoot'));


registerServiceWorker();
