import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import SelectTemplate from "../../components/SelectTemplate";
import { Edit } from "@material-ui/icons";
import axios from "axios";

export default class EditContact extends Component {
  constructor() {
    super();
    this.state = {
      showEditModal: false,
      contactEditData: [],
    };
    this.handleShowEditModal = this.handleShowEditModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.refreshUpdateField();
  }

  refreshUpdateField = () => {
    axios
      .get("api/contacts/" + this.props.id)
      .then((res) => {
        this.setState({
          company_id: res.data.company_id,
          company_name: res.data.company_name,
          name: res.data.name,
          position: res.data.position,
          department: res.data.department,
          contact_type: res.data.contact_type,
          contact_type_name: res.data.contact_type_name,
          email_personal: res.data.email_personal,
          email_company: res.data.email_company,
          mobile_number_1: res.data.mobile_number_1,
          mobile_number_2: res.data.mobile_number_2,
          mobile_number_3: res.data.mobile_number_3,
          tel_number_1: res.data.tel_number_1,
          tel_number_2: res.data.tel_number_2,
          tel_number_3: res.data.tel_number_3,
          local_number_1: res.data.local_number_1,
          local_number_2: res.data.local_number_2,
          local_number_3: res.data.local_number_3,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidUpdate() {
    if (this.state.submitted) {
      this.refreshUpdateField();
      this.setState({ submitted: false });
    }
  }

  handleShowEditModal = (e) => {
    this.setState({ showEditModal: !this.state.showEditModal });
  };

  handleCallback = (childData) => {
    if (childData.field == "company") {
      this.setState({ company_id: childData.value });
    } else if (childData.field == "contacttypes") {
      this.setState({ contact_type: childData.value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios
      .put("api/contacts/" + this.props.id, this.state)
      .then((res) => {
        this.setState({ showEditModal: false });
        document.getElementById("contact-form").reset();
        this.setState({ submitted: true });
        this.props.parentCallback(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state);
    return (
      <>
        <Edit
          onClick={this.handleShowEditModal}
          className="icon-button"
          style={{ fill: "green" }}
        />
        <Modal
          size="xl"
          show={this.state.showEditModal}
          onHide={() =>
            this.setState({ showEditModal: !this.state.showEditModal })
          }
        >
          <Modal.Header closeButton>
            <h4>New Contact</h4>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit} id="contact-form">
              <div className="card card-secondary ">
                <h6 className="card-header">Contact Details</h6>
                <div className="card-body">
                  <div className="row">
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
                      <label>Contact Name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                        defaultValue={this.state.name}
                      />
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Position</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({ position: e.target.value })
                        }
                        defaultValue={this.state.position}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Department</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) =>
                          this.setState({ department: e.target.value })
                        }
                        defaultValue={this.state.department}
                      />
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Contact Type</label>
                      <SelectTemplate
                        tableName={"contacttypes"}
                        parentCallback={this.handleCallback}
                        editValue={{
                          value: this.state.contact_type,
                          label: this.state.contact_type_name,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card card-secondary ">
                <h6 className="card-header">Email Addresses</h6>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Personal</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        onChange={(e) =>
                          this.setState({ email_personal: e.target.value })
                        }
                        defaultValue={this.state.email_personal}
                      />
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Company</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        onChange={(e) =>
                          this.setState({ email_company: e.target.value })
                        }
                        defaultValue={this.state.email_company}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card card-secondary ">
                <h6 className="card-header">Contact Numbers</h6>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-4 col-sm-12">
                      <label>Mobile No. 1</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) =>
                          this.setState({ mobile_number_1: e.target.value })
                        }
                        defaultValue={this.state.mobile_number_1}
                      />
                    </div>
                    <div className="form-group col-md-4 col-sm-12">
                      <label>Mobile No. 2</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({ mobile_number_2: e.target.value })
                        }
                        defaultValue={this.state.mobile_number_2}
                      />
                    </div>
                    <div className="form-group col-md-4 col-sm-12">
                      <label>Mobile No. 3</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({ mobile_number_3: e.target.value })
                        }
                        defaultValue={this.state.mobile_number_3}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4 col-sm-12">
                      <label>Telephone No. 1</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) =>
                          this.setState({ tel_number_1: e.target.value })
                        }
                        defaultValue={this.state.tel_number_1}
                      />
                    </div>
                    <div className="form-group col-md-4 col-sm-12">
                      <label>Telephone No. 2</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({ tel_number_2: e.target.value })
                        }
                        defaultValue={this.state.tel_number_2}
                      />
                    </div>
                    <div className="form-group col-md-4 col-sm-12">
                      <label>Telephone No. 3</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({ tel_number_3: e.target.value })
                        }
                        defaultValue={this.state.tel_number_3}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4 col-sm-12">
                      <label>Local No. 1</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        onChange={(e) =>
                          this.setState({ local_number_1: e.target.value })
                        }
                        defaultValue={this.state.local_number_1}
                      />
                    </div>
                    <div className="form-group col-md-4 col-sm-12">
                      <label>Local No. 2</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({ local_number_2: e.target.value })
                        }
                        defaultValue={this.state.local_number_2}
                      />
                    </div>
                    <div className="form-group col-md-4 col-sm-12">
                      <label>Local No. 3</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({ local_number_3: e.target.value })
                        }
                        defaultValue={this.state.local_number_3}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="float-right">
                <button type="submit" className="btn btn-primary btn-sm mr-2">
                  Save
                </button>
                <button
                  onClick={this.handleShowEditModal}
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
