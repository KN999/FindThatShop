//Rendering details
//merging details and gettting data from the merged table
    //Right now you are getting only table details but you also need table items

import React, { Component } from 'react';
import axios from 'axios';


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            usersShop : []
        }
    }
    
    componentDidMount() {
        axios.get('/shop/dashboard', {
            params: {
                user_id : localStorage.getItem('LoginToken')
            }
        }).then(res => {
            var shops = res.data;
            var usersShop = []

            alert(shops.length)
            for(var i = 0;i < shops.length; i ++) {
                usersShop.push(shops[i]);
            }
            console.log(usersShop)
            alert(JSON.stringify(shops))
            alert(JSON.stringify(usersShop))
                //take the table data in loop and pass it to the function that renders it.
                
            })
    }
    
    render() {
        console.log("&&&&&&&",this.props)   
        return(
            <div>
                <Navbar />
                <h1>Dashboard</h1>
                
            </div>
        );
    }
}

class Navbar extends React.Component {
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
                    <li className="nav-item"><a className="nav-link" href="/Dashboard/EditShop">Edit Shop</a></li>
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