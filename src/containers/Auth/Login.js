import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  state = {
    username: "",
    password: "",
    isShowPassword: false,
    errMessage: "",
  };

  handleOnChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handleOnChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleShowHidePassword = () => {
    this.setState((prev) => ({ isShowPassword: !prev.isShowPassword }));
  };

  handleLogin = async () => {
    this.setState({ errMessage: "" });
    try {
      console.log("Đang gửi login request:", this.state.username);
      const response = await handleLoginApi(
        this.state.username,
        this.state.password
      );
      console.log("Response handleLoginApi trả về:", response);

      const data = response?.data ?? response;
      console.log("Dữ liệu sau unpack:", data);

      if (data && data.user) {
        this.props.userLoginSuccess(data.user);
        this.props.navigate("/system/user-manage");
        return;
      }

      this.setState({
        errMessage: (data && data.message) || "Đăng nhập thất bại",
      });
    } catch (error) {
      console.error("Lỗi khi login:", error);
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Lỗi kết nối server";
      this.setState({ errMessage: msg });
    }
  };

  render() {
    const { username, password, isShowPassword, errMessage } = this.state;
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>

            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={this.handleOnChangeUsername}
              />
            </div>

            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={this.handleOnChangePassword}
                />
                <span
                  onClick={this.handleShowHidePassword}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className={
                      this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"
                    }
                  />
                </span>
              </div>
              {errMessage && (
                <div className="col-12" style={{ color: "red" }}>
                  {errMessage}
                </div>
              )}
            </div>

            <div className="col-12">
              <button
                type="button"
                className="btn-login"
                onClick={this.handleLogin}
              >
                Login
              </button>
            </div>

            <div className="col-12">
              <span className="forgot-password">Forgot your password</span>
            </div>

            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or login with: </span>
            </div>

            <div className="col-12 social-login">
              <i className="fab fa-google-plus"></i>
              <i className="fab fa-facebook-f"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  navigate: (path) => dispatch(push(path)),
  userLoginSuccess: (userInfor) =>
    dispatch(actions.userLoginSuccess(userInfor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
