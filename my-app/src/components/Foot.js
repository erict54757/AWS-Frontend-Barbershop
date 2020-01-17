import React from "react";
import "jquery";


import {  } from "react-router-dom";
class Foot extends React.Component {
  render() {
    return (
      <footer className="page-footer white">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="black-text center">Company Bio</h5>
              <p className="grey-text text-darken-3 ">
                Charlotte Barber & Beard is a classic upscale
                barbershop. We offer a variety of services, catering to
                everyone. Charlotte Barber & Beard is a gentleman's shop, reminiscent of
                the classic barbershop. We are striving to bring the memories
                back, with solely the clientele in mind. People pay for quality
                and this is where you will get it. We are barbers who
                love our craft, providing top notch service that helps men Stay
                Sharp.
              </p>
            </div>
            <div className="col l3 s12" />
            <div className="col l3 s12 ">
              <h5 className="black-text center">Connect</h5>
              <div className="center col s12">
                <div className=" col l4 s4 ">
                  <a
                    href="https://facebook.com"
                    style={{ fontSize: "40px", color:"#2196F3" }}
                    className="fa fa-facebook"
                  >
                    <div />
                  </a>
                </div>
                <div className=" col l4 s4">
                  <a
                    href="https://twitter.com"
                    style={{ fontSize: "40px", color:"#2196F3" }}
                    className="fa fa-twitter"
                  >
                    <div />
                  </a>
                </div>
                <div className=" col l4 s4">
                  <a
                    href="https://youtube.com"
                    style={{ fontSize: "40px", color:"#2196F3" }}
                    className="fa fa-youtube"
                  >
                    <div />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
      <div className="container center black-text"> 
        &copy;Copyright 2018
      </div>
    </div>
      </footer>

    );
  }
}

export default Foot;
