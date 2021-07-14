import React, { Component } from "react";
import axios from "axios";
import { Delete, Edit, FindInPage } from "@material-ui/icons";
import { Link } from "react-router-dom";
class GetList extends Component {
  state = {
    opportunities: [],
  };
  constructor() {
    super();

  }
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios.get("api/opportunities").then((res) => {
      this.setState({ opportunities: res.data });
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
        {this.state.opportunities.map((opportunity) => (
          <tr key={opportunity.id}>
            <td>{opportunity.id}</td>
            <td>{opportunity.lead_id}</td>
            <td>{opportunity.name}</td>
            <td>{opportunity.type}</td>
            <td>{opportunity.source}</td>
            <td>{opportunity.opportunity_status_id}</td>
            <td>{opportunity.current_status_start_date}</td>
            <td>{opportunity.service}</td>
            <td>{opportunity.projected_start_date}</td>
            <td>{opportunity.probability}</td>
            <td>{opportunity.next_step}</td>
            <td  className="d-flex justify-content-between">
              <Link  to={{pathname: `/opportunities/view/${opportunity.lead_id}`, query: `/opportunities`}} ><FindInPage style={{ fill: "#4B96F9" }} /></Link>
              <Delete style={{ fill: "red" }} />
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}
export default GetList;
