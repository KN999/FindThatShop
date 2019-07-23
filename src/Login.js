import React, {Component} from 'react';
import './Login.css'
import axios from 'axios';
import Navbar from './Navbar'
import { login } from './service-layer/users'

export default class Login extends Component  {
    constructor(props) {
        super(props)

        this.state = {
            username : '',
            password : '',
            error : null,
            resirect : false,
        }
        
    }

    onChange = (event) => {
        this.setState ({
            [event.target.name] : event.target.value,
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const { username, password } = this.state;
        var user = {
            username : username,
            password : password
        }

        login(user, (redirect) => {
            if(redirect === 0) {
                this.setState({
                    redirect : true
                });
            }
        })

    }

    render () {

        const {
            username,
            password,
            error,
          } = this.state;
      

        const isInvalid =
        password === '' ||
        username === '';

        const { history } = this.props
        if (this.state.redirect === true)
        {   
            history.push('/dashboard')
        }

        return (<div>
            <Navbar />
            <div className="jumbotron">
                <h1>Login</h1>
            </div>
            <form onSubmit={this.onSubmit}> 
            <div className="Login">
                <div className="form-group align-webkit-center">
                    <input type="text" value={this.state.username} name="username" placeholder="Username" className="form-control width-25" onChange={this.onChange}/>
                </div>
                <div className="form-group align-webkit-center">
                    <input type="password" value={this.state.password} name="password" placeholder="Password" className="form-control width-25" onChange={this.onChange} />
                </div>
                <button disabled={isInvalid} type="submit" className="btn btn-primary" >Log in</button>
            </div>
            {error && <p>{error.message}</p>}
            </form>
            </div>
        );
    }

}