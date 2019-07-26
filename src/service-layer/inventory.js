import axios from 'axios';

export function additem(item, callback) {
    axios.post('/inventory/additem', {
        shopid: item.shopid,
        itemname : item.itemname,
        quantity : item.quantity,
        price : item.price,
        mass : item.mass,
        image : '',
      })
      .then( (response) => {
           console.log("sdffad",response)
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
export function getitem(shopid, callback) {
    axios.get('/inventory/getitems', { params :{
      shopid: shopid,
      }})
      .then( (response) => {
        
        if(response.data.code === 500) 
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