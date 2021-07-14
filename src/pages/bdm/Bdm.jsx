import React, { Component } from "react";
import GetList from "./GetList";
import AddBdm from "./AddBdm";
export default class Bdm extends Component {
  constructor() {
    super();
    this.state = {
      showAddModal: false,
    };
    this.handleShowAddModal = this.handleShowAddModal.bind(this);
  }

  handleShowAddModal = (e) => {
    this.setState({ showAddModal: true });
  };

  handleAddCallback = (addData) => {
    if (addData) {
      this.setState({ added: true });
    }
  };

  handleListCallback = (listData) => {
    if (listData) {
      this.setState({ added: false });
    }
  };

  render() {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">BDM</h1>
              </div>
              <div className="col-sm-6">
                <div className="btn-group float-right">
                    <AddBdm parentCallback={this.handleAddCallback}/>
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
                    <th scope="col">Contact Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Department</th>
                    <th scope="col">Emails</th>
                    <th scope="col">Mobile No.</th>
                    <th scope="col">Telephone No.</th>
                    <th scope="col">Local No.</th>
                    <th scope="col">Actions</th>
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
