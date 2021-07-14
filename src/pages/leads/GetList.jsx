import React, { Component } from "react";
import axios from "axios";
import { Delete, Edit, FindInPage } from "@material-ui/icons";
import { Link } from "react-router-dom";
class GetList extends Component {
  state = {
    leads: [],
  };
  constructor() {
    super();

  }
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios.get("api/leads").then((res) => {
      this.setState({ leads: res.data });
    });
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

  render() {
    return (
      <tbody>
        {this.state.leads.map((lead) => (
          <tr key={lead.id}>
            <td>{lead.id}</td>
            <td>{lead.name}</td>
            <td>{lead.company_name}</td>
            <td>{lead.status}</td>
            <td>{lead.source_name}</td>
            <td>{lead.service}</td>
            <td>{lead.skill_name}</td>
            <td>{lead.timeline}</td>
            <td>{lead.competitor_name}</td>
            <td  className="d-flex justify-content-between">
              <Link  to={{pathname: `/leads/view/${lead.id}`, query: `/leads`}} ><FindInPage style={{ fill: "#4B96F9" }} /></Link>
              <Delete style={{ fill: "red" }} />
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}
export default GetList;
