import React, {Component}  from 'react';
import './Register.css'
import Navbar from './Navbar'
import { register } from './service-layer/users'

class Register extends Component {

    constructor (props) {
        super(props)
        
        this.state = {
            username : '',
            name : '',
            password : '',
            confirmpassword : '',
            email : '',
            error : null,
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
        
        const { username, name, password, confirmpassword, email } = this.state;
        var user = {
            username : username,
            name : name,
            password : password,
            email : email,
        }

        if (password === confirmpassword) {
            register(user, (redirect) => {
                if(redirect === 0) {
                    this.setState({
                        redirect : true
                    });
                }
            })
        }
        else {
            alert("password & confirmpassword are not same");
        }

    };

    render () 
    {
        const { history } = this.props;
        
        if (this.state.redirect == true)
            history.push("/dashboard")
        
        return (
            <div>
                <Navbar />
                <div className="jumbotron">
                    <h1>Register</h1>
                </div>
                <form className='align-webkit-center' onSubmit={this.onSubmit}>
                <div className="form-group width-30">
                    <input type='text' name='username' placeholder='Username' className='form-control'  onChange={this.onChange}/>
                </div>
                <div className="form-group width-30">
                    <input type='text' name='name' placeholder='Name' className='form-control'  onChange={this.onChange}/>
                </div>
                <div className="form-group width-30">
                    <input type='password' name='password' placeholder='Password' className='form-control'  onChange={this.onChange}/>
                </div>
                <div className="form-group width-30">
                    <input type='password' name='confirmpassword' placeholder='Confirm Password' className='form-control'  onChange={this.onChange}/>
                </div>
                <div className="form-group width-30">
                    <input type='email' name='email' placeholder='Email' className='form-control'  onChange={this.onChange}/>
                </div>
                <button className='btn btn-primary' type='submit'>Register</button>
                
            </form>
        </div>
        );
    }
}

export default Register;