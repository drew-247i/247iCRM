import React, { Component } from "react";
import axios from "axios";
import { Delete, Edit, FindInPage, PersonalVideo } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default class GetList extends Component {
  state = {
    contracts: [],
  };
  constructor() {
    super();
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("api/contracts")
      .then((res) => {
        this.setState({ contracts: res.data });
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
        {this.state.contracts.map((contracts) => (
          <tr key={contracts.id}>
            <td>{contracts.id}</td>
            <td>{contracts.lead_id}</td>
            <td>{contracts.opportunity_id}</td>
            <td>{contracts.name}</td>
            <td>{contracts.terms}</td>
            <td>{contracts.sla}</td>
            <td>{contracts.place_of_assignment}</td>
            <td>{contracts.contract_repository}</td>
            <td>{contracts.start_date}</td>
            <td>{contracts.end_date}</td>
            <td>{contracts.amount}</td>
            <td className="d-flex justify-content-between">
              <Edit />
              <Delete style={{ fill: "red" }} />
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}
