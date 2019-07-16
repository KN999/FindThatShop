import React, {Component} from 'react';
import './Login.css'
import axios from 'axios';

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
        //alert(`username is ${this.state.username} and password is ${this.state.password}`)
        event.preventDefault()
        const { username, password } = this.state;

        axios.post('/index/login', {
            username: username,
            password: password,
          })
          .then( (response) => {
            if(JSON.stringify(response.data) == 'true') 
            {   
                this.setState({
                    redirect : true
                })
            }
         })
         .catch(function (error) {
           alert('error')
           console.log(error);
         });
        
          
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
            history.push('/')
        }

        return (<div>
            <form onSubmit={this.onSubmit}> 
            <div className="Login">
                <div className="form-group align-webkit-center">
                    <input type="text" value={this.state.username} name="username" placeholder="Username" className="form-control width-25" onChange={this.onChange}/>
                </div>
                <div className="form-group align-webkit-center">
                    <input type="password" value={this.state.password} name="password" placeholder="Password" className="form-control width-25" onChange={this.onChange} />
                </div>
                <button disabled={isInvalid} type="submit" className="btn btn-warning" >Log in</button>
            </div>
            {error && <p>{error.message}</p>}
            </form>
            </div>
        );
    }

}