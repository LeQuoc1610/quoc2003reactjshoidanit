import { last } from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { createNewUser } from "../../services/userService";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
      gender: "1",
      roleId: "R1",
    };
  }

  componentDidMount() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phonenumber: "",
        gender: "1",
        roleId: "R1",
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.userEdit != prevProps.userEdit &&
      this.props.isEditMode === true
    ) {
      this.setState({
        email: this.props.userEdit.email,
        firstName: this.props.userEdit.firstName,
        lastName: this.props.userEdit.lastName,
        address: this.props.userEdit.address,
        phonenumber: this.props.userEdit.phonenumber,
        gender: this.props.userEdit.gender === true ? "1" : "0",
        roleId: this.props.userEdit.roleId,
        id: this.props.userEdit.id,
        password: "",
      });
    }
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "firstName", "lastName", "address"];
    if (!this.props.isEditMode) {
      arrInput.push("password");
    }

    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing paramater: " + arrInput[i]);
      }
    }
    return isValid;
  };

  handleAddNewUser = async () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      if (this.props.isEditMode) {
        // Sửa user
        await this.props.updateUser({
          id: this.state.id,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phonenumber: this.state.phonenumber,
          gender: this.state.gender,
          roleId: this.state.roleId,
        });
      } else {
        // Thêm mới user
        await this.props.createNewUser({
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phonenumber: this.state.phonenumber,
          gender: this.state.gender,
          roleId: this.state.roleId,
        });
      }
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggleFromParent}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader toggle={this.props.toggleFromParent}>
          Create a new user
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                onChange={(event) => this.handleOnChangeInput(event, "email")}
                value={this.state.email}
                disabled={this.state.isEditMode}
              />
            </div>

            {!this.props.isEditMode && (
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
                  value={this.state.password}
                />
              </div>
            )}

            <div className="input-container">
              <label>First name</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "firstName")
                }
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>Last name</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
                value={this.state.lastName}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, "address")}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleAddNewUser}>
            {this.props.isEditMode ? "Save changes" : "Add new"}
          </Button>{" "}
          <Button color="secondary" onClick={this.props.toggleFromParent}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalUser;
