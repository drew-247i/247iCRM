import React, { Component } from "react";
import { withRouter } from "react-router";
import { Stepper, Step, styleConfig } from "react-form-stepper";
import { format } from "date-fns";
import { Add, Edit } from "@material-ui/icons";
import axios from "axios";

class ViewOpportunity extends Component {
  state = {
    statusButtonText: "Mark Discovery as Completed",
    currentStatusDate: "",
    opportunity: [],
    relatedContact: [],
    relatedBdm: [],
    updateOccured: false,
  };

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    let lead_id = this.props.match.params.id;
    axios.get("api/opportunities_by_lead/" + lead_id).then((res) => {
      this.setState({ opportunity: res.data[0] });
      axios.get("api/leads/" + lead_id).then((res) => {
        this.setState({ lead: res.data });
        axios
          .get("api/contacts_by_company/" + res.data.company_id)
          .then((res) => {
            this.setState({ relatedContact: res.data });
          });
        axios.get("api/bdm_by_company/" + res.data.company_id).then((res) => {
          this.setState({ relatedBdm: res.data });
        });
      });
    });
  };

  dateFormatter = (getDate, dateFormat = "MMM dd, yyyy") => {
    if (getDate == null) {
    } else {
      let dates = new Date(getDate);
      let formattedDate = format(dates, dateFormat);
      return formattedDate;
    }
  };

  componentDidUpdate() {
    if (this.state.updateOccured) {
      this.getDetails();
      this.setState({ updateOccured: false });
    }
  }

  updateStatus = (status) => {
    axios
      .put("api/opportunities/" + this.state.opportunity.id, {
        opportunity_status_id: status,
        current_status_start_date: this.dateFormatter(
          Date(),
          "yyyy-MM-dd HH:mm:ss"
        ),
      })
      .then((res) => {
        this.setState({ updateOccured: true });
      });
  };

  handleStatus = () => {
    let statusValue = 1;
    if (this.state.opportunity.opportunity_status_id === 1) {
      statusValue = 2;
    } else if (this.state.opportunity.opportunity_status_id === 2) {
      statusValue = 3;
    } else if (this.state.opportunity.opportunity_status_id === 3) {
      statusValue = 4;
    } else if (this.state.opportunity.opportunity_status_id === 4) {
      statusValue = 5;
    }

    this.updateStatus(statusValue);
  };

  render() {
    let statusButtonText = this.state.statusButtonText;
    if (this.state.opportunity.opportunity_status_id === 2) {
      statusButtonText = "Mark Development as Completed";
    } else if (this.state.opportunity.opportunity_status_id === 3) {
      statusButtonText = "Mark Closing as Completed";
    } else if (this.state.opportunity.opportunity_status_id === 4) {
      statusButtonText = "Mark Contracted as Completed";
    } else if (this.state.opportunity.opportunity_status_id === 5) {
      statusButtonText = "All Activities Completed";
    }

    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">
                  View Opportunity: {this.state.opportunity.name}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <Stepper
                  activeStep={this.state.opportunity.opportunity_status_id - 1}
                  styleConfig={{ completedBgColor: "#5cb85c" }}
                >
                  <Step label="Discovery" />
                  <Step label="Development" />
                  <Step label="Closing" />
                  <Step label="Contracted" />
                </Stepper>
              </div>
              <div className="col-md-12 col-sm-12 justify-content-center text-center">
                <button
                  className={
                    this.state.opportunity.opportunity_status_id > 4
                      ? "btn btn-sm btn-success mb-3"
                      : "btn btn-sm btn-primary mb-3"
                  }
                  onClick={this.handleStatus}
                  disabled={this.state.opportunity.opportunity_status_id > 4}
                >
                  {statusButtonText}
                </button>
              </div>
            </div>

            <div className="row">
              {/* Left col */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Details</h3>
                    <div className="card-tools"></div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <label>Type</label>
                        <p>{this.state.opportunity.type}</p>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <label>Source</label>
                        <p>{this.state.opportunity.source_name}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <label>Technology</label>
                        <p>{this.state.opportunity.technology_id}</p>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <label>Resource</label>
                        <p>{this.state.opportunity.resource_id}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <label>Headcount</label>
                        <p>{this.state.opportunity.headcount}</p>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <label>Competitor</label>
                        <p>{this.state.opportunity.competitor_name}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <label>Service Line</label>
                        <p>{this.state.opportunity.service}</p>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <label>Engagement Model</label>
                        <p>{this.state.opportunity.engagement_model_name}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <label>Place of Assignment</label>
                        <p>{this.state.opportunity.place_of_assignment}</p>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <label>SLA</label>
                        <p>{this.state.opportunity.sla}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <label>Terms</label>
                        <p>{this.state.opportunity.terms}</p>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <label>Probability</label>
                        <p>{this.state.opportunity.probability}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <label>Projected Amt</label>
                        <p>{this.state.opportunity.projected_amt}</p>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <label>Actual Amt</label>
                        <p>{this.state.opportunity.actual_amt}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <label>Projected Start Date</label>
                        <p>
                          {this.dateFormatter(
                            this.state.opportunity.projected_start_date
                          )}
                        </p>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <label>Last Sales Activity</label>
                        <p>
                          {this.dateFormatter(
                            this.state.opportunity.last_sales_activity
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <label>Start Date</label>
                        <p>
                          {this.dateFormatter(
                            this.state.opportunity.date_start
                          )}
                        </p>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <label>End Date</label>
                        <p>
                          {this.dateFormatter(this.state.opportunity.date_end)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12"></div>
                </div>
              </div>
              {/* Right Col */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Last Status Movement</h3>
                    <div className="card-tools"></div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="info-box mb-3 bg-">
                        <div className="info-box-content">
                          <div className="info-box-text">
                            {this.state.opportunity.opportunity_status_name}
                          </div>
                          <div className="info-box-number">
                            Date:{" "}
                            {this.dateFormatter(
                              this.state.opportunity.current_status_start_date,
                              "MMM dd, yyyy hh:mm a"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Related BDM</h3>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile #</th>
                            <th>Tel #</th>
                            <th>Local #</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.relatedBdm.map((bdm) => (
                            <tr key={bdm.id}>
                              <td>{bdm.bdm_name}</td>
                              <td>
                                {bdm.email_company}
                                <br />
                                {bdm.email_personal}
                              </td>
                              <td>
                                {bdm.mobile_number_1}
                                <br />
                                {bdm.mobile_number_2}
                                <br />
                                {bdm.mobile_number_3}
                              </td>
                              <td>
                                {bdm.tel_number_1}
                                <br />
                                {bdm.tel_number_2}
                                <br />
                                {bdm.tel_number_3}
                              </td>
                              <td>
                                {bdm.tel_number_1}
                                <br />
                                {bdm.tel_number_2}
                                <br />
                                {bdm.tel_number_3}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Related Contacts</h3>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Email</th>
                            <th>Mobile #</th>
                            <th>Tel #</th>
                            <th>Local #</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.relatedContact.map((contacts) => (
                            <tr key={contacts.id}>
                              <td>{contacts.name}</td>
                              <td>{contacts.contact_type_name}</td>
                              <td>
                                {contacts.email_company}
                                <br />
                                {contacts.email_personal}
                              </td>
                              <td>
                                {contacts.mobile_number_1}
                                <br />
                                {contacts.mobile_number_2}
                                <br />
                                {contacts.mobile_number_3}
                              </td>
                              <td>
                                {contacts.tel_number_1}
                                <br />
                                {contacts.tel_number_2}
                                <br />
                                {contacts.tel_number_3}
                              </td>
                              <td>
                                {contacts.tel_number_1}
                                <br />
                                {contacts.tel_number_2}
                                <br />
                                {contacts.tel_number_3}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Contracts</h3>
                    <div className="card-tools">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={this.handleShowAddModal}
                      >
                        <Add />
                      </button>
                    </div>
                  </div>
                  <div className="card-body"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default withRouter(ViewOpportunity);
