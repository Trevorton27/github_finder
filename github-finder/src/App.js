import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Alert from './Components/Layout/Alert';
import About from './Components/pages/About';
import Home from './Components/pages/Home';
import NotFound from './Components/pages/NotFound';
import GithubState from './context/github/GithubState';
import AlertState from './context/Alert/AlertState';
import './App.css';
import UserProfile from './Components/Users/UserProfile';

const App = () => {

  return (
    <GithubState>
      <AlertState>
        <Router>
        <div className="App">
          <Navbar  />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/about' component={About} />
              <Route exact path ='/user/:login' component={UserProfile} />
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}


export default App;
