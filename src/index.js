import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
/*
import { createStore } from 'redux;'
import { Provider } from 'react-redux'

// Reducer
const IsAuth = (user = {
    auth: false,
    token : ''
}, action) => {
    switch(action.type) {
        case "login" :
            user.token = action.token;
            user.auth = true;
            break;
        case "logout" :
            user.token = action.token;
            user.auth = false;
            break;
    }

    return user;
}

// Creating Store
const store = createStore(IsAuth, {});

// Logging Console when store get updated
store.subscribe(()=>{
    console.log("Store updated!", store.getState());
})

// Calling the Reducer to change the state with action
store.dispatch({
    type: "login",
    payload: 'username'
})
store.dispatch({
    type: "logout",
    payload: ''
})

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>,
 document.getElementById('root')
 );

*/

ReactDOM.render(<App />,
 document.getElementById('root')
 );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

