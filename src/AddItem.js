import React, {Component} from 'react'
import { additem } from './service-layer/inventory'
import { getshop } from './service-layer/shops'
import './AddItem.css'

export default class AddItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            shopid: '',
            itemname : '',
            quantity : '',
            price : '',
            mass : '',
            shops : []
        }
    }

    componentDidMount() {
        var self = this
        getshop('c', (response) => {
            self.setState({shops: response.data.shop.shops})
        })

    }

    onSubmit = (event) => {
        event.preventDefault()
        var item = {
            shopid: this.state.shopid,
            itemname: this.state.itemname,
            quantity: this.state.quantity,
            price: this.state.price,
            mass : this.state.mass,
        }
        
        additem(item, (redirect) => {
            if(redirect === 0) {
                this.setState({
                    redirect : true
                });
            }
        })
    };
    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    render() {

        const { history } = this.props;
        if (this.state.redirect == true)
        {
            history.push("/dashboard")
        }
    
        return (
            <div className="margin-top-50px">
                <form className='align-webkit-center' onSubmit={this.onSubmit}>
                <div className="form-group width-30">
                   <select className="browser-default custom-select" value={this.state.shopid} onChange={this.onChange} name="shopid">  
                        <option disabled selected >Shop Name</option>
                       {this.state.shops.map(shop=>(
                           <option value={shop.shopid}>{shop.shopName}</option>
                       ))}
                    </select>
                </div>
                <div className="form-group width-30">
                    <input type='text' name='itemname' placeholder='Item Name' className='form-control'  onChange={this.onChange}/>
                </div>
                <div className="form-group width-30">
                    <input type='text' name='quantity' placeholder='Quantity' className='form-control'  onChange={this.onChange}/>
                </div>
                <div className="form-group width-30">
                    <input type='tel' name='price' placeholder='Price' className='form-control'  onChange={this.onChange}/>
                </div>
                <div className="form-group width-30">
                    <input type='tel' name='mass' placeholder='Mass' className='form-control'  onChange={this.onChange}/>
                </div>
                <button className='btn btn-primary' type='submit'>Add Item</button>
                
            </form>
        </div>
        );
    }
}