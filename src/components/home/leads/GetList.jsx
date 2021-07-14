import React, { Component } from "react";
import axios from "axios";
import { Delete,Edit, AssignmentTurnedIn } from "@material-ui/icons";

class GetList extends Component {
  state = {
    leads: [],
  };
  constructor() {
    super();
    axios.get("api/leads").then((res) => {
      this.setState({ leads: res.data });
    });
  }

  render() {
    return (
        <tbody>
        {
            this.state.leads.map( lead => 
                <tr key={lead.id}>
                <td>{lead.account_number}</td>
                <td>{lead.bdm}</td>
                <td>{lead.status}</td>
                <td>{lead.company_name}</td>
                <td>{lead.industry}</td>
                <td>{lead.technology}</td>
                <td>{lead.service}</td>
                <td>{lead.skill_requirement}</td>
                <td><Edit /> <Delete style={{fill: "red"}}/>  <AssignmentTurnedIn style={{fill: "green"}} /></td>
                </tr>
                )
        }
        </tbody>
    );
  }
}
export default GetList;
