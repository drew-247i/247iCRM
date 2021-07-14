import React, { Component } from "react";
import axios from "axios";
import { Delete, Edit, FindInPage, PersonalVideo } from "@material-ui/icons";
import EditContact from "./EditContact";

export default class GetList extends Component {
  state = {
    contacts: [],
  };
  constructor() {
    super();
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("api/contacts")
      .then((res) => {
        this.setState({ contacts: res.data });
      })
      .catch((err) => console.log(err));
  };

  componentDidUpdate() {
    if (this.props.added) {
      this.props.parentCallback("true");
      this.refreshList();
    }

    if (this.state.editLoad) {
      this.refreshList();
      this.setState({ editLoad: false });
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
        {this.state.contacts.map((contacts) => (
          <tr key={contacts.id}>
            <td>{contacts.id}</td>
            <td>{contacts.company_name}</td>
            <td>{contacts.name}</td>
            <td>{contacts.position}</td>
            <td>{contacts.department}</td>
            <td>{contacts.contact_type_name}</td>
            <td>
              {contacts.emails}
            </td>
            <td>
              {contacts.mobile_nos}
            </td>
            <td>
              {contacts.tel_nos}
            </td>
            <td>
              {contacts.local_nos}
            </td>
            <td className="d-flex justify-content-between">
              <EditContact id={contacts.id} parentCallback={this.handleEditCallback} />
              <Delete style={{ fill: "red" }} />
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}
