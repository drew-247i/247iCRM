import React from "react";
import GetList from "./GetList";
export default function Pipeline() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-12 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Pipelines</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-primary">
              Add Pipeline
            </button>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Lead #</th>
              <th scope="col">BDM</th>
              <th scope="col">Status</th>
              <th scope="col">Lead Source</th>
              <th scope="col">Industry</th>
              <th scope="col">Technology</th>
              <th scope="col">Service</th>
              <th scope="col">Skill Requiment</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <GetList />
        </table>
      </div>
    </main>
  );
}
