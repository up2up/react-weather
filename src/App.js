import React, { Component } from 'react';
import WeatherSwitch from './components/WeatherSwitch';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <WeatherSwitch />
      </div>
    );
  }
}

export default App;
