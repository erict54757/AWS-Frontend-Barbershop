import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import "./PortalFooter.css";
import logo from "../Images/logo.jpg";

class PortalFooter extends Component {
  render() {
    return (
   <div  className='black portalFooter footer'
   
   
>

<div className="container">
<div className="row">
  <div className="col l6 s12 center">
    <h5 className="white-text">Specializing In Classic Cuts</h5>
    <img
    style={{ height: "auto", width: "110px", padding: "5px" }} alt="logofoot"
    src={logo}
    />
  </div>
  <div className="col l4 offset-l2 s12 center">
                <h5 className="white-text">Charlotte Barber & Beard </h5>
                <ul>
                  <li className="white-text">1200 The Plaza Suite B</li>
                  <li className="white-text">Charlotte, NC 28205</li>
                  <li className="white-text"
                  type="telephone">(704) 595-7795</li>
              
                </ul>
              </div>
            </div>
          </div>
        
  
</div>
    
    );
  }
}

export default PortalFooter;
