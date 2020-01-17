import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import Auth from "../utils/auth";
import "jquery";
import "./Employee.css"
import NavBar from "../components/NavBar";
import PortalContainer from "../components/PortalContainer";
import PortalFooter from "../components/PortalFooter";

class Employee extends Component {
  state = {
    loading:true,
    token: Auth.getToken(),
    name: Auth.getName(),
    id: Auth.getId(),
    isEmp: Auth.getIsEmp(),
    isCust: Auth.getIsCust()
  };

  render() {
    console.log(this.state.token)
    return (
      <div style={{ minHeight: "860px",
      position:"relative",paddingBottom:"150px"}}
      
      >
        {this.state.token &&
        this.state.isEmp === "true" &&
        this.state.name !== "Admin" ? (
          [
            <NavBar
              key={"1"}
              token={this.state.token}
              name={this.state.name}
              id={this.state.id}
              background={"black"}
              textColor={"white-text"}
            />,
            <PortalContainer
              token={this.state.token}
              name={this.state.name}
              id={this.state.id}
              key={"2"}
            />,
            <PortalFooter key={"3"} />
          ]
        ) : (
          <Redirect
            to={{
              pathname: "/customer",
              state: { from: this.props.location }
            }}
          />
        )}
      </div>
    );
  }
}
export default Employee;
