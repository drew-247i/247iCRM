import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
export default class Menu extends Component {
  render() {
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="/" className="brand-link">
          <img
            src="/247logo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">
            <i>24/7 International </i>
            <strong>CRM</strong>
          </span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* SidebarSearch Form */}

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library */}
              <li className="nav-item">
                <NavLink to="/companies" className="nav-link">
                  <p>Accounts</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contacts" className="nav-link">
                  <p>Contacts</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/bdm" className="nav-link">
                  <p>BDM</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/leads" className="nav-link">
                  <p>Leads</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/opportunities" className="nav-link">
                  <p>Opportunities</p>
                </NavLink>
              </li>
              <li to="/# "className="nav-item">
                <Link  className="nav-link">
                  <p>Contracts</p>
                </Link>
              </li>

            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }
}
