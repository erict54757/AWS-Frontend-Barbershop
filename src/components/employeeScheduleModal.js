/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Row, Button, Input, Icon,Col } from "react-materialize";
import "./employeeScheduleModal.css";
import API from "../utils/API";
import moment from "moment"


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

function validatePhone(phoneNumber) {
  const regex = /^(1\s|1|)?((\(\d{3}\))|\d{3})(|\s)?(\d{3})(|\s)?(\d{4})$/
  return regex.test(phoneNumber) ? false : true
}


class EmployeeScheduleModal extends Component {
  state = {
    maxDate:moment().add(1, 'months').toDate(),
    daysOff: this.props.daysOff,
    loading: true,
    CustomerId: "",
    EmployeeId: this.props.id,
    step: 0,
    service: 0,
    date: "Choose A Date",
    day: moment().format('dddd'),
    appointmentDate: moment().format('YYYY-MM-DD'),
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "customer18",
    appointments: this.props.appointments,
    schedule: {},
    appointmentDateSelected: true,
    appointmentMeridiem: 0,

    touched: {
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
    }
  };
  initialState = {
    maxDate:moment().add(1, 'months').toDate(),
    daysOff: this.props.daysOff,
    loading: false,
    CustomerId: "",
    EmployeeId: this.props.id,
    step: 0,
    service: 0,
    date: "Choose A Date",
    day: moment().format('dddd'),
    appointmentDate: moment().format('YYYY-MM-DD'),
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "customer18",
    appointments: this.props.appointments,
    schedule: {},
    appointmentDateSelected: true,
    appointmentMeridiem: 0,

    touched: {
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
    }
  };
  // componentDidUpdate(){
  //   this.renderAppointmentTimes()
  // }

