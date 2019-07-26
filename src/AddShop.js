// Need to remove state username and add state image
import React, {Component} from 'react'
import { addshop } from './service-layer/shops'

export default class AddShop extends React.Component {
    constructor (props) {
        super(props)
        console.log(this.state)
        this.state = {
            username : '', 
            shopname : '',
            shopowner : '',
            shopaddress : '',
            shopcontactno : '',
            redirect : false,
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    onSubmit = (event) => {
        event.preventDefault()
        var shop = {
            username : this.state.username,
            shopname: this.state.shopname,
            shopowner: this.state.shopowner,
            shopaddress: this.state.shopaddress,
            shopcontactno: this.state.shopcontactno,
        }
        
        addshop(shop, (redirect) => {
            if(redirect === 0) {
                this.setState({
                    redirect : true
                });
            }
        })
    };

    render() {

        const { history } = this.props;

        if (this.state.redirect == true)
            history.push("/dashboard")
        
        return (
            <div>
                <form className='align-webkit-center' onSubmit={this.onSubmit}>
                <div className="form-group width-30">
                    <input type='text' name='username' placeholder='username' className='form-control'  onChange={this.onChange}/>
                </div>
                <div className="form-group width-30">
                    <input type='text' name='shopname' placeholder='Shop Name' className='form-control'  onChange={this.onChange}/>
                </div>
                <div className="form-group width-30">
                    <input type='text' name='shopowner' placeholder='Shop Owner' className='form-control'  onChange={this.onChange}/>
                </div>
                <div className="form-group width-30">
                    <input type='text' name='shopaddress' placeholder='Shop Address' className='form-control'  onChange={this.onChange}/>
                </div>
                <div className="form-group width-30">
                    <input type='tel' name='shopcontactno' placeholder='Contact No.' className='form-control'  onChange={this.onChange}/>
                </div>
                <button className='btn btn-primary' type='submit'>Add Shop</button>
                
            </form>
        </div>
        );
    }
}
