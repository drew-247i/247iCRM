import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Edit } from "@material-ui/icons";
import axios from "axios";

export default class EditBdm extends Component {
  constructor(props) {
    super();
    this.state = {
      showEditModal: false,
      submitted: false,
    };
    this.handleshowEditModal = this.handleshowEditModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.refreshUpdateFields();
  }

  refreshUpdateFields = () => {
    axios.get("api/bdm/" + this.props.id).then((res) => {
      console.log(res.data);
      this.setState({
        name: res.data.name,
        position: res.data.position,
        department: res.data.department,
        email_personal: res.data.email_personal,
        email_company: res.data.email_company,
        mobile_number_1: res.data.mobile_number_1,
        mobile_number_2: res.data.mobile_number_2,
        mobile_number_3: res.data.mobile_number_3,
        tel_number_1: res.data.tel_number_1,
        tel_number_2: res.datatel_number_2,
        tel_number_3: res.data.tel_number_3,
        local_number_1: res.data.local_number_1,
        local_number_2: res.data.local_number_2,
        local_number_3: res.data.local_number_3,
      });
    });
  };

  handleshowEditModal = (e) => {
    this.setState({ showEditModal: !this.state.showEditModal });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put("api/bdm/"+this.props.id, this.state).then((res) => {
        this.setState({showEditModal:false});
        this.props.parentCallback(true);
    }).catch((err) => {

    })
  };

  render() {
    return (
      <>
        <button
          className="btn btn-sm btn-outline-success"
          onClick={this.handleshowEditModal}
        >
          <Edit />
        </button>
        <Modal
          size="xl"
          show={this.state.showEditModal}
          onHide={() =>
            this.setState({ showEditModal: !this.state.showEditModal })
          }
        >
          <Modal.Header closeButton>
            <h4>Edit BDM</h4>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit} id="contact-form">
              <div className="card card-secondary ">
                <h6 className="card-header">BDM Details</h6>
                <div className="card-body">
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
                  onClick={this.handleshowEditModal}
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
