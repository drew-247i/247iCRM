import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import SelectTemplate from "../../components/SelectTemplate";
import { Edit } from "@material-ui/icons";
import axios from "axios";

const empSize = [
  { value: "1 - 50 employees", label: "1 - 50 employees" },
  { value: "51 - 200 employees", label: "51 - 200 employees" },
  { value: "201 - 500 employees", label: "201 - 500 employees" },
  { value: "501 - 1000 employees", label: "501 - 1000 employees" },
  { value: "1001 - 10000 employees", label: "1001 - 10000 employees" },
  { value: "10001 - UP employees", label: "10001 - UP employees" },
];

const accountType = [
  { value: "NEW", label: "NEW" },
  { value: "CURRENT", label: "CURRENT" },
];

export default class EditCompanyModal extends Component {
  state = {
    showEditModal: false,
    companyEditData: [],
    technologyEditData: [],
    submitted: false
  };

  constructor(props) {
    super();

    this.handleShowEditModal = this.handleShowEditModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeAccountType = this.handleChangeAccountType.bind(this);
    this.handleChangeEmpSize = this.handleChangeEmpSize.bind(this);
  }

  componentDidMount() {
    this.refreshUpdateField();
  }

  refreshUpdateField =()=> {
    axios.get("api/company/" + this.props.id).then((res) => {
      let techData = res.data.technology.map((data) => {
        return { value: data.technology_id, label: data.name };
      });
      this.setState({ companyEditData: res.data.company });
      this.setState({
        name: res.data.company.name,
        affiliate_company: res.data.company.affiliate_company,
        conglomerate_id: res.data.company.conglomerate_id,
        annual_revenue: res.data.company.annual_revenue_uf,
        employee_size: res.data.company.employee_size,
        industry_id: res.data.company.industry_id,
        market_segment_id: res.data.company.market_segment_id,
        account_type: res.data.company.account_type,
        company_status_id: res.data.company.company_status_id,
        challenges: res.data.company.challenges,
        technologies: techData,
        billing_address_city: res.data.company.billing_address_city,
        billing_address_country: res.data.company.billing_address_country,
        billing_address_line_1: res.data.company.billing_address_line_1,
        billing_address_province: res.data.company.billing_address_province,
        billing_address_zip: res.data.company.billing_address_zip,
        business_address_city: res.data.company.business_address_city,
        business_address_country: res.data.company.business_address_country,
        business_address_line_1: res.data.company.business_address_line_1,
        business_address_province: res.data.company.business_address_province,
        business_address_zip: res.data.company.business_address_zip,
      });
      this.setState({ technologyEditData: techData });
    });
  }

  componentDidUpdate(){
    if(this.state.submitted){
      this.refreshUpdateField();
      this.setState({submitted:false})
    }
  }
  
  handleShowEditModal = (e) => {
    this.setState({ showEditModal: !this.state.showEditModal });
  };

  handleChangeEmpSize = (e) => {
    this.setState({ employee_size: e.value });
  };

  handleChangeAccountType = (e) => {
    this.setState({ account_type: e.value });
  };

