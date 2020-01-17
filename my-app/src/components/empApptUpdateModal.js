

/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Modal, Button, Input, Icon, Row, Col } from "react-materialize";
// import { Link, Route } from "react-router-dom";
import "./empApptUpdateModal.css";

import API from "../utils/API";
import moment from "moment"
function validatePhone(phoneNumber) {
  const regex = /^(1\s|1|)?((\(\d{3}\))|\d{3})(|\s)?(\d{3})(|\s)?(\d{4})$/
  return regex.test(phoneNumber) ? false : true
}


function validate(firstName, lastName, email, phone) {
  // true means invalid, so our conditions got reversed
  return {
    firstName: firstName.length === 0,
    lastName: lastName.length === 0,
    email: validateEmail(email),
    phone: validatePhone(phone)


  };
}

function validateEmail(email) {
  const regex = /^(([^<>()\],;:\s@]+([^<>()\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{3,})$/i
  return regex.test(email) ? false : true
}


class EmpApptUpdateModal extends Component {
  state = {
    maxDate:moment().add(1, 'months').toDate(),
    EmployeeId: this.props.empId,
    step: 1,
    service: 0,
    loading: true,
    daysOff: this.props.daysOff,
    id: this.props.custId,
    time: "",
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    email: this.props.email,
    phone: this.props.phone,
    date: this.props.date,
    touched: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,

    },

  };
  initialState = {
    step: 1,
    service: 0,
    loading: true,
    daysOff: this.props.daysOff,
    id: this.props.custId,
    time: "",
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    email: this.props.email,
    phone: this.props.phone,
    date: this.props.date,
    touched: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,

    },

  };
  handleClose = event => {
    this.setState(this.initialState)
  }
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }
  canBeSubmitted() {
    const errors = validate(this.state.firstName, this.state.lastName, this.state.email, this.state.phone);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleServiceChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      step: 3,
      [name]: parseInt(value),

    });
  };
  handleInputChange = event => {
    event.preventDefault();
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      [name]: value,

    });
  };
  handleTimeChange = event => {
    event.preventDefault();
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      step: 4,
      [name]: value
    });
  };
  handleDateChange = event => {

    let value = event.target.value;
    const name = event.target.name;

    // name === "date" ? value = (moment(event.target.value, "DD MMMM, YYYY").format('YYYY-MM-DD')) : (event.target.value)
    this.setState({ time: "" })
    this.setState({
      step: 2,
      [name]: value,
      loading: true
    });
    this.convertTime()
    if (this.props.appointments === undefined) {
      console.log("undefinedddddedd")
      this.handleFetch([])
    } else { this.handleFetch(this.props.appointments) }
  };

  convertTime = () => {

    this.setState({
      appointmentDate: moment(this.state.date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      day: moment(this.state.date, 'YYYY-MM-DD').format("dddd")
    });
  }

  handleFetch(response) {

    if (this.state.loading) {
     
      const { appointments } = response
       console.log(this.props.appointments,this.state.date)
      const initSchedule = {}
      const today = moment().subtract(1, 'day')
      initSchedule[today.format('YYYY-MM-DD')] = true
      const schedule = !this.props.appointments[this.state.date]? initSchedule : this.props.appointments[this.state.date].reduce((currentSchedule, appointment) => {

        const { date, slot } = appointment
        // console.log(slot)
        const dateString = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')

        // console.log(currentSchedule)
        !currentSchedule[date] ? currentSchedule[dateString] = Array(41).fill(false) : null
        Array.isArray(currentSchedule[dateString]) ?
          currentSchedule[dateString][slot] = true : null
        return currentSchedule
      }, initSchedule)
      // console.log(schedule)
      //Imperative x 100, but no regrets
      for (let day in schedule) {
        let slots = schedule[day]
        // console.log(day)
        slots.length ? (slots.every(slot => slot === true)) ? schedule[day] = true : null : null
      }
      this.setState({
        schedule,
        loading: false
      })
    } else {
      return null
    }
  }
  renderAppointmentTimes() {
    if (!this.state.loading && this.state.step >= 3) {
      const shiftEndTime = this.state.day + "shiftEndTime"
      const shiftStartTime = this.state.day + "shiftStartTime"
      const isWorking = this.props.employee[this.state.day] === "on" ? false : true
      const filteredEmployeeDayOff = this.state.daysOff.filter(daysOff => daysOff.EmployeeId == this.state.EmployeeId)
      const filteredEmployeeDayOffToday = filteredEmployeeDayOff.filter(daysOff => daysOff.date == this.state.date)     
      const slots = [...Array(40).keys()]
      return slots.map(slot => {
        const appointmentDateString = this.state.appointmentDate
        const t1 = moment().hour(9).minute(0).add(slot / 4, 'hours')
        const t2 = moment().hour(9).minute(0).add(slot / 4 + (.25 * this.state.service), 'hours')
        const timeNow = moment().format('YYYY-MM-DD') === this.state.appointmentDate && moment().hour() > 9 ? (moment().hour() - 8.5) * 4 > slot ? true : false : false
        const withinSchedule = slot >= this.props.employee[shiftStartTime] && slot + this.state.service <= this.props.employee[shiftEndTime] ? false : true
       
        const optionSelect = serviceType => {
          let value = []
          console.log(this.state.schedule)

          let anyTaken = false

          for (let i = 0; i < serviceType; i++) {
            value.push(slot + i);

            if (this.state.schedule[appointmentDateString]!==undefined) {
              if (this.state.schedule[this.state.date][slot + i]) {

                // check this change it might fix over shooting appt by 15 min
                if(this.state.appointmentDate === this.props.date && slot+i >= this.props.slot && slot+i <this.props.slot + this.props.service){
                  
                }else{
                anyTaken = true}
              }

            }
            
            if (filteredEmployeeDayOffToday[0]) {
              if (slot +i >= filteredEmployeeDayOffToday[0].slotBegin && slot + i < filteredEmployeeDayOffToday[0].slotEnd) {
                anyTaken = true
              }
            }
           
          }
       
         
          if (!withinSchedule&&!isWorking) { 
         
            return <option
              style={{ margin: "5px", width: "160px", paddingLeft: "0px", paddingRight: "0px" }}
              waves="light"
              name="time"
              key={slot}
              value={value}
              disabled={anyTaken|| timeNow || withinSchedule||isWorking}
            >{t1.format('h:mm a') + ' - ' + t2.format('h:mm a')}</option>
          } else { return <option disabled={true}></option> }
        }

        return optionSelect(this.state.service)

       
      })
    } else {
      return null
    }
  }



  updateCustomer = async id => {
    await API.updateCustomer(id, {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone
    })
      .then(res => {
        if (res.data !== "error") {
          window.Materialize.toast(`Customer Successfully Updated!`, 5000)
        } else {
          window.Materialize.toast('Looks Like Something Went Wrong, Please Try Again.', 5000)
        }
      })
      .catch(err => console.log(err));
    await this.props.getAppointments()
    await this.props.setActive(this.props.employee)
  }
  updateAppointment = async event => {
    await API.updateAppointment({

      update: {
        date: this.state.date,
        slot: [this.state.time],
        service: this.state.service,
        CustomerId: this.state.id,
        EmployeeId: this.props.empId
      },

      initial: {
        date: this.props.date,
        service: this.props.service,
        slot: this.props.slot,
        CustomerId: this.state.id,
        EmployeeId: this.props.empId
      }
    })
      .then(res => {
        console.log(res)
        if (res.data !== "error") { window.Materialize.toast(`Appointment Successfully Updated!`, 5000) } else {
          window.Materialize.toast('Looks Like Something Went Wrong, Please Try Again.', 5000)
        } this.setState({ step: 0, date: "", time: "" })

      })
      .catch(err => console.log(err));
    await this.props.getAppointments()
    await this.props.setActive(this.props.employee)

  };


  render() {
    const errors = validate(this.state.firstName, this.state.lastName, this.state.email,
      this.state.phone);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };
    return (

      <Modal
        actions={
          <div>
            <Button
              disabled={this.state.step === 4 ? false : true}
              style={{ marginLeft: "5px" }}
              type="button"
              className="modal-close btn  blue waves-effect waves-light"
              onClick={this.updateAppointment}
            >
              Update Appt
            </Button>
            <Button
              disabled={isDisabled}
              style={{ marginLeft: "5px" }}
              type="button"
              className="modal-close btn  blue waves-effect waves-light"
              onClick={() => this.updateCustomer(this.props.custId)}
            >
              Update Cust
            </Button>



            <Button style={{ marginLeft: "5px" }}
              className="blue" modal="close" waves="light"
            >
              Close
            </Button>
          </div>
        }
        id=""
        role="dialog"
        header="Update Customer Information"
        trigger={<Col s={3}  ><Button raised="true" tooltip="Update" className="tooltipped blue waves-effect waves-light"><Icon large className="white-text">update</Icon></Button></Col>}
      >
        <Row>
          <Input
            l={6}
            s={12}
            className={shouldMarkError('firstName') ? "error invalid" : ""}
            label="First Name"
            name="firstName"
            maxLength={15}
            onBlur={this.handleBlur('firstName')}
            placeholder={this.props.firstName}
            defaultValue={this.state.firstName}
            onChange={this.handleInputChange}
          >
            <Icon>account_circle</Icon>
          </Input>

          <Input
            m={6}
            s={12}
            label="Last Name"
            type="text"
            maxLength={15}
            className={shouldMarkError('lastName') ? "error invalid" : ""}
            name="lastName"
            onBlur={this.handleBlur('lastName')}
            defaultValue={this.state.lastName}
            onChange={this.handleInputChange}
          >
            <Icon>account_circle</Icon>
          </Input>
          <Input
            m={6}
            s={12}
            label="Email"
            type="email"
            className={shouldMarkError('email') ? "error invalid" : ""}
            name="email"
            maxLength={30}
            onBlur={this.handleBlur('email')}
            placeholder={this.props.email}
            defaultValue={this.state.email}
            onChange={this.handleInputChange}
          >
            <Icon>email</Icon>
          </Input>

          <Input
            m={6}
            s={12}
            label="Telephone"
            className={shouldMarkError('phone') ? "error invalid" : ""}
            name="phone"
            maxLength={10}
            onBlur={this.handleBlur('phone')}
            placeholder={this.props.phone}
            defaultValue={this.state.phone}
            onChange={this.handleInputChange}
          >
            <Icon>phone</Icon>
          </Input>

          <Input
            m={6}
            s={12}
            label="New Appointment Date"
            className="black-text"
            type="date"
            name="date"
            placeholder={this.state.date}
            value={this.state.date}
            onChange={this.handleDateChange}
            options={
              {min: new Date() , max: this.state.maxDate, format:"yyyy-mm-dd" }}
          >
            <Icon>date_range</Icon>
          </Input>
          <Input
            name="service"
            label={this.state.step < 2 ? "First, Choose A Date" : "Choose A Service"}
            disabled={this.state.step < 2 ? true : false}
            s={12}
            m={6}
            type="select"
            onChange={this.handleServiceChange}
            className="modalDrop"
          >

            <option name="active" type="number" value={1}>Regular Cut</option>
            <option name="active" type="number" value={2}>Shampoo, Style And Cut</option>
            <option name="active" type="number" value={3}>Other</option>
            <option name="active" type="number" value={4}>Other And Other</option>
            <option name="active" type="number" value={5}>Cut, Style And Color</option>
            <option name="active" type="number" value={6}>Cut, Style, Color, Press</option>
            <option name="active" type="number" value={7}>Perm</option>
            <option name="active" type="number" value={8}>Regular Cut</option>

          </Input>

          <Input
            name="time"
            m={6}
            s={12}
            className="modalDrop"
            label="New Appointment Time"
            type="select"
            onChange={this.handleTimeChange}
            disabled={this.state.step < 3 ? true : false}
          >
            {this.renderAppointmentTimes()}

          </Input>



        </Row>
      </Modal>
    );
  }
}

export default EmpApptUpdateModal;
