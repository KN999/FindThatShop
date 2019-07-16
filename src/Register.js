import React, {Component}  from 'react';
import './Register.css'
import axios from 'axios';

const INITIAL_STATE = {
    username : '',
    name : '',
    password : '',
    confirmpassword : '',
    email : '',
    error : null,
    redirect : false,
};

class Register extends Component {

    constructor (props) {
        super(props)
        console.log(this.state)
        this.state = {INITIAL_STATE}
    }

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    onSubmit = (event) => {
        event.preventDefault()
        console.log("^^^^^^^^^^^^^^^^",this.state)
        const { username, name, password, confirmpassword, email } = this.state;
        
        axios.post('/index/register', {
            username: username,
            name : name,
            password: password,
            confirmpassword : confirmpassword,
            email: email
          })
          .then( (response) => {
             if(JSON.stringify(response.data) == 'true') 
             {  
                 console.log("resp",response)
                 
                 this.setState({
                     redirect : true
                 },()=>console.log("()()()()",this.state.redirect))
                //this.context.history.push('/')
                alert(JSON.stringify(response.data))
             }
             else 
             {
                alert('in else')
                alert(JSON.stringify(response.data))
                this.context.history.push('/login')
                
             }
          })
          .catch(function (error) {
            alert('error')
            console.log(error);
          });
    };
            
    


    render () 
    {
        
        const {
            username,
            name,
            passwordOne,
            passwordTwo,
            email,
            error,
            } = this.state;
        

        const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '' ||
        name === '';
        
        const { history } = this.props;
        console.log("****************",this.state.redirect)
        if (this.state.redirect == true)
        {
            history.push("/")
        }
        

        return (
            <form className='align-webkit-center' onSubmit={this.onSubmit}>
            <div className="form-group width-30">
                <input type='text' name='name' placeholder='Name' className='form-control'  onChange={this.onChange}/>
            </div>
            <div className="form-group width-30">
                <input type='text' name='username' placeholder='Username' className='form-control'  onChange={this.onChange}/>
            </div>
            <div className="form-group width-30">
                <input type='text' name='password' placeholder='Password' className='form-control'  onChange={this.onChange}/>
            </div>
            <div className="form-group width-30">
                <input type='text' name='confirmpassword' placeholder='Confirm Password' className='form-control'  onChange={this.onChange}/>
            </div>
            <div className="form-group width-30">
                <input type='text' name='email' placeholder='Email' className='form-control'  onChange={this.onChange}/>
            </div>
            <button className='btn btn-warning' type='submit'>Register</button>
            {error && <p>{error.message}</p>}
        </form>
        );
    }
}





export default Register;