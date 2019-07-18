import React, {Component} from 'react'
import axios from 'axios';

export default class AddShop extends React.Component {
    constructor (props) {
        super(props)
        console.log(this.state)
        this.state = {
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
        console.log("^^^^^^^^^^^^^^^^",this.state)
        const { 
        shopname,
        shopowner,
        shopaddress,
        shopcontactno  } = this.state;
        var Token = localStorage.getItem('LoginToken')
        alert(Token)

        axios.post('/shop/addshop', {
            user_id : Token,
            shopname : shopname,
            shopowner : shopowner,
            shopaddress : shopaddress,
            shopcontactno : shopcontactno,
          })
          .then( (response) => {
             if(JSON.stringify(response.data) === 'true') 
             {  
                 console.log("resp",response)
                 this.setState({
                     redirect : true
                 })
                 alert("99999999999 in if ",JSON.stringify(response.data))
             }
             else 
             {
                alert("99999999999 in else",JSON.stringify(response.data))
                console.log("sorry shop was not added")  
             }
          })
          .catch(function (error) {
            alert('error')
            console.log(error);
          });
    };

    render() {
        const { history } = this.props;
        if (this.state.redirect == true)
        {
            history.push("/dashboard")
        }
        
        return (
            <div>
                <Navbar />
                <form className='align-webkit-center' onSubmit={this.onSubmit}>
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