import axios from 'axios';

export function FindThatShop(userquery, callback) {
    axios.get('/search/searchQuery', { params :{
        query: userquery,
      }})
      .then( (response) => {
        
        if(response.data.code === 405)
        {  
            console.log('got the response', response)
            callback(response)
        }
        else 
        {
           alert(response.data.message);
           console.log("ERROR",response.data.message);
        }
      })
      .catch(function (error) {
        
        alert('error')
        console.log(error);
      });
    
}