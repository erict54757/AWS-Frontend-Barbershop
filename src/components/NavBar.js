import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Navbar, NavItem } from "react-materialize";

import logo from "../Images/logo.jpg";
import "./NavBar.css";
import LogoutButton from "./LogoutButton";
import WelcomeMat from "./WelcomeMat";

class NavBar extends Component {
  render() {
    return (
      <Navbar
        style={{ height: "80px" }}
        className={this.props.background}
        brand={
          <img
            style={{ height: "auto", width: "110px", padding: "5px" }}
            src={logo}
            alt="logo"
          />
        }
        right
        role="navigation"
      >
        <NavItem>
          <WelcomeMat name={this.props.name} textColor={this.props.textColor} />
        </NavItem>

        <NavItem>
          <LogoutButton token={this.props.token} />
        </NavItem>
      </Navbar>
    );
  }
}

export default NavBar;
