import React, {Component} from 'react'
import './App.css';
import Navbar from './Components/Layout/Navbar';
import User from './Components/Users/User';



 

class App extends Component {
  

  render() {
 

  return (
    <div className="App">
      <Navbar  />
      <div className="container">
      <User />
      </div>
    </div>
  );
 } 
}

export default App;
