import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Delete, Edit, AssignmentTurnedIn, Assignment} from "@material-ui/icons";
import GetList from "./Getlist";

export default class Opportunity extends Component {

  
  render() {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Opportunities</h1>
              </div>
              <div className="col-sm-6">
                <div className="btn-group float-right">
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
                    <th scope="col">Opportunity Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Source</th>
                    <th scope="col">Status</th>
                    <th scope="col">Current Status<br/>Start Date</th>
                    <th scope="col">Service Line</th>
                    <th scope="col">Projected<br/>Start Date</th>
                    <th scope="col">Probability</th>
                    <th scope="col">Next Step</th>
                    <th scope="col"></th>
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