  handleSetAppointmentMeridiem(meridiem) {
    this.setState({ appointmentMeridiem: meridiem })
  }
  handleSetAppointmentDate(date) {
    this.setState({ appointmentDate: date })
  }
  hasPast() {
    return moment().format('YYYY-MM-DD') > this.state.appointmentDate ? true : false
  }
  handleSetAppointmentSlot(slot) {
    this.setState({ appointmentSlot: slot })
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
  convertTime = () => {

    this.setState({
      appointmentDate: moment(this.state.date, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      day: moment(this.state.date, 'YYYY-MM-DD').format("dddd")
    });
  }
  handleTimeChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      [name]: value,
      step: 4
    });
  };
  handleServiceChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      [name]: parseInt(value),
      step: 3
    });
  };
  handleNameChange = event => {

    let value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
      step: 5
    });

  };
  handleLastNameChange = event => {

    let value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
      step: 6
    });

  };
  handleEmailChange = event => {

    let value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
      step: 7
    });

  };
  handlePhoneChange = event => {

    let value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
      step: 8
    });

  };
  handleDateChange = event => {

    let value = event.target.value;
    const name = event.target.name;

    // name === "date" ? value = (moment(event.target.value, "DD MMMM, YYYY").format('YYYY-MM-DD')) : (event.target.value)
    this.setState({ time: "" })
    console.log(this.props.employee)
    this.setState({
      step: 2,
      [name]: value,
      loading: true
    });
    console.log(this.props.appointments)
    this.convertTime()
    if (this.props.appointments == undefined) {
      this.handleFetch("[]")
    } else { this.handleFetch(this.props.appointments) }
  };
  handleReset=async ()=>{
   
    await this.props.newApptOff
   await this.setState(this.initialState)
    
  }
  handleFetch(response) {

    if (!this.state.loading) {
      const { appointments } = response
     
      const filteredAppointments = this.state.appointments[this.state.appointmentDate]
     
      const initSchedule = {}
      const today = moment().subtract(1, 'day')
      initSchedule[today.format('YYYY-MM-DD')] = true
      const schedule = !filteredAppointments.length ? initSchedule : filteredAppointments.reduce((currentSchedule, appointment) => {

        const { date, slot, EmployeeId } = appointment
        console.log(slot)
        const dateString = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')

        console.log(currentSchedule)
        !currentSchedule[date] ? currentSchedule[dateString] = Array(41).fill(false) : null
        Array.isArray(currentSchedule[dateString]) ?
          currentSchedule[dateString][slot] = true : null
        return currentSchedule
      }, initSchedule)
      console.log(schedule)
      //Imperative x 100, but no regrets
      for (let day in schedule) {
        let slots = schedule[day]
        console.log(day)
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


      console.log(this.state.EmployeeId)
      const shiftEndTime = this.state.day + "shiftEndTime"
      const shiftStartTime = this.state.day + "shiftStartTime"
      console.log(this.props.employee[this.state.day])
      const isWorking = this.props.employee[this.state.day] === "on" ? false : true
      const filteredEmployeeDayOff = this.state.daysOff.filter(daysOff => daysOff.EmployeeId == this.state.EmployeeId)
      const filteredEmployeeDayOffToday = filteredEmployeeDayOff.filter(daysOff => daysOff.date == this.state.date)
      console.log(filteredEmployeeDayOffToday)
      console.log(filteredEmployeeDayOff)
      const slots = [...Array(40).keys()]
      // console.log(slots)       
      //  const withinDayOff = filteredEmployeeDayOffToday.length > 0 ? slot >= filteredEmployeeDayOffToday[0].slotBegin && slot < filteredEmployeeDayOffToday[0].slotEnd ? true : false : false
       
      return slots.map(slot => {
 const withinSchedule = slot >= this.props.employee[shiftStartTime] && slot +this.state.service<= this.props.employee[shiftEndTime] ? false : true
        const appointmentDateString = this.state.appointmentDate
        const t1 = moment().hour(9).minute(0).add(slot / 4, 'hours')
        const t2 = moment().hour(9).minute(0).add(slot / 4 + (.25 * this.state.service), 'hours')
        const timeNow = moment().format('YYYY-MM-DD') === this.state.appointmentDate && moment().hour() > 9 ? (moment().hour() - 8.5) * 4 >= slot ? true : false : false
        const hasPast = moment().format('YYYY-MM-DD') > this.state.appointmentDate ? true : false
        // const withinSchedule = slot >= filteredEmployeeObject[shiftStartTime] && slot + this.state.service <= filteredEmployeeObject[shiftEndTime] ? false : true
        const withinDayOff = filteredEmployeeDayOffToday.length > 0 ? slot >= filteredEmployeeDayOffToday[0].slotBegin && slot + this.state.service < filteredEmployeeDayOffToday[0].slotEnd ? true : false : false
        const scheduleDisabled = this.state.schedule[appointmentDateString] ? this.state.schedule[this.state.appointmentDate][slot] : false
        //  const scheduleEndTime =currentValue=>{ if(this.state.schedule[appointmentDateString])this.state.schedule[this.state.appointmentDate][slot+currentValue]===true}
        //  const valueSlots = [...Array(this.state.service).keys()]
        // const scheduleIsTaken= valueSlots.every(scheduleEndTime)

        const optionSelect = serviceType => {
          let value = []
          let anyTaken = false

          for (let i = 0; i < serviceType; i++) {
            value.push(slot + i);
            if (this.state.schedule[appointmentDateString]) {
              if (this.state.schedule[this.state.appointmentDate][slot + i]) {
                anyTaken = true

              }
            }
            if (filteredEmployeeDayOffToday[0]) {
              if (slot +i >= filteredEmployeeDayOffToday[0].slotBegin && slot + i < filteredEmployeeDayOffToday[0].slotEnd) {
                anyTaken = true
              }
            }

          }
          if ( !timeNow && !hasPast && !withinSchedule && !withinDayOff && !anyTaken) {
            return <Button

              style={{ margin: "5px", width: "160px", paddingLeft: "0px", paddingRight: "0px" }}
              waves="light"
              name="time"
              onClick={this.handleTimeChange}
              key={slot}
              value={value}
              disabled={scheduleDisabled || timeNow || hasPast || withinSchedule || withinDayOff || anyTaken}
            >{t1.format('h:mm a') + ' - ' + t2.format('h:mm a')}</Button>
          } else { null }
        }

        return optionSelect(this.state.service)


      })
    } else {
      return null
    }
  }


  // handleInputChange = event => {

  //   let value = event.target.value;
  //   const name = event.target.name;
  //   // name === "date" ? value = (moment(event.target.value, 'YYYY-MM-DD').format('YYYY-MM-DD')) : (event.target.value)
  //   this.setState({
  //     [name]: value
  //   });

  // };


  handleSubmit = async event => {
    console.log("hellooooo" + this.state.time)
    await API.saveCustomerNoSign({

      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,  
      phoneNumber: this.state.phone,
      time: this.state.time,
      date: this.state.date,
      service: this.state.service,
      employeeId: this.props.id,
      account_key: "Customer18"
    }).then(res => {
      if (res.data.status === "success") { window.Materialize.toast(`Confirmation Details Sent to ${res.data.email}!`, 7000) } else {
        window.Materialize.toast('Looks Like Something Went Wrong, Please Try Again.', 7000)
      }
    });
this.props.newApptOff()
    this.props.reset();
  }

  render() {
    
    const errors = validate(this.state.firstName, this.state.lastName, this.state.email, this.state.phone);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };
    return (
      <Col s={12}
       
      
      >    <h4 className="col s12">  {this.state.step < 4 ? "Make A New Appointment" : "Some Confirmation Details And We're All Set."}</h4>
        <div className="container">
          <div className="row">
            <form>
              {this.state.step < 4 ? <div>
                <div>
                  <Input
                    l={6}
                    s={12}
                    disabled={this.state.step > 4 ? true : false}
                    s={12}
                    className={this.state.step > 0 ? "valid green-text" : "black-text"}
                    type="date"
                    name="date"
                    placeholder={this.state.date}
                    defaultValue={this.state.date}
                    onChange={this.handleDateChange}
                    options={
                      {min: new Date() , max: this.state.maxDate
            
                        }
                    }  
                    
                    icon={this.state.step>0?"date_range":"arrow_forward"}
                  >
                    
                  </Input>




                  <Input
                    disabled={this.state.step < 2 ? true : false}
                    name="service"
                    label={this.state.step < 2 ? "First, Choose A Date" : "Choose A Service"}
                    s={12}
                    l={6}
                    type="select"
                    onChange={this.handleServiceChange}
                    className={this.state.step < 3 ? " black-text" : "valid green-text "}
                    icon={this.state.step!==3?this.state.step===2?"arrow_forward":"":"arrow_downward"}
                  >
                    <option name="active" type="number" value={1}>Regular Cut</option>
                    <option name="active" type="number" value={2}>Shampoo, Style And Cut</option>
                    <option name="active" type="number" value={3}>Other</option>
                    <option name="active" type="number" value={4}>Other And Other</option>
                    <option name="active" type="number" value={5}>Cut, Style And Color</option>
                    <option name="active" type="number" value={6}>Cut, Style, Color, Press</option>
                    <option name="active" type="number" value={7}>Perm</option>
                    <option name="active" type="number" value={8}>Regular Cut</option>

                  </Input></div>
                <div
                  disabled={this.state.step < 3 ? true : false}
                  s={12}
                  l={12}
                  className={this.state.step < 4 ? "black-text center" : "valid green-text  center"}
                ><div >{this.state.step < 3 ? "First, Choose A Service" : "Choose A Time"}</div>
                  {this.renderAppointmentTimes() ? this.renderAppointmentTimes().every(element => element === undefined) ? "No Times Available" : this.renderAppointmentTimes() : null}
                </div>
              </div> : <div><Row>
                <Input
                  style={{ display: "none" }}
                  s={12}
                >

                </Input>
                <Input
                  l={6}
                  s={12}
                  className={shouldMarkError('firstName') ? "error invalid" : this.state.step > 4 ? "valid green-text" : "black-text"}
                  label="First Name"
                  name="firstName"
                  maxLength={20}
                  onBlur={this.handleBlur('firstName')}
                  value={this.state.firstName}
                  onChange={this.handleNameChange}
                >
                  <Icon>account_circle</Icon>
                </Input>
                <Input
                  l={6}
                  s={12}
                  className={shouldMarkError('lastName') ? "error invalid" : this.state.step > 5 ? "valid green-text" : "black-text"}
                  label="last Name"
                  name="lastName"
                  maxLength={20}
                  onBlur={this.handleBlur('lastName')}
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange}
                >
                  <Icon>account_circle</Icon>
                </Input>

                <Input
                  m={6}
                  s={12}
                  label="Email"
                  type="email"
                  className={shouldMarkError('email') ? "error invalid" : this.state.step > 6 ? "valid green-text" : "black-text"}
                  name="email"
                  maxLength={35}
                  onBlur={this.handleBlur('email')}
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                >
                  <Icon>email</Icon>
                </Input>
                <Input
                  m={6}
                  s={12}
                  label="Phone"
                  name="phone"
                  type="number"
                  maxLength={10}
                  className={shouldMarkError('phone') ? "error invalid" : this.state.step > 7 ? "valid green-text" : "black-text"}
                  onBlur={this.handleBlur('phone')}
                  value={this.state.phone}
                  onChange={this.handlePhoneChange}
                >
                  <Icon>phone</Icon>
                </Input>

              </Row>
                </div>
              }   <Row className="center" style={{marginTop:"30px"}}>
            <Button
              waves="light"
              type="button"
              disabled={isDisabled}
              className="btn  blue waves-effect waves-light"
              onClick={this.handleSubmit}
            >
              Create
            </Button>

            <Button
              style={{ marginLeft: "5px" }}
              className="blue"
              
              onClick={this.handleReset}
              waves="light"
            >
              Close
            </Button>
          </Row>
            </form>
          </div>
        </div>
      </Col>
    );
  }
}

export default EmployeeScheduleModal;
