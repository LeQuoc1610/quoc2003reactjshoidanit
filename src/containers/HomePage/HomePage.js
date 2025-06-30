import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';

class HomePage extends Component {

    render() {
        
        return (
            <div>
                <HomeHeader />               
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
