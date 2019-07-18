import React , {Component} from 'react';

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        localStorage.setItem('LoginToken', "");
        var { history } = this.props;
        history.push('/')

        return (null);
    }
}

