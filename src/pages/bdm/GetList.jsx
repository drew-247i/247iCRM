import React, { Component } from "react";
import axios from "axios";
import { Delete, Edit, FindInPage, PersonalVideo } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default class GetList extends Component {
  state = {
    bdm: [],
  };
  constructor() {
    super();
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("api/bdm")
      .then((res) => {
        this.setState({ bdm: res.data });
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

  handleEditCallback = (editData) => {
    if (editData) {
      this.setState({ editLoad: true });
    }
  };

  render() {
    return (
      <tbody>
        {this.state.bdm.map((bdm) => (
          <tr key={bdm.id}>
            <td>{bdm.id}</td>
            <td>{bdm.company_name}</td>
            <td>{bdm.name}</td>
            <td>{bdm.position}</td>
            <td>{bdm.department}</td>
            <td>
              {bdm.email_personal}
              <br />
              {bdm.email_company}
            </td>
            <td>
              {bdm.mobile_number_1}
              <br />
              {bdm.mobile_number_2}
              <br />
              {bdm.mobile_number_3}
            </td>
            <td>
              {bdm.tel_number_1}
              <br />
              {bdm.tel_number_2}
              <br />
              {bdm.tel_number_3}
            </td>
            <td>
              {bdm.local_number_1}
              <br />
              {bdm.local_number_2}
              <br />
              {bdm.local_number_3}
            </td>
            <td className="d-flex justify-content-between">
              <Link  to={{pathname: `/bdm/view/${bdm.id}`, query: `/leads`}} ><FindInPage style={{ fill: "#4B96F9" }} /></Link>
              <Delete style={{ fill: "red" }} />
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}
