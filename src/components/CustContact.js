import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Row, Input, Button,Col,Icon} from "react-materialize";

// import { Link, Route } from "react-router-dom";


import API from "../utils/API";
import "./CustContact.css";

function validate(subject, message,email, phoneNumber) {
  // true means invalid, so our conditions got reversed
  return {
    subject: subject.length < 4,
   message: message.length <10,
     phoneNumber: validatePhone(phoneNumber),
    email: validateEmail(email)
  };
}
function validateEmail(email) {
  const regex = /^(([^<>()\],;:\s@]+([^<>()\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{3,})$/i
  return regex.test(email) ?false:true
}

function validatePhone(phoneNumber) {
  const regex = /^(1\s|1|)?((\(\d{3}\))|\d{3})(|\s)?(\d{3})(|\s)?(\d{4})$/
  return regex.test(phoneNumber) ? false : true
}

class CustContact extends Component {


  state = {
     subject:"",
    message:"",
    email:"",
    phoneNumber:"",
    sent: false,
    touched: { 
      subject: false,
     message: false,
       email: false,
      phoneNumber: false
     
    }




  }
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }
  
handleInputChange = event => {
  event.preventDefault();
  // Getting the value and name of the input which triggered the change
  let value = event.target.value;
  const name = event.target.name;

  // Updating the input's state
  this.setState({
    [name]: value
  });
  
};
handleSendEmail = event => {
  if (!this.canBeSubmitted()) {
   
   
    return;
  } this.sendEmail(this.state);
};
canBeSubmitted() {
  const errors = validate( this.state.subject, this.state.message,this.state.email, this.state.phoneNumber);
  const isDisabled = Object.keys(errors).some(x => errors[x]);
  return !isDisabled;
}

resetState= ()=>{
  this.setState({
      subject:"",
      message:"",
      phoneNumber:"",
      email:"",
      sent: true,
     touched: {
       subject:false,
      message:false,
      email:false,
      phoneNumber:false
      }

})}
sendEmail= (event)=>{
  API.sendEmail(event,
    {email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      subject: this.state.subject,
      message: this.state.message
    }).then(this.resetState());
  };
  render() {
  
  const errors = validate( this.state.subject, this.state.message,this.state.email, this.state.phoneNumber);
  const isDisabled = Object.keys(errors).some(x => errors[x]);
  
  const shouldMarkError = (field) => {
    const hasError = errors[field];
    const shouldShow = this.state.touched[field];
    
    return hasError ? shouldShow : false;
  };
  
 
  
    return (
      <div className="container ">
        <Row className="center">
          <h3>
            <i className="mdi-content-send brown-text" />
          </h3>
          <h4 className="center">Contact Us</h4>

          <div
            className="col l10 m10 s12 offset-l1 offset-m1 center "
            
          >
           <Row>
             <Col s={12} >
              <Input s={12}
              className={shouldMarkError('subject') ? "invalid error lighten-2" : ""}
                type="text"
                name="subject"
                value={this.state.subject}
                maxLength="30"
                onChange={this.handleInputChange}
                onBlur={this.handleBlur('subject')}
                label="Subject"
                success={this.state.touched.subject?shouldMarkError('subject')?"":"Right!":"" }
                error= {this.state.touched.subject?shouldMarkError('subject')?"Something More Substantial Please!" :"":""}
              >
               <Icon>subject</Icon></Input>
               </Col>
   
      </Row>
       <Row><Col s={12} >
              <Input
              s={12}
              value={this.state.message}
              className={shouldMarkError('message') ? "invalid " : ""}
                name='message'
                type="textarea"
              label="Message"
                maxLength="140"
                rows="20"
                onBlur={this.handleBlur('message')}
                onChange={this.handleInputChange}
                success={this.state.touched.message?shouldMarkError('message')?"":"Right!":"" }
                error= {this.state.touched.message?shouldMarkError('message')?"Something More Substantial Please!" :"":""}
              > 
              <Icon>message</Icon>
              </Input>
                       </Col>
</Row>
              {this.state.sent ?(
                <p id="characterLeft" className="help-block ">
                  Thank You For Contacting Us. We Will Get Back To You As Soon As Possible.
                </p>):(<p className={shouldMarkError('message') ? "err red-text col s12" : " black-text col s12"}>You have {140 - this.state.message.length} characters left.</p>)}
              
  
            {/* <!-- set the reply-to address --> */}
            <Row><Col s={12} >
              <Input
              s={6}
              className={shouldMarkError('email') ? "invalid" : ""}
                type="email"
                name="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleInputChange}
                onBlur={this.handleBlur('email')}
                maxLength={30}
                placeholder="Email"
                success={this.state.touched.email?shouldMarkError('email')?"":"Right!":"" }
                error= {this.state.touched.email?shouldMarkError('email')?"Needs Work!" :"":""}
              > 
              <Icon>email</Icon></Input>

              <Input
              s={6}
              
              className={shouldMarkError('phoneNumber') ? "invalid" : ""}
             type="number"
                name="phoneNumber"
                label="Phone"
                value={this.state.phoneNumber}
                onBlur={this.handleBlur('phoneNumber')}
                onChange={this.handleInputChange}
                maxLength={20}
                placeholder="Numbers Only"
               success={this.state.touched.phoneNumber?shouldMarkError('phoneNumber')?"":"Right!":"" }
               error= {this.state.touched.phoneNumber?shouldMarkError('phoneNumber')?"Needs Work!" :"":""}
             
                >

              <Icon>phone</Icon>           
            
              </Input>

              
                    </Col>
</Row>
{/* <form><div class="row">
        <div class="col s12">
          This is an inline input field:
          <div class="input-field inline">
            <input id="email_inline" type="email" class="validate"/>
            <label for="email_inline">Email</label>
            <span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
          </div>
        </div>
      </div></form> */}
            <Row>
            <Button
              className="btn waves-effect waves-blue blue"
              type="submit"
              name="Submit"
              disabled={isDisabled}
              onClick={this.handleSendEmail}
            >
              Submit
            </Button>
            </Row>
          </div>
        </Row>
      </div>
    );
  }
}
export default CustContact;
