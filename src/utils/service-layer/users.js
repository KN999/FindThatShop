import axios from 'axios';

export function register(user, callback) {
    axios.post('/user/register', {
        username: user.username,
        name : user.name,
        password: user.password,
        email: user.email
      })
      .then( (response) => {
           
        if(response.data.code === 303) 
        {  
            //localStorage.setItem('LoginToken', JSON.stringify(response.data))
            localStorage.setItem('Token', response.data.token)
            callback(0)
        }
        else 
        {
            console.log("ERROR",response.data.message);
        }
      })
      .catch(function (error) {
        alert('error')
        console.log(error);
      });
}

export function login(user, callback) {
    axios.post('/user/login', {
        username: user.username,
        password: user.password,
      })
      .then( (response) => {
           
        if(response.data.code === 102) 
        {  
            //localStorage.setItem('LoginToken', JSON.stringify(response.data))
            localStorage.setItem('Token', response.data.token)
            callback(0)
        }
        else 
        {
            console.log("ERROR",response.data.message);
        }
      })
      .catch(function (error) {
        alert('error')
        console.log(error);
      });
    
}