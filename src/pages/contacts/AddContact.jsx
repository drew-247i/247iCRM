import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import SelectTemplate from "../../components/SelectTemplate";
import { Add } from "@material-ui/icons";
import axios from "axios";

export default class AddContact extends Component {
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
      .post("api/contacts", this.state)
      .then((res) => {
        this.setState({showAddModal:false});
        this.props.parentCallback(true);
        document.getElementById("contact-form").reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCallback = (childData) => {
    if (childData.field == "company") {
      this.setState({ company_id: childData.value });
    } else if (childData.field == "contacttypes") {
      this.setState({ contact_type: childData.value });
    }
  };

  render() {
    return (
      <>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={this.handleShowAddModal}
        >
          <Add /> New Contact
        </button>
        <Modal
          size="xl"
          show={this.state.showAddModal}
          onHide={() =>
            this.setState({ showAddModal: !this.state.showAddModal })
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
                      />
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Contact Type</label>
                      <SelectTemplate
                        tableName={"contacttypes"}
                        parentCallback={this.handleCallback}
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
