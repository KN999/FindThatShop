const intialState = {
    auth : false,
    token: '',
}

const IsAuth = (state = intialState, action) => {
    console.log("in reducer")
    switch(action.type) {
        case "login" : {
            const token = action.payload;
            
            return {
                auth: true,
                token: token
            };
        }
        case "logout" : {
            return {
                auth: false,
                token: ''
            };
        }
                
        default: 
            return state;
    }
}

export default IsAuth;