import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import API from "../utils/API.js";
import { Modal, Button, Input, Row, Icon } from "react-materialize";
import { Link, Route } from "react-router-dom";

import "./SignUpModal.css";

function validate(firstName, lastName, street, city, state, zip, email, phone, password) {
  // true means invalid, so our conditions got reversed
  return {  
    firstName: firstName.length===0,
     lastName:lastName.length===0,
      street: street.length===0,
       city: city.length===0,
        state: state.length===0,
        zip: zip.length !== 5 ,
        email: validateEmail(email),
        phone: validatePhone(phone)    
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
    
    

class SignUpModal extends Component {
  initialstate = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    password: "",
    touched: { 
      firstName: false,
      lastName: false,
      street: false,
      city: false,
      state: false,
      zip: false,
      email: false,
      phone: false,
      password: false
     
    }, 
  };
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }
  canBeSubmitted() {
    const errors = validate(this.state.firstName,this.state.lastName, this.state.street, this.state.city, this.state.state, this.state.zip, this.state.email, this.state.phone, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  state = this.initialstate;

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    API.saveCustomer({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      email: this.state.email,
      phone: this.state.phone,
      account_key: this.state.password
    })
      .then(res => console.log(res))
      .then(res => this.setState(this.initialstate))
      .catch(err => console.log(err));
  };

  render() {
    const errors = validate(this.state.firstName,this.state.lastName, this.state.street, this.state.city, this.state.state, this.state.zip, this.state.email, this.state.phone, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = (field) => {
    const hasError = errors[field];
    const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };
    return (
      <div>
        <Modal
          id="account-signUp"
          role="dialog"
          header="Create Your Account"
          trigger={<Button className="btn blue">Sign Up</Button>}
          actions={
            <div>
              <Button
                type="submit"
                waves="light"
                id="add-account"
                className="btn modal-close blue"
                onClick={this.handleFormSubmit}
                disabled={isDisabled}
              >
                Submit
              </Button>
              <Button style={{ marginLeft: "5px" }} className="blue" modal="close" waves="light">
                Close
              </Button>
            </div>
          }
        >
          <Row>
            <Input
              m={6}
              s={12}
              label="First Name"
              maxLength="20"
              value={this.state.firstName}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur('firstName')}
              className={shouldMarkError('firstName') ? "error invalid" : ""}
              name="firstName"
              placeholder="John"
            > 
            <Icon>account_circle</Icon>
            </Input>

            <Input
              m={6}
              s={12}
              label="Last Name"
              maxLength="20"
              value={this.state.lastName}
              onBlur={this.handleBlur('lastName')}
              onChange={this.handleInputChange}
              className={shouldMarkError('lastName') ? "error invalid" : ""}
              name="lastName"
              placeholder="Doe"
            >      
             <Icon>account_circle</Icon>
            </Input>

            <Input
              m={12}
              s={12}
              label="Address"
              maxLength="30"
              value={this.state.street}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur('street')}
              className={shouldMarkError('street') ? "error invalid" : ""}
              name="street"
              placeholder="123 Rocky Rd."
            >   
             <Icon>location_on</Icon>
            </Input>

            <Input
              m={4}
              s={12}
              label="City"
              maxLength="30"
              value={this.state.city}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur('city')}
              className={shouldMarkError('city') ? "error invalid" : ""}
              name="city"
              placeholder="City"
            >  
            <Icon>business</Icon>
            </Input>

            <Input
              m={4}
              s={12}
              name="state"
              type="select"
              onChange={this.handleInputChange}
              onBlur={this.handleBlur('state')}
              className={shouldMarkError('state') ? "error invalid" : "modalDrop"}
            >
              <option value="AL">Alabama</option>

              <option value="AK">Alaska</option>

              <option value="AZ">Arizona</option>

              <option value="AR">Arkansas</option>

              <option value="CA">California</option>

              <option value="CO">Colorado</option>

              <option value="CT"> Connecticut </option>

              <option value="DE"> Delaware </option>

              <option value="DC"> District Of Columbia </option>

              <option value="FL"> Florida </option>

              <option value="GA"> Georgia </option>

              <option value="HI"> Hawaii </option>

              <option value="ID"> Idaho </option>

              <option value="IL"> Illinois </option>

              <option value="IN"> Indiana </option>

              <option value="IA"> Iowa</option>

              <option value="KS">Kansas</option>

              <option value="KY">Kentucky</option>

              <option value="LA">Louisiana</option>

              <option value="ME">Maine</option>

              <option value="MD">Maryland</option>

              <option value="MA">Massachusetts</option>

              <option value="MI">Michigan</option>

              <option value="MN">Minnesota</option>

              <option value="MS">Mississippi</option>

              <option value="MO">Missouri</option>

              <option value="MT">Montana</option>

              <option value="NE">Nebraska</option>

              <option value="NV">Nevada</option>

              <option value="NH">New Hampshire</option>

              <option value="NJ">New Jersey</option>

              <option value="NM">New Mexico</option>

              <option value="NY">New York</option>

              <option value="NC">North Carolina</option>

              <option value="ND">North Dakota</option>

              <option value="OH">Ohio</option>

              <option value="OK">Oklahoma</option>

              <option value="OR">Oregon</option>

              <option value="PA">Pennsylvania</option>

              <option value="RI">Rhode Island</option>

              <option value="SC">South Carolina</option>

              <option value="SD">South Dakata</option>

              <option value="TN">Tennessee</option>

              <option value="TX">Texas</option>

              <option value="UT">Utah</option>

              <option value="VT">Vermont</option>

              <option value="VA">Virginia</option>

              <option value="WA">Washington</option>

              <option value="WV">West Virginia</option>

              <option value="WI">Wisconsin</option>

              <option value="WY">Wyoming</option>
            </Input>

            <Input
              m={4}
              s={12}
              label="Zip"
              value={this.state.zip}
              type="number"
              maxLength="5"
              onChange={this.handleInputChange}
              onBlur={this.handleBlur('zip')}
              className={shouldMarkError('zip') ? "error invalid" : ""}
              name="zip"
              placeholder="12567"
            >    
             <Icon>location_on</Icon>
            </Input>

            <Input
              m={6}
              s={12}
              label="E-Mail"
              maxLength="30"
              value={this.state.email}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur('email')}
              className={shouldMarkError('email') ? "error red lighten-2" : ""}
              name="email"
              placeholder="johndoe@email.com"
            >
            <Icon>email</Icon>
            </Input>

            <Input
              m={6}
              s={12}
              label="Phone"
              type="number"
              maxLength="10"
              value={this.state.phone}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur('phone')}
              className={shouldMarkError('phone') ? "error red lighten-2" : ""}
              name="phone"
              placeholder="704-123-4567"
            >
            <Icon>phone</Icon>
            </Input>
            <Input
              m={12}
              s={12}
              label="Password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur('password')}
              className={shouldMarkError('password') ? "error red lighten-2" : ""}
              name="password"
              placeholder="Password"
            >
            <Icon>account_circle</Icon>
            </Input>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default SignUpModal;
