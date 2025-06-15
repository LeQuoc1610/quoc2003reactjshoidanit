import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
import ModalUser from "./ModalUser";
import { createNewUser } from "../../services/userService";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false, 
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
    
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  getAllUsersFromReact = async() => {
    let response = await getAllUsers("ALL");
    if(response && response.errCode === 0){
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  createNewUserService = async (data) =>{
    try {
      let response = await createNewUser(data);
      if (response && response.errCode === 0) {
        this.toggleUserModal();
        await this.getAllUsersFromReact(); 
      } else {
        alert(response.errMessage);
      }
    
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;

    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUserService}
        />
        <div className="title text-center">Manage with Eric</div>
        <div className="btn btn-primary px-3" onClick={this.handleAddNewUser}>
          <i className="fas fa-plus"></i> Add new User
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
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button className="btn-edit">
                          <i className="far fa-edit"></i>
                        </button>
                        <button className="btn-delete">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(UserManage);