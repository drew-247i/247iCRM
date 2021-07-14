import React from "react";
import GetList from "./GetList";

export default function Account() {
  return (
    <main className="col-md-9 col-lg-12 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Accounts</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
            >
              Add Account
            </button>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Account #</th>
              <th scope="col">Company Name</th>
              <th scope="col">Business Address</th>
              <th scope="col">Billing Address</th>
              <th scope="col">Annual Revenue</th>
              <th></th>
            </tr>
          </thead>

          <GetList />
        </table>
      </div>
    </main>
  );
}
