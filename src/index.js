import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import  store  from './store'

ReactDOM.render(
    <Provider store = {store}>
    <App />
    </Provider>,
     document.getElementById('root')
);

serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

//import IsAuth from './reducer/IsAuth';
/*
//reducer
const IsAuth = (user = {
    auth: false,
    token : ''
}, action) => {
    switch(action.type) {
        case "login" :
            user = {
                ...user,
                token : action.token,
                auth : true,
            }
            break;
        case "logout" :
                user = {
                    ...user,
                    token : action.token,
                    auth : false,
                }
            break;
    }

    return user;
}

//action
const login = () => {
    return {
       type: 'login',
        token: 'username'
    }
}

const logout = () => {
    return {
       type: 'logout',
        token: ''
    }
}

//store
const store = createStore(
    IsAuth,
    {},
    applyMiddleware(logger)
);

//subscribe

store.subscribe( ()=> {console.log(store.getState())})

//dispatch
store.dispatch(login())

store.dispatch(logout())

*/