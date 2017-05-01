import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import AppHome from './components/AppHome';

const AppRoutes = () => (
  <Router>
    <Route exact path="/" component={AppHome} />
  </Router>
);

export default AppRoutes;
