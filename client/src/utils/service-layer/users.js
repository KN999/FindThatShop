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
            localStorage.setItem('Token', user.username)
            console.log(")))))))))))))",localStorage.getItem('Token'))
            callback(0)
        }
        else if (response.data.code === 300) {
          alert("Username already taken");
        }
        else 
        {
            console.log("ERROR",response.data);
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
            localStorage.setItem('Token', user.username)
            callback(0)
        }
        else 
        {
            console.log("ERROR",response.data.message);
            alert("Username or Password is incorrect");
        }
      })
      .catch(function (error) {
        alert('error')
        console.log(error);
      });
    
}