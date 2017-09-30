import React, { Component } from 'react';
import Game from './components/Game/game';
import './App.css';

class App extends Component {
  render() {
    return (
      <section className="game-container container">
        <div className="row">
            <div className="col">
              <Game />
            </div>
        </div>
      </section>
    );
  }
}

export default App;
