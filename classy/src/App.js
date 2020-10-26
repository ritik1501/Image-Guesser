import React, { Component } from 'react';
import './App.css';
import Classifier from './components/classifier/classifier';
import ImageList from './components/classifier/ImageList/ImageList';
import Navigation from './components/classifier/Navigation/Navigation';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

class App extends Component {
  state = {}
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Classifier} />
            <Route exact path="/history" component={ImageList} />
            <Route exact path="*" component={Classifier} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
