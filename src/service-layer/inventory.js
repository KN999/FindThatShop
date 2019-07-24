import axios from 'axios';

export function additem(item, callback) {
    axios.post('/item/additem', {
        shopname: item.shopname,
        itemname : item.itemname,
        quantity : item.quantity,
        price : item.price,
        image : '',
      })
      .then( (response) => {
           
        if(response.data.code === 503) 
        {  
            //localStorage.setItem('LoginToken', JSON.stringify(response.data))
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

// getitem
export function getitem(shopname, callback) {
    axios.get('/item/getitem', { params :{
      shopname: shopname,
      }})
      .then( (response) => {
        
        if(response.data.code === 404) 
        {  
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