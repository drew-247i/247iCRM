import React, { Component } from "react";
import axios from "axios";
import { Delete,Edit,CheckCircle } from "@material-ui/icons";

class GetList extends Component {
  state = {
    accounts: [],
  };
  constructor() {
    super();
    axios.get("api/accounts").then((res) => {
      this.setState({ accounts: res.data });
    });
  }

  render() {
    return (
        <tbody>
        {
            this.state.accounts.map( account => 
                <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.company_name}</td>
                <td>{account.business_address}</td>
                <td>{account.billing_address}</td>
                <td className="text-right">{account.annual_revenue}</td>
                <td><Edit/> <Delete style={{fill: "red"}}/> <CheckCircle style={{fill: "green"}}/> </td>
                </tr>
                )
        }
        </tbody>
    );
  }
}
export default GetList;
