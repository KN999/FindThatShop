import React, {Component} from 'react'
import axios from 'axios';
import Navbar from './Navbar2'

var shopnames = [];

export default class AddItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            itemname : '',
            quantity : '',
            price : '',
            unmounted : false,
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
            console.log("shops = ",JSON.stringify(shops))
            console.log("shops.length = ",shops.length)
            for(var i = 0;i < shops.length; i ++) {
                shopnames.push(shops[i]);
                
                console.log("shop[i]",)
            }
            
                //take the table data in loop and pass it to the function that renders it.
                
        })
    }
    componentWillUnmount(){
        this.unmounted = true;
    }
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
        console.log("#$#$$#$$$$$##$###$#"+JSON.stringify(shopnames))
        return (
            <div>
                <Navbar />
                <form className='align-webkit-center' onSubmit={this.onSubmit}>
                
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
            <ul>
                        {shopnames.map(shop=>(
                            <li>{shop.name}</li>
                        ))}
                    </ul>
        </div>
        );
    }
}

