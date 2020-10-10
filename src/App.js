import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PlayersContainer from './components/PlayersContainer'

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>Player List</h1>
        </div>
        <PlayersContainer />
      </div>
    );
  }
}

export default App;
