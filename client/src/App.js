import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import dnd from './images/d20.png'
import dotenv from 'dotenv'
import './App.css';
import { read } from './services/players.service'
import Player from './player'
import Monster from './monster'

dotenv.config()

class App extends PureComponent {

  componentDidMount() {
    read()
  }


  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <header className="App-header">
              <img src={dnd} className="App-logo" alt="logo" />
              <nav className="nav-appNav">
                <div className="nav-wrapper">
                  <ul id="nav-mobile" className="hide-on-med-and-down">
                    <li>
                      <Link to="/player">Create Character</Link>
                    </li>
                    <li>
                      <Link to="/monster">Monster List</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </header>
            <Route path="/player" component={Player} />
            <Route path="/monster" component={Monster} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
