import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Home } from "@material-ui/icons";
import axios from "axios";
import Cookies from "universal-cookie";
export default class Header extends Component {
  handleLogout = () => {
    console.log("logout");
    axios.post("api/logout").then(
      (res) => {
        console.log(res);
        const cookies = new Cookies();
        cookies.remove("token", { path: '/' });
        cookies.remove("username", { path: '/' });
        // localStorage.clear();
        window.location.replace("/");
      },
      (err) => {
        console.log(err);
      }
    );
  };

  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-dark navbar-red">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="pushmenu"
              to="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <NavLink to="/" className="nav-link">
              <Home/>
            </NavLink>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <NavLink to="/companies" className="nav-link">
            Companies
            </NavLink>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <NavLink to="/contacts" className="nav-link">
              Contacts
            </NavLink>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <NavLink to="/bdm" className="nav-link">
              BDM
            </NavLink>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <NavLink to="/leads" className="nav-link">
              Leads
            </NavLink>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <NavLink to="/opportunities" className="nav-link">
              Opportunities
            </NavLink>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <NavLink to="/contracts" className="nav-link">
              Contracts
            </NavLink>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}
          <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="navbar-search"
              to="#"
              role="button"
            >
              <i className="fas fa-search" />
            </Link>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button
                      className="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          {/* Messages Dropdown Menu */}
          <li className="nav-item dropdown">
            <div className="nav-link" data-toggle="dropdown">
              <i className="far fa-user" />
            </div>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <Link to="#" className="dropdown-item">
                Update Details
              </Link>
              <Link to="#" className="dropdown-item">
                FAQ
              </Link>
              <div className="dropdown-divider" />
              <button className="dropdown-item" onClick={this.handleLogout}>
                <i className="fas fa-sign-out-alt  mr-2" />
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}
