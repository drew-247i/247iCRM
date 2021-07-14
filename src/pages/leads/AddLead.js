import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import SelectTemplate from "../../components/SelectTemplate";
import { Add } from "@material-ui/icons";
import axios from "axios";

const leadStatus = [
  { value: "COLD", label: "COLD" },
  { value: "WARM", label: "WARM" },
  { value: "HOT", label: "HOT" },
];

const service = [
  { value: "Insourcing", label: "Insourcing" },
  { value: "Project", label: "Project" },
  { value: "Work Order", label: "Work Order" },
];

const timeline = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

export default class AddLead extends Component {
  constructor() {
    super();
    this.state = {
      showAddModal: false,
    };
    this.handleShowAddModal = this.handleShowAddModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleShowAddModal = (e) => {
    this.setState({ showAddModal: !this.state.showAddModal });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post("api/leads", this.state)
      .then((res) => {
        console.log(res.data);
        this.setState({ showAddModal: false });
        this.props.parentCallback(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCallback = (childData) => {
    if (childData.field === "company") {
      this.setState({ company_id: childData.value });
    } else if (childData.field === "resources") {
      this.setState({ source: childData.value });
    } else if (childData.field === "skills") {
      this.setState({ skill_id: childData.value });
    } else if (childData.field === "competitors") {
      this.setState({ competitor_id: childData.value });
    }
  };

  render() {
    return (
      <>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={this.handleShowAddModal}
        >
          <Add /> New Lead
        </button>
        <Modal
          size="xl"
          show={this.state.showAddModal}
          onHide={() =>
            this.setState({ showAddModal: !this.state.showAddModal })
          }
        >
          <Modal.Header closeButton>
            <h4>New Lead</h4>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit} id="contact-form">
              <div className="row">
                <div className="form-group col-md-6 col-sm-12">
                  <label>Lead Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => this.setState({ name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group col-md-6 col-sm-12">
                  <label>Company</label>
                  <SelectTemplate
                    tableName={"company"}
                    parentCallback={this.handleCallback}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6 col-sm-12">
                  <label>Lead Sources</label>
                  <SelectTemplate
                    tableName={"resources"}
                    parentCallback={this.handleCallback}
                  />
                </div>
                <div className="form-group col-md-6 col-sm-12">
                  <label>Lead Status</label>
                  <Select
                    options={leadStatus}
                    isSearchable
                    onChange={(e) =>
                      this.setState({
                        status: e.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6 col-sm-12">
                  <label>Skill Requirement</label>
                  <SelectTemplate
                    tableName={"skills"}
                    parentCallback={this.handleCallback}
                  />
                </div>
                <div className="form-group col-md-6 col-sm-12">
                  <label>Service</label>
                  <Select
                    options={service}
                    isSearchable
                    onChange={(e) =>
                      this.setState({
                        service: e.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6 col-sm-12">
                  <label>Competitor</label>
                  <SelectTemplate
                    tableName={"competitors"}
                    parentCallback={this.handleCallback}
                  />
                </div>
                <div className="form-group col-md-6 col-sm-12">
                  <label>Timeline</label>
                  <Select
                    options={timeline}
                    isSearchable
                    onChange={(e) =>
                      this.setState({
                        timeline: e.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="float-right">
                <button type="submit" className="btn btn-primary btn-sm mr-2">
                  Save
                </button>
                <button
                  onClick={this.handleShowAddModal}
                  className="btn btn-danger btn-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
