import React , {Component}from 'react';
import Navbar from '../Navbar/Navbar';
import Homepage from '../Homepage/Homepage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Dashboard from '../Dashboard/Dashboard';
import Logout from '../Logout/Logout'
import GetShop from '../GetShop/GetShop'
import Getshop from '../Getshop2/Getshop'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect
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
            <PrivateRoute authed={Boolean(localStorage.getItem('Token'))} exact path='/Dashboard/getshop' component={GetShop} />
            <Route exact path='/Logout' component={Logout} /> 
            <Route exact path='/' component={Homepage} />
            <Route path='/Register' component={Register} />
            <Route path='/Login' component={Login} />
            <Route path="/Getshop" component={Getshop} />
            <PrivateRoute authed={Boolean(localStorage.getItem('Token'))} exact path='/Dashboard' component={Dashboard} />
          </div> 
        </Router>
        
    );
  }
}

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => Boolean(localStorage.getItem('Token'))
        ? <Component {...props} />
        : <Redirect to={{pathname: '/Login', state: {from: props.location}}} />}
    />
  )
}