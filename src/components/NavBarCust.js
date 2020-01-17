import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Navbar, NavItem } from "react-materialize";
import TourModal from "./TourModal.js"

import logo from "../Images/logo.jpg";
import SignUpModal from "./SignUpModal";
import {SignInModal} from "./SignInModal";
import "./NavBarCust.css";


export class NavBarCust extends React.Component {
  Alert=()=>{
 
    alert("Admin: UserName: admin@gmail.com, Password: admin18")
    return
  }
  render() {
    return (
      <Navbar
        id="navBarCust"
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
        <NavItem  style={{marginTop:"8px"}}>
          <TourModal/>
        </NavItem>
        <NavItem  style={{marginTop:"8px"}}>
          <SignInModal />
        </NavItem>
        <NavItem style={{marginTop:"8px"}}>
          <SignUpModal />
        </NavItem>
      </Navbar>
    );
  }
}

// export default NavBarCust;
