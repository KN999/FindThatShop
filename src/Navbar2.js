import React from 'react'

export default class Navbar2 extends React.Component {
    render(){
    return (
        <div className="Navbar">    
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <a class="navbar-brand" href="/dashboard">
                    Shopkeeper's List
                </a>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto mt-2">
                    <li className="nav-item"><a className="nav-link" href="/Dashboard/AddShop">Add Shop</a></li>
                    <li className="nav-item"><a className="nav-link" href="/Dashboard/AddItem">Add Item</a></li>
                </ul>
                <ul className="navbar-nav ml-auto mt-2">
                    <li className="nav-item"><a className="nav-link" href="/">Logout</a></li>
                </ul>
                
                </div>
            </nav>
        </div>
    );
}
}