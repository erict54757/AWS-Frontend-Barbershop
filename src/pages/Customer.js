import React, { Component } from "react";
import Auth from "../utils/auth";
import { Redirect } from "react-router-dom";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import "./Customer.css"
import NavBar from "../components/NavBar";
import {NavBarCust} from "../components/NavBarCust";
import Main from "../components/Main";
import Foot from "../components/Foot";

export class Customer extends React.Component {
  state = {
    token: Auth.getToken(),
    name: Auth.getName(),
    id: Auth.getId(),
    isEmp: Auth.getIsEmp(),
    isCust: Auth.getIsCust()
  };

  render() {
    console.log(this.state);
    if (
      this.state.token &&
      this.state.isEmp === "true" &&
      this.state.name === "Admin"
    ) {
      return <Redirect to="/admin" />;
    }
    if (this.state.token && this.state.isEmp === "true") {
      return <Redirect to="/employee" />;
    }
    return (
      <div style={{height: "100%"}}>
        {this.state.token ? (
          <NavBar
            name={this.state.name}
            token={this.state.token}
            id={this.state.id}
            isEmp={this.state.isEmp}
            isCust={this.state.isCust}
            background={"white"}
            textColor={"black-text"}
          />
        ) : (
          <NavBarCust
            background={"white black-text"}
            name={this.state.name}
            token={this.state.token}
            id={this.state.id}
            isEmp={this.state.isEmp}
            isCust={this.state.isCust}
            textColor={"black-text"}
          />
        )}
        <Main
          token={this.state.token}
          id={this.state.id}
          isEmp={this.state.isEmp}
          isCust={this.state.isCust}
        />
        <Foot />
      </div>
    );
  }
}
// export default Customer;
