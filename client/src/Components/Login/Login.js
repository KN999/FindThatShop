import React, {Component} from 'react';
import { login } from '../../utils/service-layer/users'
import { connect } from 'react-redux';
import { loginaction } from '../../utils/action/log'
import './Login.css'

class Login extends Component  {
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

        var user = {
            username : this.state.username,
            password : this.state.password
        }

        login(user, (redirect) => {
            if(redirect === 0) {
                this.props.loginCall(user.username)
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
            <div className="jumbotron login-heading">
                <h1>Login</h1>
            </div>
            <form onSubmit={this.onSubmit}> 
            <div>
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

const mapStateToProps = state => {
    return {
      user: state
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loginCall: username => dispatch(loginaction(username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);