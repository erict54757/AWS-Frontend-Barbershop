import React, { Component } from "react";
import EmployeeSchedule from "./employeeSchedule";

// import { Link, Route } from "react-router-dom";
import "jquery";
import "./PortalContainer.css";

class PortalContainer extends Component {
  render() {
    return (
      <div className="container employeePortal rounded"
     >
        <div
          className=" row z-depth-5 employeePortal"
          style={{ marginTop: "25px" }}
        >
          <h3
            s={12}
            className="white-text black z-depth-4 center rounded title"
          >
            Upcoming Appointments
          </h3>
          {/*  insert the appropriate manager component here */}
          <EmployeeSchedule name={this.props.name} id={this.props.id} />
        </div>
      </div>
    );
  }
}
export default PortalContainer;
