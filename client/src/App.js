import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import dnd from './images/d20.png'
import dotenv from 'dotenv'
import './App.css';
import Home from './home'
import Player from './player'
import Monster from './monster'
import PlayerList from './player.list'
import PlayerSheet from './player.sheet'

dotenv.config()

class App extends PureComponent {

  componentDidMount() {
  }


  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <header className="App-header">
              <img src={dnd} className="App-logo" alt="logo" />
              <nav className="nav-appNav nav-widthReset">
                <div className="nav-wrapper">
                  <ul id="nav-mobile" className="hide-on-med-and-down">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/player">Create Character</Link>
                    </li>
                    <li>
                      <Link to="/player-list">Character List</Link>
                    </li>
                    <li>
                      <Link to="/monster">Monster List</Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </header>
            <Switch>
              <Route path="/player" component={Player} />
              <Route path="/player-list" component={PlayerList} />
              <Route path="/player-sheet/:id" component={PlayerSheet} />
              <Route path="/monster" component={Monster} />
              <Route path="/" component={Home} />
            </Switch>
            <footer className="App-header">
              <div className="container">
                <div className="row">
                  <div className="col l6 s12">
                  </div>
                  <div className="col l4 offset-l2 s12">
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
