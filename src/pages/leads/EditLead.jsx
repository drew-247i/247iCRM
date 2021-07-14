import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import SelectTemplate from "../../components/SelectTemplate";
import { Edit } from "@material-ui/icons";
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

export default class EditLead extends Component {
  constructor() {
    super();
    this.state = {
      showAddModal: false,
      submitted: false,
    };
    this.handleShowAddModal = this.handleShowAddModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.refreshUpdateFields();
  }

  refreshUpdateFields = () => {
    axios
      .get("api/leads/" + this.props.id)
      .then((res) => {
        console.log(res.data);
        this.setState({
          name: res.data.name,
          status: res.data.status,
          service: res.data.service,
          timeline: res.data.timeline,
          company_id: res.data.company_id,
          company_name: res.data.company_name,
          source: res.data.source,
          source_name: res.data.source_name,
          skill_id: res.data.skill_id,
          skill_name: res.data.skill_name,
          competitor_id: res.data.competitor_id,
          competitor_name: res.data.competitor_name,
        });
      })
      .catch((err) => {});
  };

  componentDidUpdate() {
    if (this.state.submitted) {
      this.setState({ submitted: false });
      this.refreshUpdateFields();
    }
  }

  handleShowAddModal = (e) => {
    this.setState({ showAddModal: !this.state.showAddModal });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("api/leads/" + this.props.id, this.state)
      .then((res) => {
        this.setState({ showAddModal: !this.state.showAddModal });
        this.props.parentCallback(true);
        this.setState({ submitted: true });
      })
      .catch((err) => {});
  };

  handleCallback = (childData) => {
    if (childData.field == "company") {
      this.setState({ company_id: childData.value });
    } else if (childData.field == "resources") {
      this.setState({ source: childData.value });
    } else if (childData.field == "skills") {
      this.setState({ skill_id: childData.value });
    } else if (childData.field == "competitors") {
      this.setState({ competitor_id: childData.value });
    }
  };

  render() {
    return (
      <>
        <button
          className="btn btn-sm btn-outline-success"
          onClick={this.handleShowAddModal}
        >
          <Edit />
        </button>
        <Modal
          size="xl"
          show={this.state.showAddModal}
          onHide={() =>
            this.setState({ showAddModal: !this.state.showAddModal })
          }
        >
          <Modal.Header closeButton>
            <h4>Edit Lead</h4>
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
                    defaultValue={this.state.name}
                    required
                  />
                </div>
                <div className="form-group col-md-6 col-sm-12">
                  <label>Company</label>
                  <SelectTemplate
                    tableName={"company"}
                    parentCallback={this.handleCallback}
                    editValue={{
                      value: this.state.company_id,
                      label: this.state.company_name,
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6 col-sm-12">
                  <label>Lead Sources</label>
                  <SelectTemplate
                    tableName={"resources"}
                    parentCallback={this.handleCallback}
                    editValue={{
                      value: this.state.source,
                      label: this.state.source_name,
                    }}
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
                    defaultValue={{
                      value: this.state.status,
                      label: this.state.status,
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6 col-sm-12">
                  <label>Skill Requirement</label>
                  <SelectTemplate
                    tableName={"skills"}
                    parentCallback={this.handleCallback}
                    editValue={{
                      value: this.state.skill_id,
                      label: this.state.skill_name,
                    }}
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
                    defaultValue={{
                      value: this.state.service,
                      label: this.state.service,
                    }}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6 col-sm-12">
                  <label>Competitor</label>
                  <SelectTemplate
                    tableName={"competitors"}
                    parentCallback={this.handleCallback}
                    editValue={{
                      value: this.state.competitor_id,
                      label: this.state.competitor_name,
                    }}
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
                    defaultValue={{
                      value: this.state.timeline,
                      label: this.state.timeline,
                    }}
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
