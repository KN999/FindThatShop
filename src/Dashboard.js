//Rendering details
//merging details and gettting data from the merged table
    //Right now you are getting only table details but you also need table items

import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar2'

var users = [];

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            users : [],
            unmounted : false
        }
    }
    
    componentDidMount() {
        axios.get('/shop/dashboard', {
            params: {
                user_id : localStorage.getItem('LoginToken')
            }
        }).then(res => {
            if (this.unmounted) return;
            var shops = res.data;
            var usersShop = []

            
            for(var i = 0;i < shops.length; i ++) {
                
                users.push(shops[i])                
                usersShop.push(shops[i]);
            }
            this.Alert(usersShop)
            console.log(usersShop)
            
                //take the table data in loop and pass it to the function that renders it.
                
            })
    }
    componentWillUnmount(){
        this.unmounted = true;
    }

    Alert (data) {
        this.setState({
            users: [
                data
            ]
        })
        console.log("^^&^^&^&^&^&^&^&^&^&^", users)
        console.log("~~~~~~~~~~~~~~~~~~~~~",JSON.stringify(this.users))
        
    }
    
    render() {
        return(
            <div>
                <Navbar />
                <h1>Dashboard</h1>
                
                   {users.map(detail=>(
                       <ul>
                       <li>{detail.shopname}</li>
                       <li>{detail.shopowner}</li>
                       <li>{detail.shopaddress}</li>
                       <li>{detail.shopcontactno}</li>
                       </ul>
                    ))}
            </div>
        );
    }
}

