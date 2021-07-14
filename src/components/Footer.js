import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <aside className="control-sidebar control-sidebar-dark"></aside>
        <footer className="main-footer">
          <strong>
            ©2021
          </strong>
          <div className="float-right d-none d-sm-inline-block">
            <b>V</b> 1
          </div>
        </footer>
      </div>
    );
  }
}
