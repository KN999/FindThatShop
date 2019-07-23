import React , {Component}from 'react';
import Navbar from './Navbar';
import Homepage from './Homepage';
import Login from './Login';
import Register from './Register';
import Account from './shop';
import Dashboard from './Dashboard';
import AddShop from './AddShop'
import Logout from './Logout'
import AddItem from './AddItem'
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
//import { connect } from 'react-redux';

export default class App extends Component {
  constructor(props) {
    super(props);
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
            <Route exact path='/Dashboard/AddItem' component={AddItem} />
          </div> 
        </Router>
        
    );
  }
}
/*
const mapStateToProps = (state) => {
  return {
    user: state.IsAuth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    log: (auth) => {
      dispatch({
        type: auth.type,
        token: auth.token,
      })
    }
  }
};

const navbar = (props)=> {
  return (
    <Navbar IsAuth = {this.props.IsAuth}/>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
*/