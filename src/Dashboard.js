import React, { Component } from 'react';
import { getshop } from './service-layer/shops'
import { connect } from 'react-redux';
import shop from './shop.jpg'
import './Dashboard.css'

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shops : [],
        }
    }
    
    componentDidMount() {
        var self = this
        getshop('p', (response) => {
            self.setState({shops: response.data.shop.shops})
        })

    }

    render() {

        var image = <img src={shop} alt="Shop image" className="width-100 margin-10"/>

        console.log(this.props.user)
        console.log(this.state.shops)
        return(
            <div>
                <h1>Dashboard</h1>
                {this.state.shops.map(shop=>(
                    <div className="row align-items-center border border-style-inset margin-2 width-auto">
                        <div className="col-md-3 col-xs-3 text-left width-auto">
                            {image}
                        </div>
                        <div  className="col-md-8 col-xs-8 text-left width-auto">
                            Shop :{shop.shopName} <br />
                            Owner : {shop.shopOwner} <br />
                            Address : {shop.shopAddress} <br />
                            Contact Number : {shop.shopContactNo} <br />
                        </div>
                    </div>
                ))}                    
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      user: state
    }
};

export default connect(mapStateToProps)(Dashboard);