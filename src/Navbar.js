import React from 'react';
import './Navbar.css';

export default function Navbar () {

    return (
        <div className="Navbar">    
            <nav className="navbar navbar-expand-md">
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto mt-2">
                    <li className="nav-item"><a className="nav-link" href="/Register">Register</a></li>
                    <li className="nav-item"><a className="nav-link" href="/Login">Login</a></li>
                </ul>
            
                </div>
            </nav>
        </div>
    );
}