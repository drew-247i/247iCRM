import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Edit } from "@material-ui/icons";
import axios from "axios";

export default class EditNextStep extends Component {
  constructor(props) {
    super();
    this.state = {
      showEditModal: false,
      ns_id: props.id,
      submitted: false,
    };
    this.handleShowEditModal = this.handleShowEditModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.refreshUpdateFields();
  }

  refreshUpdateFields = () => {
    axios.get("api/lead_next_single/"+this.state.ns_id).then((res)=>{
        this.setState({description: res.data.description})
    });
  }

  componentDidUpdate() {
    if (this.state.submitted) {
      this.setState({ submitted: false });
      this.refreshUpdateFields();
    }
  }

  handleShowEditModal = (e) => {
    this.setState({ showEditModal: !this.state.showEditModal });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    axios.put("api/leads/nextstep/"+this.state.ns_id, this.state).then((res)=>{
        this.setState({ showEditModal: false });
        this.props.parentCallback(true);
    });
  };

  render() {
    return (
      <>
        <button
          className="btn btn-sm btn-outline-success"
          onClick={this.handleShowEditModal}
        >
          <Edit />
        </button>
        <Modal
          size="md"
          show={this.state.showEditModal}
          onHide={() =>
            this.setState({ showEditModal: !this.state.showEditModal })
          }
        >
          <Modal.Header closeButton>
            <h4>Edit Next Step</h4>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit} id="contact-form">
              <div className="row">
                <div className="form-group col-md-12 col-sm-12">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                    defaultValue = {this.state.description}
                  />
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
