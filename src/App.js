import React from 'react';
import Navbar from './Navbar';
import Homepage from './Homepage';
import Login from './Login';
import Register from './Register';
import TodoApp from './shop';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';



export default function App() {
  return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={Homepage} />
          <Route path='/Register' component={Register} />
          <Route path='/Login' component={Login} />
          <Route path='/shop' component={TodoApp} />
        </div>
          
      </Router>
      
  );
}