import React, {Component} from 'react'
import './App.css';
import Navbar from './Components/Layout/Navbar';
import PropTypes from 'prop-types'

 

class App extends Component {
  static defaultProps = {
    title: 'Alas, Yon Github Finder',
    icon: 'fab fa-github'
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  };

  render() {
 

  return (
    <div className="App">
      <Navbar  />
    </div>
  );
 } 
}

export default App;
