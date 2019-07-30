import React from 'react';
import { connect } from 'react-redux';
import { logoutaction } from '../../utils/action/log'

class Logout extends React.Component {

    render(){
        
        this.props.logoutCall();
        var { history } = this.props;
        history.push('/')

        return (null);
    }
}

const mapStateToProps = (state) => {
    return {
      user: state
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logoutCall: () => dispatch(logoutaction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);