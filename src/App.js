import React, { Component } from 'react';

import AppRoutes from './AppRoutes';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />

        <AppRoutes />

        <AppFooter />
      </div>
    );
  }
}

export default App;
