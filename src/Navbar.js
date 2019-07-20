import React,{Component} from 'react';
import './Navbar.css';

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
        var loginToken = localStorage.getItem('LoginToken')
        if (loginToken === "")
        {
            var Navbar = NavbarWithoutLogin;
        }
        else {
            var Navbar = NavbarLogin
        }
        
        console.log("(((((((((((((((((((()))))))))))",JSON.stringify(loginToken))
        console.log("_______________________", JSON.stringify(loginToken))
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