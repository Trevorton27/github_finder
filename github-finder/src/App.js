import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import User from './Components/Users/User';
import UserProfile from './Components/Users/UserProfile';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert';
import About from './Components/pages/About';
import axios from 'axios';
import './App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

    //searches github users
  const searchUsers = async text => {
    setLoading(true);

    const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setUsers(response.data.items);
    setLoading(false);
  }
 //get single github user
 const getUser = async (username) => {
    setLoading(true);

    const response = await axios.get(`https://api.github.com/users/${username}?client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setUser(response.data);
    setLoading(false);
 };

 const getUserRepos = async (username) => {
    setLoading(true);

    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    setRepos(response.data);
    setLoading(false);
 };


 const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  //set alert
 const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000 );
  };
 
  return (
    <Router>
    <div className="App">
      <Navbar  />
     
      <div className="container">
        <Alert alert={alert} />
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
                 <Search 
                  searchUsers={searchUsers} 
                  clearUsers={clearUsers} 
                  showClear={users.length > 0 ? true : false }  
                  setAlert={showAlert}
                  />
                  <User 
                  loading={loading} 
                  users={users} 
                  />
            </Fragment>
          )} />
           <Route exact path='/about' component={About} />
          <Route exact path ='/user/:login' render={props=> (
            <UserProfile 
            {...props } 
            getUser={getUser}
            getUserRepos={getUserRepos} 
            user={ user} 
            repos={repos}
            loading={loading} />
          )}/>
        </Switch>
     
      </div>
    </div>
    </Router>
  );
}

export default App;
