import React , {Component}from 'react';
import Navbar from './Navbar';
import Homepage from './Homepage';
import Login from './Login';
import Register from './Register';
import Account from './shop';
import Dashboard from './Dashboard';
import AddShop from './AddShop'
import Logout from './Logout'
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticate : 'false',
      history : this.props.history,
    };

    this.authenticate = this.authenticate.bind(this);
  }

  authenticate(value){
    this.setState({isAuthenticate : value}, ()=>{
      console.log('authenticated');
    })
  }

  render(){
    return (
        <Router>
          <div className="App">
            
            <Route exact path='/Logout' component={Logout} /> 
            <Route exact path='/' component={Homepage} />
            <Route path='/Register' component={Register} />
            <Route path='/Login' component={Login} />
            <Route path='/shop' component={Account} />
            <Route exact path='/Dashboard' component={Dashboard} />
            <Route exact path='/Dashboard/AddShop' component={AddShop} />
          </div> 
        </Router>
        
    );
  }
}