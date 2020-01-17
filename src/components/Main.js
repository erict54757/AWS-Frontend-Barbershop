import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Parallax,Button} from "react-materialize";
import backgroundsmall1 from "../Images/backgroundsmall1.jpg";
import background2 from "../Images/background2.jpg";
import backgroundsmall3 from "../Images/backgroundsmall3.jpg";
import Map from "./GoogleMapComponent/Map";
import SocketTest from "./SocketTest"
import CustContact from "./CustContact";
import NoSignInAppt from "./NoSIgnInAppt"
import "./Main.css";





class Main extends Component {

  state={
    apptActive:false,
    apptMade:false,
    
  }
  initialState={
    apptActive:false,
    apptMade:false
  }
  componentDidMount(){
    this.setState(this.initialState)
  }
  makeAppt=()=>{
    this.setState({apptActive:true})
  }
  closeAppt=()=>{
    this.setState({apptActive:false})
  }
  apptMade=(result)=>{
    this.setState(
      {apptActive:false,
      apptMade:true,
      result:result})
  }
  render() {
  
    return (

     
      <div className="mainContain">
 
        <div id="index-banner" className="parallax-container">
          <h1 className="header center grey-text text-lighten-3">
            Charlotte Barber & Beard
          </h1>
          <div className="row center index-banner">
            <h4 className="header col s12 grey-text text-lighten-3 light">
              A Cut Above The Rest.
            </h4>
          </div>
        </div>
        <Parallax imageSrc={backgroundsmall1} />
<div className="white" style={{marginBottom:"-30px"}}>
        <div className="parallax-container valign-wrapper appoint white">
          <div className="container fluid">
            <div className="row fluid">
           {this.state.apptActive?<div> <NoSignInAppt apptMade={this.apptMade}closeAppt={this.closeAppt}/></div>:null}
                {!this.state.apptActive?<div>
                 
    

                <div 
                  className="col l4 m12 s12 center makeAppoint"
                  style={{ height: "200px" }}
                >  <Button className="blue waves-effect waves-light makeAppointment z-depth-5"disabled={this.state.apptMade} onClick={this.makeAppt}>
                <h5>{!this.state.apptMade? "Make An Appointment": this.state.result}</h5>
              </Button>
                  
                </div>
                <div>
                <div  className="col l4 m6 s12 center map">
                  <Map />
                </div>
                <div className="col l4 m6 s12 center address">
                  <h5 className="header center black-text text-lighten-3">
                    Charlotte Barber & Beard
                  </h5>

                  <a data-tooltip="Get Directions" data-position="right" href="https://www.google.com/maps/place/Charlotte+Barber+%26+Beard/@35.2182917,-80.813019,17z/data=!3m1!4b1!4m5!3m4!1s0x88541fffcd1cfa07:0x33d6072cf4021686!8m2!3d35.2182917!4d-80.8108303"  target="_blank"  rel="noopener noreferrer" style={{color:"#2196F3"}} className=" text-blue tooltipped">1200 The Plaza Suite B, Charlotte, NC 28205</a>
                    <p>Phone: (704) 595-7795</p>
                    
                     <div> <p>
                        <strong>Sunday-Monday</strong>
                        {"  "}Closed
                    </p></div>
                      
                        <strong><p>Tuesday-Friday</p></strong>
                        {"  "}10AM-6PM
                    
                      <p>
                        <strong>Saturday</strong>
                        {"  "}9AM-4PM
                    
                    </p>
                </div>
              </div>
                </div>:null}
            </div>
          </div>
        </div>  <h4 className="center white grey-text text-lighten-3 special">
          Specializing In Classic Cuts.
        </h4>
</div>
        <Parallax imageSrc={background2} />


        <div className="parallax-container valign-wrapper appoint white">
     
          <CustContact />
        </div>
        <Parallax imageSrc={backgroundsmall3} />
      </div>
    );
  }
}

export default Main;