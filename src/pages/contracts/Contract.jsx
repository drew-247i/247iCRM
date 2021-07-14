import React, { Component } from "react";
import { Add, Edit } from "@material-ui/icons";
import GetList from "./GetList";
export default class contracts extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Contracts</h1>
              </div>
              <div className="col-sm-6">
                <div className="btn-group float-right">
                  <button className="btn btn-sm btn-outline-primary">
                    <Add/> Add New Contract
                  </button>
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
                    <th scope="col">Lead ID</th>
                    <th scope="col">Opportunity ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Terms</th>
                    <th scope="col">SLA</th>
                    <th scope="col">Place Of Assignment</th>
                    <th scope="col">Contract Repository</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <GetList />
              </table>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
