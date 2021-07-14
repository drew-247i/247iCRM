import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { GroupAdd } from "@material-ui/icons";
import SelectTemplate from "../../components/SelectTemplate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import axios from "axios";

export default class AddCompanyAssigned extends Component {
  constructor(props) {
    super();
    this.state = {
      showAddModal: false,
      companyAssigned: [],
      endDate: null,
      startDate: null,
    };
    this.handleShowAddModal = this.handleShowAddModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
      this.setState({bdm_id : this.props.id})
      this.getAssignCompany();
  }

  getAssignCompany=()=>{
    axios.get("api/company_by_bdm/" + this.props.id).then((res) => {
      this.setState({ companyAssigned: res.data });
    });
    console.log(this.state.companyAssigned)
  }

  handleShowAddModal = (e) => {
    this.setState({ showAddModal: !this.state.showAddModal });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let postData = {
        company_id: this.state.company_id,
        bdm_id: this.props.id,
        date_start: this.dateFormatter(this.state.startDate, "yyyy-MM-dd"),
        date_end: this.dateFormatter(this.state.endDate,"yyyy-MM-dd"),
    }

    axios.post("api/assign_company_bdm", postData).then((res)=>{
        console.log(res.data)
        this.setState({showAddModal:false});
        this.props.parentCallback(true);
    })
  };

  handleCallback = (childData) => {
    if (childData.field === "company") {
      this.setState({ company_id: childData.value });
    }
  };

  dateFormatter = (getDate, dateFormat = "MMM dd, yyyy") => {
    if (getDate == null) {
    } else {
      let dates = new Date(getDate);
      let formattedDate = format(dates, dateFormat);
      return formattedDate;
    }
  };
  
  componentDidUpdate(){
    console.log(this.state)
  }

  render() {
    return (
      <>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={this.handleShowAddModal}
        >
          <GroupAdd />
        </button>
        <Modal
          size="md"
          show={this.state.showAddModal}
          onHide={() =>
            this.setState({ showAddModal: !this.state.showAddModal })
          }
        >
          <Modal.Header closeButton>
            <h4>Assign New Company</h4>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit} id="contact-form">
              <div className="row">
                <div className="form-group col-md-12 col-sm-12">
                  <label>Company</label>
                  <SelectTemplate
                    tableName={"company"}
                    parentCallback={this.handleCallback}
                    disableOption={this.state.companyAssigned}
                  />
                  <input
                    className="form-control hidden"
                    style={{opacity: 0, height: 0 }}
                    type="text"
                    value={this.state.company_id}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-group col-md-12 col-sm-12">
                  <label>Date Start</label>
                  <DatePicker
                    className="form-control"
                    selected={this.state.startDate}
                    onChange={(date) => this.setState({ startDate: date })}
                    dateFormat="MMMM dd, yyyy"
                    required
                  />
                </div>
                <div className="form-group col-md-12 col-sm-12">
                  <label>Date End</label>
                  <DatePicker
                    className="form-control"
                    selected={this.state.endDate}
                    onChange={(date) => this.setState({ endDate: date })}
                    dateFormat="MMMM dd, yyyy"
                    required
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
