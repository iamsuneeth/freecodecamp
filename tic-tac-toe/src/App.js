import React, { Component } from 'react';
import Game from './components/game/game';
import Header from './components/common/header';
import Footer from './components/common/footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
       <Game />
       <Footer />
      </div>
    );
  }
}

export default App;
