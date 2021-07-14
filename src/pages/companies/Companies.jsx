import React, { Component } from "react";
import {
  Delete,
  Edit,
  AssignmentTurnedIn,
  Assignment,
} from "@material-ui/icons";
import AddCompanyModal from "./AddCompanyModal";
import GetList from "./GetList";

import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

export default class Companies extends Component {
  constructor() {
    super();
    this.state = {
      showAddModal: false,
    };
    this.handleShowAddModal = this.handleShowAddModal.bind(this);
    this.notification = this.notification.bind(this);
  }

  handleShowAddModal = (e) => {
    this.setState({ showAddModal: true });
  };

  handleAddCallback = (addData) => {
    if(addData){
      this.setState({added: true})
    }
  }

  handleListCallback = (listData) => {
    if(listData){
      this.setState({added: false})
    }
  }

  notification = () => {
    store.addNotification({
      title: "Add new account successful",
      message: " ",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated animate__fadeIn"],
      animationOut: ["animate__animated animate__fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
      width: 600,
    });
    console.log("!");
  };
  render() {
    return (
      <div className="content-wrapper">
        <ReactNotification />
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Companies</h1>
              </div>
              <div className="col-sm-6">
                <div className="btn-group float-right">
                  <AddCompanyModal parentCallback={this.handleAddCallback}  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Company</th>
                    <th scope="col">Industry</th>
                    <th scope="col">Account Type</th>
                    <th scope="col">Technology</th>
                    <th scope="col">Employee Size</th>
                    <th scope="col">Annual Revenue</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <GetList added={this.state.added} parentCallback={this.handleListCallback}/>
              </table>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
