import React, { Component } from "react";
import axios from "axios";
import { Delete, Edit, FindInPage, PersonalVideo } from "@material-ui/icons";
import ViewCompanyModal from "./ViewCompanyModal";
import EditCompanyModal from "./EditCompanyModal";

class GetList extends Component {
  constructor() {
    super();
    this.state = {
      company: [],
      editLoad: false
    };
  }

  componentDidMount =()=> {
    this.refreshList();
  }

  refreshList=()=> {
    axios.get("api/company_v").then((res) => {
      this.setState({ company: res.data });
    }).catch((err) => {console.log(err)});
  }

  componentDidUpdate() {
    if(this.props.added){
        this.props.parentCallback(true);
        this.refreshList();
    }

    if(this.state.editLoad){
      this.refreshList();
      this.setState({ editLoad:false });
    }
  }

  handleEditCallback =(editData)=>{
    if(editData){
      this.setState({ editLoad:true });
    }
  }

  render() {
    return (
      <tbody>
        {this.state.company.map((company) => (
          <tr key={company.id}>
            <td>{company.id}</td>
            <td>{company.name}</td>
            <td>{company.industry}</td>
            <td>{company.account_type}</td>
            <td>
              <div className="text-wrap">{company.technologies}</div>
            </td>
            <td>
              <div>{company.employee_size}</div>
            </td>
            <td>
              <div className="float-left">₱</div>
              <div className="float-right">{company.annual_revenue}</div>
            </td>
            <td className="d-flex justify-content-between">
              <ViewCompanyModal id={company.id} />{" "}
              <EditCompanyModal id={company.id} parentCallback={this.handleEditCallback}/>{" "}
              <Delete style={{ fill: "red" }} />
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}
export default GetList;
