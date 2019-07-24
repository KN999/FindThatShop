import React,{Component} from 'react';
import './Navbar.css';
//import { connect } from 'react-redux';
//import { log } from './action/log'


export default class Navbar extends React.Component {
    render(){
        var NavbarLogin = (
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto mt-2">
                <li className="nav-item"><a className="nav-link" href="/Register">Add Shop</a></li>
                <li className="nav-item"><a className="nav-link" href="/Login">Login</a></li>
            </ul>
        </div>
        )

        var NavbarWithoutLogin = (
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto mt-2">
                <li className="nav-item"><a className="nav-link" href="/Dashboard/AddShop">Add Shop</a></li>
                <li className="nav-item"><a className="nav-link" href="/Dashboard/EditShop">Edit Shop</a></li>
            </ul>
            <ul className="navbar-nav ml-auto mt-2">
                <li className="nav-item"><a className="nav-link" href="/Logout">Logout</a></li>
            </ul>
        </div>
        )

        if (this.props === true)
        {
            var Navbar = NavbarWithoutLogin;
        }
        else {
            var Navbar = NavbarLogin
        }
        
        
            return (
                
                <div className="Navbar">    
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <a class="navbar-brand" href="/">
                            Shopkeeper's List
                        </a>
                        {Navbar}
                    </nav>
                </div>
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
            dispatch(log(auth));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
*/