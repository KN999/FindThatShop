import React , {Component}from 'react';
import Navbar from '../Navbar/Navbar';
import Homepage from '../Homepage/Homepage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Dashboard from '../Dashboard/Dashboard';
import Logout from '../Logout/Logout'
import GetShop from '../GetShop/GetShop'
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/Dashboard/getshop' component={GetShop} /> 
            <Route exact path='/Logout' component={Logout} /> 
            <Route exact path='/' component={Homepage} />
            <Route path='/Register' component={Register} />
            <Route path='/Login' component={Login} />
            <Route exact path='/Dashboard' component={Dashboard} />
          </div> 
        </Router>
        
    );
  }
}