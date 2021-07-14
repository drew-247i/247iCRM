import axios from "axios";
import Select from "react-select";
import React, { Component } from "react";

export default class SelectTemplate extends Component {
  constructor() {
    super();
    this.state = {
      option: [],
      selected: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get("api/" + this.props.tableName).then((res) => {
      let optionData = res.data.map((data) => {
        let optionDisabled = false;
        if (this.props.disableOption) {
          this.props.disableOption.map((disabled) => {
            if (disabled.company_name === data.name) {
              optionDisabled = true;
            }
          });
        }
        
        return { value: data.id, label: data.name, disabled: optionDisabled };
      });
      this.setState({ option: optionData });
    });
  }

  handleChange = (e) => {
    let selectedField = {
      value: e.value,
      field: this.props.tableName,
    };

    if (this.props.isMulti) {
      selectedField = {
        value: e,
        field: this.props.tableName,
      };
    }
    this.props.parentCallback(selectedField);
  };

  render() {
    if (this.props.isMulti) {
      if (this.props.editValue) {
        return (
          <Select
            options={this.state.option}
            hideSelectedOptions={(option) => option.disabled}
            isSearchable
            isMulti
            onChange={this.handleChange}
            defaultValue={this.props.editValue}
            required={true}
          />
        );
      } else {
        return (
          <Select
            options={this.state.option}
            isOptionDisabled={(option) => option.disabled}
            isSearchable
            isMulti
            onChange={this.handleChange}
            required={true}
          />
        );
      }
    } else {
      if (this.props.editValue) {
        return (
          <Select
            options={this.state.option}
            isOptionDisabled={(option) => option.disabled}
            isSearchable
            onChange={this.handleChange}
            defaultValue={this.props.editValue}
            required={true}
          />
        );
      } else {
        return (
          <Select
            options={this.state.option}
            isOptionDisabled={(option) => option.disabled}
            isSearchable
            onChange={this.handleChange}
            required={true}
          />
        );
      }
    }
  }
}
