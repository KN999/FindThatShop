import React from 'react';
import { getshop } from './service-layer/shops'
import { getitem } from './service-layer/inventory'
import './GetShop.css'
import shop from './shop.jpg'

export default class GetShop extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            shopid:'',
            shops : [],
            items : []
        }
    }

    componentDidMount() {
        var self = this
        getshop('c', (response) => {
            self.setState({shops: response.data.shop.shops})
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        var self = this
        console.log(this.state.shopid)
        getitem(this.state.shopid, (response) => {
            self.setState({items: response.data.item.items})
        })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        });
        
    }

    render() {

        console.log("$$$$$$$$$$$$$$$",this.state.items)
        return(
            <div className="margin-top-50px">
                <form className='align-webkit-center' onSubmit={this.onSubmit}>
                    <div className="form-group width-30">
                    <select className="browser-default custom-select" value={this.state.shopid} onChange={this.onChange} name="shopid">  
                            <option selected disabled>Shop Name</option>
                        {this.state.shops.map(shop=>(
                            <option value={shop.shopid}>{shop.shopName}</option>
                        ))}
                        </select>
                    </div>
                    <button className='btn btn-primary' type='submit'>Search</button>
                </form>
                <div>
                    {this.state.items.map(item=>(
                        <div className="row align-items-center border border-style-inset margin-2 width-auto">
                            <div className="col-md-3 col-xs-3 text-left width-auto">
                            <img src={shop} alt="Shop image" className="width-100 margin-10"/>

                            </div>
                            <div  className="col-md-8 col-xs-8 text-left width-auto">
                                Item :{item.itemName} <br />
                                Price : {item.itemPrice} <br />
                                Mass : {item.itemMass} <br />
                                Quantity : {item.itemQuantity} <br />
                            </div>
                        </div>
                    ))}      
                </div>
            </div>
        )
    }
}