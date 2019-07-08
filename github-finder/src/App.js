import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import User from './Components/Users/User';
import UserProfile from './Components/Users/UserProfile';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert';
import About from './Components/pages/About';
import axios from 'axios';
import GithubState from './context/github/GithubState';
import './App.css';

const App = () => {

  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

 
  
 //get single github user


   
 const getUserRepos = async (username) => {
    setLoading(true);

    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setRepos(response.data);
    setLoading(false);
 };


  //set alert
 const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000 );
  };
 
  return (
    <GithubState>
    <Router>
    <div className="App">
      <Navbar  />
     
      <div className="container">
        <Alert alert={alert} />
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
                 <Search
                  setAlert={showAlert}
                  />
                  <User />
            </Fragment>
          )} />
           <Route exact path='/about' component={About} />
          <Route exact path ='/user/:login' render={props=> (
            <UserProfile 
            {...props }
            getUserRepos={getUserRepos}
            repos={repos} />
          )}/>
        </Switch>
     
      </div>
    </div>
    </Router>
    </GithubState>
  );
}


export default App;