  handleCallback = (childData) => {
    if (childData.field == "conglomerates") {
      this.setState({ conglomerate_id: childData.value });
    } else if (childData.field == "industries") {
      this.setState({ industry_id: childData.value });
    } else if (childData.field == "technologies") {
      this.setState({ technologies: childData.value });
    } else if (childData.field == "marketsegments") {
      this.setState({ market_segment_id: childData.value });
    } else if (childData.field == "company_statuses") {
      this.setState({ company_status_id: childData.value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios.put("api/company/" + this.props.id, this.state).then((res) => {
      this.setState({showEditModal: false});
      this.setState({submitted: true})
      this.props.parentCallback(true);
    });
    
  };

  render() {
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
            <h4>Update Company</h4>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit} id="company-form">
              <div className="card card-secondary ">
                <h6 className="card-header">Company Details</h6>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Company name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({ name: e.target.value })
                        }
                        defaultValue={this.state.companyEditData.name}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Affliate Company</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={
                          this.state.companyEditData.affiliate_company
                        }
                        onChange={(e) =>
                          this.setState({ affiliate_company: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Conglomerate</label>
                      <SelectTemplate
                        tableName={"conglomerates"}
                        parentCallback={this.handleCallback}
                        editValue={{
                          value: this.state.companyEditData.conglomerate_id,
                          label: this.state.companyEditData.conglomerate,
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Annual Revenue</label>
                      <div class="input-group mb-2">
                        <div class="input-group-prepend">
                          <div class="input-group-text">₱</div>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={
                            this.state.companyEditData.annual_revenue_uf
                          }
                          onChange={(e) =>
                            this.setState({ annual_revenue: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Industry</label>
                      <SelectTemplate
                        tableName={"industries"}
                        parentCallback={this.handleCallback}
                        editValue={{
                          value: this.state.companyEditData.industry_id,
                          label: this.state.companyEditData.industry,
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Technology</label>
                      <SelectTemplate
                        tableName={"technologies"}
                        isMulti={true}
                        parentCallback={this.handleCallback}
                        editValue={this.state.technologyEditData}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Market Segment</label>
                      <SelectTemplate
                        tableName={"marketsegments"}
                        parentCallback={this.handleCallback}
                        editValue={{
                          value: this.state.companyEditData.market_segment_id,
                          label: this.state.companyEditData.market_segment,
                        }}
                      />
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Employee Size</label>
                      <Select
                        options={empSize}
                        isSearchable
                        defaultValue={{
                          label: this.state.companyEditData.employee_size,
                          value: this.state.companyEditData.employee_size,
                        }}
                        onChange={this.handleChangeEmpSize}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Account Type</label>
                      <Select
                        options={accountType}
                        isSearchable
                        defaultValue={{
                          label: this.state.companyEditData.account_type,
                          value: this.state.companyEditData.account_type,
                        }}
                        onChange={this.handleChangeAccountType}
                      />
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Company Status</label>
                      <SelectTemplate
                        tableName={"company_statuses"}
                        parentCallback={this.handleCallback}
                        editValue={{
                          value: this.state.companyEditData.company_status_id,
                          label: this.state.companyEditData.company_status,
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12 col-sm-12">
                      <label>Challenges</label>
                      <textarea
                        className="form-control"
                        row="4"
                        onChange={(e) =>
                          this.setState({ challenges: e.target.value })
                        }
                      >
                        {this.state.companyEditData.challenges}
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-secondary ">
                <h6 className="card-header">Business Address</h6>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-12 col-sm-12">
                      <label>Business Address</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({
                            business_address_line_1: e.target.value,
                          })
                        }
                        defaultValue={
                          this.state.companyEditData.business_address_line_1
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Business City</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({
                            business_address_city: e.target.value,
                          })
                        }
                        defaultValue={
                          this.state.companyEditData.business_address_city
                        }
                      />
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Business Province</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({
                            business_address_province: e.target.value,
                          })
                        }
                        defaultValue={
                          this.state.companyEditData.business_address_province
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Business Country</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({
                            business_address_country: e.target.value,
                          })
                        }
                        defaultValue={
                          this.state.companyEditData.business_address_country
                        }
                      />
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Business Zip Code</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({
                            business_address_zip: e.target.value,
                          })
                        }
                        defaultValue={
                          this.state.companyEditData.business_address_zip
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-secondary ">
                <h6 className="card-header">Billing Address</h6>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-12 col-sm-12">
                      <label>Billing Address</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({
                            billing_address_line_1: e.target.value,
                          })
                        }
                        defaultValue={
                          this.state.companyEditData.billing_address_line_1
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Billing City</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({
                            billing_address_city: e.target.value,
                          })
                        }
                        defaultValue={
                          this.state.companyEditData.billing_address_city
                        }
                      />
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Billing Province</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({
                            billing_address_province: e.target.value,
                          })
                        }
                        defaultValue={
                          this.state.companyEditData.billing_address_province
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Billing Country</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({
                            billing_address_country: e.target.value,
                          })
                        }
                        defaultValue={
                          this.state.companyEditData.billing_address_country
                        }
                      />
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label>Billing Zip Code</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({ billing_address_zip: e.target.value })
                        }
                        defaultValue={
                          this.state.companyEditData.billing_address_zip
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
