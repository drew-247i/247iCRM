import React, { Component } from "react";
import axios from "axios";
import { Delete,Edit} from "@material-ui/icons";

class GetList extends Component {
  state = {
    pipelines: [],
  };
  constructor() {
    super();
    axios.get("api/pipelines").then((res) => {
      this.setState({ pipelines: res.data });
    });
  }

  render() {
    return (
        <tbody>
        {
            this.state.pipelines.map( pipeline => 
                <tr key={pipeline.id}>
                <td>{pipeline.lead_id}</td>
                <td>{pipeline.bdm}</td>
                <td>{pipeline.status}</td>
                <td>{pipeline.lead_source}</td>
                <td>{pipeline.industry}</td>
                <td>{pipeline.technology}</td>
                <td>{pipeline.service}</td>
                <td>{pipeline.skill_requirement}</td>
                <td><Edit/> <Delete style={{fill: "red"}}/></td>
                </tr>
                )
        }
        </tbody>
    );
  }
}
export default GetList;
