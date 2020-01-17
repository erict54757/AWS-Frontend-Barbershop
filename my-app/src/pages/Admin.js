import React, { Component } from "react";
import Auth from "../utils/auth";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import "./Admin.css";
import { Redirect } from "react-router-dom";
import NavBar from "../components/NavBar";
import ManagerPortal from "../components/managerPortal";
import PortalFooter from "../components/PortalFooter";

class Admin extends Component {
  state = {
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
      position:"relative",paddingBottom:"300px"}}
      >
        {this.state.token &&
        this.state.isEmp === "true" &&
        this.state.name === "Admin" ? (
          [
            <NavBar
              key={"1"}
              token={this.state.token}
              name={this.state.name}
              id={this.state.id}
              background={"black"}
              textColor={"white-text"}
            />,
            <ManagerPortal
              key={"2"}
              name={this.state.name}
              id={this.state.id}
              token={this.state.token}
            />,
            <PortalFooter key={"3"} />
          ]
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: this.props.location }
            }}
          />
        )}
      </div>
    );
  }
}
export default Admin;
