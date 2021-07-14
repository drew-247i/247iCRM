import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { FindInPage } from "@material-ui/icons";

export default class ViewCompanyModal extends Component {
  constructor(props) {
    super();
    this.state = {
      showViewModal: false,
      company: [],
    };
    this.handleShowViewModal = this.handleShowViewModal.bind(this);
  }

  handleShowViewModal = (e) => {
    this.setState({ showViewModal: !this.state.showViewModal });
    axios.get("api/company_v/" + this.props.id).then((res) => {
      this.setState({ company: res.data });
    });
  };

  render() {
    return (
      <>
        <FindInPage
          onClick={this.handleShowViewModal}
          className="icon-button"
          style={{ fill: "#4B96F9" }}
        />
        <Modal
          size="xl"
          show={this.state.showViewModal}
          onHide={() =>
            this.setState({ showViewModal: !this.state.showViewModal })
          }
        >
          <Modal.Header closeButton>
            <h4>View Company</h4>
          </Modal.Header>
          <Modal.Body>
            <div className="card card-secondary ">
              <h6 className="card-header">Company Details</h6>
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-md-6 col-sm-12">
                    <label>Company name</label>
                    <p>{this.state.company.name}</p>
                  </div>
                  <div className="form-group col-md-6 col-sm-12">
                    <label>Affliate Company</label>
                    <p>{this.state.company.affiliate_company}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6 col-sm-12">
                    <label>Conglomerate</label>
                    <p>{this.state.company.conglomerate}</p>
                  </div>
                  <div className="form-group col-md-6 col-sm-12">
                    <label>Annual Revenue</label>
                    <p>{this.state.company.annual_revenue}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6 col-sm-12">
                    <label>Industry</label>
                    <p>{this.state.company.industry}</p>
                  </div>
                  <div className="form-group col-md-6 col-sm-12">
                    <label>Technologies</label>
                    <p>{this.state.company.technologies}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6 col-sm-12">
                    <label>Market Segment</label>
                    <p>{this.state.company.market_segment}</p>
                  </div>
                  <div className="form-group col-md-6 col-sm-12">
                    <label>Employee Size</label>
                    <p>{this.state.company.employee_size}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6 col-sm-12">
                    <label>Company Status</label>
                    <p>{this.state.company.company_status}</p>
                  </div>
                  <div className="form-group col-md-6 col-sm-12">
                    <label>Challenges</label>
                    <p>{this.state.company.challenges}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card card-secondary ">
              <h6 className="card-header">Addresses</h6>
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-md-12 col-sm-12">
                    <label>Business</label>
                    <p>{this.state.company.business_address}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-12 col-sm-12">
                    <label>Billing</label>
                    <p>{this.state.company.billing_address}</p>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="float-right">
              <button
                onClick={this.handleShowViewModal}
                className="btn btn-danger btn-sm"
              >
                Close
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
