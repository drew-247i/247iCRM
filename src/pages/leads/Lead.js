import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Delete, Edit, AssignmentTurnedIn, Assignment} from "@material-ui/icons";
import GetList from "./GetList";
import AddLead from "./AddLead";

export default class Lead extends Component {

  constructor() {
    super();
    this.state = {
      showAddModal: false,
    };
  }


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

  render() {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Leads</h1>
              </div>
              <div className="col-sm-6">
                <div className="btn-group float-right">
                <AddLead parentCallback={this.handleAddCallback}/>
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
                    <th scope="col">Lead Name</th>
                    <th scope="col">Company</th>
                    <th scope="col">Lead Status</th>
                    <th scope="col">Lead Source</th>
                    <th scope="col">Service</th>
                    <th scope="col">Skill Requirement</th>
                    <th scope="col">Timeline</th>
                    <th scope="col">Competitor</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <GetList added={this.state.added} parentCallback={this.handleListCallback} />
              </table>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
