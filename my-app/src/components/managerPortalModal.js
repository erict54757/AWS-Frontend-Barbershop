import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Row, Modal, Button, Input, Icon } from "react-materialize";
import API from "../utils/API";


function validatePhone(phoneNumber) {
  const regex = /^(1\s|1|)?((\(\d{3}\))|\d{3})(|\s)?(\d{3})(|\s)?(\d{4})$/
  return regex.test(phoneNumber) ? false : true
}

function validate(firstName, lastName, street, city, state, zip, email, phone) {
  // true means invalid, so our conditions got reversed
  return {
    firstName: firstName.length === 0,
    lastName: lastName.length === 0,
    street: street.length === 0,
    city: city.length === 0,
    state: state.length === 0,
    zip: validateZip(zip) ,
    email: validateEmail(email),
    phone: validatePhone(phone),
  };
}
function validateZip (zip){
  const regex = /^(\d{5})?$/;
  return regex.test(zip)? false:true
}

function validateEmail(email) {
  const regex = /^(([^<>()\],;:\s@]+([^<>()\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{3,})$/i
  return regex.test(email) ?false:true
}

class ManagerPortalModal extends Component {
  initialState = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    password: "barber18",
    isAdmin: false,
    
    touched: {
      firstName: false,
      lastName: false,
      street: false,
      city: false,
      state: false,
      zip: false,
      email: false,
      phone: false,
      date: false,
      time: false
    },
  };
  state = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    password: "barber18",
    isAdmin: false,

    touched: {
      firstName: false,
      lastName: false,
      street: false,
      city: false,
      state: false,
      zip: false,
      email: false,
      phone: false,
      date: false,
      time: false
    },
  };

  

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }
  canBeSubmitted() {
    const errors = validate(this.state.firstName, this.state.lastName, this.state.street, this.state.city, this.state.state, this.state.zip, this.state.email, this.state.phone, this.state.date, this.state.time);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    API.saveEmployee({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      email: this.state.email,
      phone: this.state.phone,
      account_key: this.state.password,
      isAdmin: this.state.isAdmin
    })
  
      .then(res =>{this.props.loadEmployees(); this.props.setActive(res.data)})
      .then(res => this.setState(this.initialState))
      
      .catch(err => console.log(err));
  };
  handleClose= event=>{
    this.setState(
      this.initialState
    )
  }

  render() {
    const errors = validate(this.state.firstName, this.state.lastName, this.state.street, this.state.city, this.state.state, this.state.zip, this.state.email, this.state.phone, this.state.date, this.state.time);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };
    return (
      <div>
        <Modal
          s={12}
          m={3}
          header="New Employee Information"
          fixedFooter
          trigger={
            <Button className="blue" style={{ marginTop: "10px" }} disabled={this.props.managerMode?false:true}>
              Add Employee
            </Button>
          }
          actions={
            <div>
              <Button
                style={{ marginLeft: "5px" }}
                disabled={isDisabled}
                onClick={this.handleFormSubmit}
                className="blue"
                modal="close"
                waves="light"
              >
                Save
              </Button>
              <Button 
              onClick={this.handleClose}
              className="blue" modal="close" waves="light" style={{ marginLeft: "5px" }}>
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
              className={shouldMarkError('firstName') ? "error invalid" : ""}
              value={this.state.firstName}
              onBlur={this.handleBlur('firstName')}
              onChange={this.handleInputChange}
              name="firstName"
            >
            <Icon>account_circle</Icon>
            </Input>
            <Input
              m={6}
              s={12}
              label="Last Name"
              value={this.state.lastName}
              className={shouldMarkError('lastName') ? "error invalid" : ""}
              onBlur={this.handleBlur('lastName')}
              onChange={this.handleInputChange}
              name="lastName"
            >
            <Icon>account_circle</Icon>
            </Input>
            <Input
             className={shouldMarkError('street') ? "error invalid" : ""}
              label="Address"
              onBlur={this.handleBlur('street')}
              m={12}
              s={12}
              value={this.state.street}
              onChange={this.handleInputChange}
              name="street"
            >
            <Icon>location_on</Icon>
            </Input>

            <Input
              label="City"
              m={4}
              s={12}
              className={shouldMarkError('city') ? "error invalid" : ""}
              value={this.state.city}
              onBlur={this.handleBlur('city')}
              onChange={this.handleInputChange}
              name="city"
            >
            <Icon>business</Icon>
            </Input>

            <Input
              label="State"
              name="state"
              onBlur={this.handleBlur('state')}
              s={12}
              m={4}
              maxLength={2}
              type="select"
              onChange={this.handleInputChange}
              className={shouldMarkError('state') ? "error invalid modalDrop" : "modalDrop"}
            >
              <option value="Al">Alabama</option>
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
              label="Zip Code"
              value={this.state.zip}
              maxLength={5}
              className={shouldMarkError('zip') ? "error invalid" : ""}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur("zip")}
              name="zip"
            >
            <Icon>location_on</Icon>
            </Input>
            <Input
              m={6}
              s={12}
              type="email"
              label="Email"
              className={shouldMarkError('email') ? "error invalid" : ""}
              value={this.state.email}
              onBlur={this.handleBlur('email')}
              onChange={this.handleInputChange}
              name="email"
            >
            <Icon>email</Icon>
            </Input>
            <Input
              m={6}
              s={12}
              maxLength={10}
              label="Phone"
              value={this.state.phone}
              className={shouldMarkError('phone') ? "error invalid" : ""}
              onBlur={this.handleBlur('phone')}
              onChange={this.handleInputChange}
              name="phone"
            >
            <Icon>phone</Icon>
            </Input>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default ManagerPortalModal;
