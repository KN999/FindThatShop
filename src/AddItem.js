import React, {Component} from 'react'
import axios from 'axios';
import Navbar2 from './Navbar2'
import { additem } from './service-layer/inventory'

export default class AddItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            shopname: '',
            itemname : '',
            quantity : '',
            price : '',
        }
    }
    onSubmit = (event) => {
        event.preventDefault()
        var item = {
            shopname: this.state.shopname,
            itemname: this.state.itemname,
            quantity: this.state.quantity,
            price: this.state.price,
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
            <div>
                <Navbar2 />
                <form className='align-webkit-center' onSubmit={this.onSubmit}>
                <div className="form-group width-30">
                    <input type='text' name='shopname' placeholder='Shop Name' className='form-control'  onChange={this.onChange}/>
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
                <button className='btn btn-primary' type='submit'>Add Shop</button>
                
            </form>
        </div>
        );
    }
}