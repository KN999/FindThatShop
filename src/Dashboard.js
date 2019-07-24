import React, { Component } from 'react';
import Navbar2 from './Navbar2'
import { getshop } from './service-layer/shops'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shops : {},
        }
    }
    
    componentDidMount() {
        getshop('a', (response) => {
            this.setState({
                shops : response.data.shops
            })
            
        })
    }

    render() {
        console.log(this.state.shops)
        return(
            <div>
                <Navbar2 />
                <h1>Dashboard</h1>
            </div>
        );
    }
}