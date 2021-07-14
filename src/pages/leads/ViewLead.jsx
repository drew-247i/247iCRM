import React, { Component } from "react";
import { withRouter } from "react-router";
import AddNextStep from "./AddNextStep";
import EditNextStep from "./EditNextStep";
import EditLead from "./EditLead";
import axios from "axios";
import { Link } from "react-router-dom";
import { Stepper, Step } from "react-form-stepper";
import { Check, Edit } from "@material-ui/icons";
import { format } from "date-fns";

class ViewLead extends Component {
  state = {
    statusButtonText: "Mark Status New as Completed",
    lead: [],
    relatedContact: [],
    relatedBdm: [],
    nextSteps: [],
    showAddModal: false,
    NextStepadded: false,
  };
  constructor(props) {
    super();
    console.log(props);
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    let lead_id = this.props.match.params.id;
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

      axios.get("api/lead_next/" + lead_id).then((res) => {
        this.setState({ nextSteps: res.data });
      });
    });
  };

  putLeadStatus = (value) => {
    axios
      .put("api/leads/" + this.state.lead.id, { activity_status: value })
      .then((res) => {
        this.setState({ NextStepadded: true });
      });
  };

  convertLead = () => {
    let tobeConverted = {
      lead_id: this.state.lead.id,
      name: this.state.lead.name,
      source: this.state.lead.source,
      service: this.state.lead.service,
      skill_requirement: this.state.lead.skill_id,
      competitor_id: this.state.lead.competitor_id,
    };
    console.log(tobeConverted);
    axios
      .post("api/opportunities", tobeConverted)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  dateFormatter = (getDate) => {
    let dates = new Date(getDate);
    let formattedDate = format(dates, "MMM, yyyy h:mma");
    return formattedDate;
  };

  componentDidUpdate() {
    if (this.state.NextStepadded) {
      this.getDetails();
      this.setState({ NextStepadded: false });
    }
  }

  handleShowAddModal = (e) => {
    this.setState({ showAddModal: true });
  };

  handleAddCallback = (addData) => {
    if (addData) {
      this.setState({ NextStepadded: true });
    }
  };

  handleActivitySubmit = () => {
    let status = 0;
    if (this.state.lead.activity_status === 0) {
      status = 1;
      this.setState({ statusButtonText: "Mark Contact Lead as Completed" });
    } else if (this.state.lead.activity_status === 1) {
      status = 2;
      this.setState({ statusButtonText: "Convert Lead to Oppotunity" });
    } else if (this.state.lead.activity_status === 2) {
      status = 3;
      this.setState({ statusButtonText: "Lead Converted to Oppotunity" });
      this.convertLead();
    }
    this.putLeadStatus(status);
  };

  render() {
    let btnText = this.state.statusButtonText;
    if (this.state.lead.activity_status === 1) {
      btnText = "Mark Contact Lead as Completed";
    } else if (this.state.lead.activity_status === 2) {
      btnText = "Convert Lead to Oppotunity";
    } else if (this.state.lead.activity_status > 2) {
      btnText = "Lead Converted to Oppotunity";
    }

    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">View Lead: {this.state.lead.name} </h1>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <Stepper
                  activeStep={this.state.lead.activity_status}
                  styleConfig={{ completedBgColor: "#5cb85c" }}
                >
                  <Step label="New" />
                  <Step label="Contacted" />
                  <Step label="Converted" />
                </Stepper>
              </div>
              <div className="col-md-12 col-sm-12 justify-content-center text-center">
                {this.state.lead.activity_status < 3 ? (
                  <button
                    className="btn btn-sm btn-primary mb-3"
                    onClick={this.handleActivitySubmit}
                    disabled={this.state.lead.activity_status > 3}
                  >
                    {btnText}
                  </button>
                ) : (
                  ""
                )}
                {this.state.lead.activity_status > 2 ? (
                  <Link
                    to={{
                      pathname: `/opportunities/view/${this.state.lead.id}`,
                      query: `/opportunities`,
                    }}
                    className="btn btn-sm btn-success mb-3"
                  >
                    {" "}
                    View Opportunity{" "}
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row">
              {/* Left col */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Details</h3>
                    <div className="card-tools">
                      <EditLead
                        id={this.props.match.params.id}
                        parentCallback={this.handleAddCallback}
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <label>Company Name</label>
                        <p>{this.state.lead.company_name}</p>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <label>Lead Status</label>
                        <p>{this.state.lead.status}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col-md-6 col-sm-12">
                        <label>Source</label>
                        <p>{this.state.lead.source_name}</p>
                      </div>
                      <div className=" col-md-6 col-sm-12">
                        <label>Service</label>
                        <p>{this.state.lead.service}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col-md-6 col-sm-12">
                        <label>Skill Requirement</label>
                        <p>{this.state.lead.skill_name}</p>
                      </div>
                      <div className=" col-md-6 col-sm-12">
                        <label>Timeline</label>
                        <p>{this.state.lead.timeline}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col-md-6 col-sm-12">
                        <label>Competitor</label>
                        <p>{this.state.lead.competitor_name}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
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
              </div>
              {/* Right Col */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Next Steps</h3>
                    <div className="card-tools">
                      <AddNextStep
                        parentCallback={this.handleAddCallback}
                        lead_id={this.props.match.params.id}
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {this.state.nextSteps.map((nextSteps) => (
                        <div className="info-box mb-3 bg-">
                          <div className="info-box-content" key={nextSteps.id}>
                            <div className="info-box-text">
                              {nextSteps.description}
                            </div>
                            <div className="info-box-number">
                              <div className="row">
                                <div className="col-md-6">
                                  Date Created:{" "}
                                  {this.dateFormatter(nextSteps.created_at)}
                                </div>
                                <div className="col-md-6 float-right">
                                  <div className="float-right">
                                    <EditNextStep
                                      parentCallback={this.handleAddCallback}
                                      id={nextSteps.id}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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
              </div>
            </div>
            </div>
        </section>
      </div>
    );
  }
}
export default withRouter(ViewLead);
