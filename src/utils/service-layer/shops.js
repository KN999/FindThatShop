import axios from 'axios';

export function addshop(shop, callback) {
    axios.post('/shop/addshop', {
        username: shop.token,
        shopname: shop.shopname,
        shopowner: shop.shopowner,
        shopaddress: shop.shopaddress,
        shopcontactno: shop.shopcontactno,
        image : '',
      })
      .then( (response) => {
           
        if(response.data.code === 403) 
        {  
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

export function usershops(token, callback) {
    axios.get('/shop/usershops', { params :{
        token: token,
      }})
      .then( (response) => {
        
        if(response.data.code === 404) 
        {  
            console.log('got the response', response)
            callback(response)
        }
        else 
        {
           //localStorage.setItem('LoginToken', JSON.stringify(response.data))
           console.log("ERROR",response.data.message);
        }
      })
      .catch(function (error) {
        
        alert('error')
        console.log(error);
      });
    
}