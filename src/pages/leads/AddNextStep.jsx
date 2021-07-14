import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Add } from "@material-ui/icons";
import axios from "axios";

export default class AddNextStep extends Component {
  constructor(props) {
    super();
    this.state = {
      showAddModal: false,
      lead_id: props.lead_id
    };
    this.handleShowAddModal = this.handleShowAddModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleShowAddModal = (e) => {
    this.setState({ showAddModal: !this.state.showAddModal });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("api/leads/nextstep", this.state)
      .then((res) => {
        this.setState({ showAddModal: false });
        this.props.parentCallback(true);
        document.getElementById("contact-form").reset();
      })
      .catch((err) => {});
  };


  render() {
    return (
      <>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={this.handleShowAddModal}
        >
          <Add />
        </button>
        <Modal
          size="md"
          show={this.state.showAddModal}
          onHide={() =>
            this.setState({ showAddModal: !this.state.showAddModal })
          }
        >
          <Modal.Header closeButton>
            <h4>New Next Step</h4>
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
