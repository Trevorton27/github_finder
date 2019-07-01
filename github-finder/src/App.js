import React, {Component} from 'react'
import Navbar from './Components/Layout/Navbar';
import User from './Components/Users/User';
import Search from './Components/Users/Search';
import Alert from './Components/Layout/Alert';
import axios from 'axios';
import './App.css';



 

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }


    //searches github users
  searchUsers = async text => {
    this.setState({ loading: true });

    const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({ users: response.data.items, loading: false });
    console.log({ users: response.data.items} );
  }

  clearUsers = () => this.setState({ users: [], loading: false });

  //set alert
  setAlert = (message, type) => {
    this.setState({alert: { message: message, type: type }});
    setTimeout(() => this.setState({ alert: null}), 5000 );
  }
  

  render() {

  const {users, loading} = this.state;
 
  return (
    <div className="App">
      <Navbar  />
      <div className="container">
        <Alert alert={this.state.alert} />
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
      </div>
    </div>
  );
 } 
}

export default App;
