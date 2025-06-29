import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class HomeHeader extends Component {

    render() {
        
        return (
           <React.Fragment>
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className='left-content'>
                        <i class="fas fa-bars"></i>
                        <div className='header-logo'>

                        </div>
                    </div>

                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b>Chuyên khoa</b></div>
                            <div className='subs-title'>Tìm bác sĩ theo chuyên khoa</div>
                        </div>
                        <div className='child-content'>
                            <div><b>Cơ sở y tế</b></div>
                            <div className='subs-title'>Chọn bệnh viện phòng khám</div>
                        </div>
                        <div className='child-content'>
                            <div><b>Bác Sĩ</b></div>
                            <div className='subs-title'>Chọn bác sĩ giỏi</div>
                        </div>
                        <div className='child-content'>
                            <div><b>Gói khám</b></div>
                            <div className='subs-title'>Khám sức khỏe tổng quát</div>
                        </div>

                    </div>

                    <div className='right-content'>
                        <div className="support"><i class="fas fa-question-circle">Hỗ Trợ</i></div>
                        <div className="flag">VN</div>
                        
                    </div>
                </div>
            </div>
            <div className="home-header-banner">
                    <div className='title1'></div>
                    <div className='title2'></div>
                    <div className='search'></div>
                    <div className='options'></div>

                </div>
            </React.Fragment> 
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
