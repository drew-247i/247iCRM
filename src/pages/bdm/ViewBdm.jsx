import React, { Component } from "react";
import { Stepper, Step } from "react-form-stepper";
import { withRouter } from "react-router";
import { Check, Edit, GroupAdd } from "@material-ui/icons";
import EditBdm from "./EditBdm";
import AddCompanyAssigned from "./AddCompanyAssigned";
import axios from "axios";

class ViewBdm extends Component {
  state = {
    bdmDetail: [],
    companyAssigned: [],
    updateOccured: false,
  };
  constructor() {
    super();
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    let bdmId = this.props.match.params.id;
    axios.get("api/bdm/" + bdmId).then((res) => {
      this.setState({ bdmDetail: res.data });
      axios.get("api/company_by_bdm/" + this.state.bdmDetail.id).then((res) => {
        this.setState({ companyAssigned: res.data });
      });
    });
  };

  componentDidUpdate() {
    if (this.state.updateOccured) {
      this.getDetails();
      this.setState({ updateOccured: false });
    }
  }

  handleAddCallback = (addData) => {
    if (addData) {
      this.setState({ updateOccured: true });
    }
  };

  render() {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">View BDM </h1>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="form-group col-md-8 col-sm-12">
                <div className="card card-default" style={{ height: "96%" }}>
                  <div className="card-header">
                    <h3 className="card-title">Details</h3>
                    <div className="card-tools">
                      <EditBdm
                        id={this.state.bdmDetail.id}
                        parentCallback={this.handleAddCallback}
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="form-group col-md-6 col-sm-12">
                        <label>Name</label>
                        <p>{this.state.bdmDetail.name}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6 col-sm-12">
                        <label>Position</label>
                        <p>{this.state.bdmDetail.position}</p>
                      </div>
                      <div className="form-group col-md-6 col-sm-12">
                        <label>Department</label>
                        <p>{this.state.bdmDetail.department}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6 col-sm-12">
                        <label>Personal Email</label>
                        <p>{this.state.bdmDetail.email_personal}</p>
                      </div>
                      <div className="form-group col-md-6 col-sm-12">
                        <label>Company Email</label>
                        <p>{this.state.bdmDetail.email_company}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-4 col-sm-12">
                        <label>Mobile Number 1</label>
                        <p>{this.state.bdmDetail.mobile_number_1}</p>
                      </div>
                      <div className="form-group col-md-4 col-sm-12">
                        <label>Mobile Number 2</label>
                        <p>{this.state.bdmDetail.mobile_number_2}</p>
                      </div>
                      <div className="form-group col-md-4 col-sm-12">
                        <label>Mobile Number 3</label>
                        <p>{this.state.bdmDetail.mobile_number_3}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-4 col-sm-12">
                        <label>Telephone Number 1</label>
                        <p>{this.state.bdmDetail.tel_number_1}</p>
                      </div>
                      <div className="form-group col-md-4 col-sm-12">
                        <label>Telephone Number 2</label>
                        <p>{this.state.bdmDetail.tel_number_2}</p>
                      </div>
                      <div className="form-group col-md-4 col-sm-12">
                        <label>Telephone Number 3</label>
                        <p>{this.state.bdmDetail.tel_number_3}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-4 col-sm-12">
                        <label>Local Number 1</label>
                        <p>{this.state.bdmDetail.local_number_1}</p>
                      </div>
                      <div className="form-group col-md-4 col-sm-12">
                        <label>Local Number 2</label>
                        <p>{this.state.bdmDetail.local_number_2}</p>
                      </div>
                      <div className="form-group col-md-4 col-sm-12">
                        <label>Local Number 3</label>
                        <p>{this.state.bdmDetail.local_number_3}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-4 col-sm-12">
                <div className="card card-default" style={{ height: "96%" }}>
                  <div className="card-header">
                    <h3 className="card-title">Assigned Companies</h3>
                    <div className="card-tools">
                      <AddCompanyAssigned
                        id={this.props.match.params.id}
                        parentCallback={this.handleAddCallback}
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {this.state.companyAssigned.map((company) => (
                        <div className="info-box mb-3 bg-">
                          <div className="info-box-content" key={company.id}>
                            <div className="info-box-text">
                              {company.company_name}
                            </div>
                            <div className="info-box-number">
                              Start: {company.date_start}
                            </div>
                            <div className="info-box-number">
                              End: {company.date_end}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default withRouter(ViewBdm);
