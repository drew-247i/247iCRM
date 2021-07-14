import React from "react";
import { NavLink, Link } from "react-router-dom";
import Account from "./accounts/Account";
export default function Home() {
  return (
    <div>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">
          247i-CRM
        </Link>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <Link className="nav-link px-3" to="/login">
              Log out
            </Link>
          </div>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink className="nav-link active" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/accounts">
                    Accounts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/leads">
                    Leads
                  </NavLink>
                </li>
                <li className="nav-item"></li>
                <li className="nav-item"></li>
                <li className="nav-item"></li>
              </ul>
            </div>
          </nav>
          <Account />
        </div>
      </div>
    </div>
    
  );
}
