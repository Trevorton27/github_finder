import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import User from './Components/Users/User';
import UserProfile from './Components/Users/UserProfile';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert';
import About from './Components/pages/About';
import axios from 'axios';
import './App.css';



 

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
    
  };


    //searches github users
  searchUsers = async text => {
    this.setState({ loading: true });

    const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({ users: response.data.items, loading: false });
    console.log({ users: response.data.items});
    
  }
 //get single github user
 getUser = async (username) => {
  this.setState({ loading: true });

  const response = await axios.get(`https://api.github.com/users/${username}?client_id=$
  {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
  {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
  this.setState({ user: response.data, loading: false });
  console.log({ user: response.data} );
 }

 getUserRepos = async (username) => {
  this.setState({ loading: true });

  const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=$
  {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
  {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
  this.setState({ repos: response.data, loading: false });
  //console.log({ user: response.data} );
 }


  clearUsers = () => this.setState({ users: [], loading: false });

  //set alert
  setAlert = (message, type) => {
    this.setState({alert: { message: message, type: type }});
    setTimeout(() => this.setState({ alert: null}), 5000 );
  }
  

  render() {

  const {users, user, loading, repos} = this.state;
 
  return (
    <Router>
    <div className="App">
      <Navbar  />
     
      <div className="container">
        <Alert alert={this.state.alert} />
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
                 <Search 
                  searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  showClear={users.length > 0 ? true : false }  
                  setAlert={this.setAlert}
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
            getUser={this.getUser}
            getUserRepos={this.getUserRepos} 
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
}

export default App;
