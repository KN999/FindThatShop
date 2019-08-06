import React from 'react';
import { connect } from 'react-redux';
import './Navbar.css';

class SubNav1 extends React.Component{
    render() {
        return (
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto mt-2">
                    <li className="nav-item"><a className="nav-link" href="/Register">Register with us</a></li>
                    <li className="nav-item"><a className="nav-link" href="/Login">Manage</a></li>
                </ul>
            </div>
        )
    }
}

class SubNav2 extends React.Component{
    render() {
        return (
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto mt-2">
                    <li className="nav-item"><a className="nav-link" href="/Dashboard/AddShop">Add Shop</a></li>
                    <li className="nav-item"><a className="nav-link" href="/Dashboard/Additem">Add Item</a></li>
                </ul>
                <ul className="navbar-nav ml-auto mt-2">
                    <li className="nav-item"><a className="nav-link" href="/Logout">Logout</a></li>
                </ul>
            </div>
        )
    }
}

class Navbar extends React.Component {
    render() {
        return (
            <div className="Navbar">    
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <a class="navbar-brand" href="/">
                        FindThatShop
                    </a>
                    
                    {Boolean(localStorage.getItem('Token')) === true ? <SubNav2/> : <SubNav1/>}
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state
    }
};

export default connect(mapStateToProps)(Navbar);
