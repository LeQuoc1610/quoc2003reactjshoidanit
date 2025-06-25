import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import ModalUser from "./ModalUser";
import {
  createNewUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../../services/userService";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isEditMode: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({ arrUsers: response.users });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleUserModal = () => {
    this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
  };

  createNewUserService = async (data) => {
    try {
      let response = await createNewUser(data);
      console.log("Kết quả từ backend:", response);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  updateUserService = async (data) => {
    try {
      let response = await updateUser(data);
      if (response && response.errCode === 0) {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
          isEditMode: false,
          userEdit: null,
        });
      } else {
        alert(response.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (userId) => {
    try {
      let res = await deleteUser(userId);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessage || "Lỗi khi xóa người dùng");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handlEditUser = (user) => {
    this.setState({
      isOpenModalUser: true,
      isEditMode: true,
      userEdit: user,
    });
  };

  render() {
    let arrUsers = this.state.arrUsers;
    console.log(arrUsers);

    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUserService}
          updateUser={this.updateUserService}
          userEdit={this.state.userEdit}
          isEditMode={this.state.isEditMode}
        />

        <div className="title text-center">MANAGE WITH ERIC</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={this.handleAddNewUser}
          >
            <i className="fas fa-plus"></i> Add new User
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <thead>
              <tr>
                <th>Email</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.arrUsers &&
                this.state.arrUsers.map((item, index) => (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handlEditUser(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserManage;
