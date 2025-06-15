import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/login';

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  language: state.app.language
});



const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
