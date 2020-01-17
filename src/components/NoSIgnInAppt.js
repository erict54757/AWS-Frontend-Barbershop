
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import io from "socket.io-client";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Row, Input, Button, Icon, Section, Col } from "react-materialize";
import API from "../utils/API";


import moment, { months } from "moment";
import "./NewAppointment.css";

function validate(firstName, lastName, email, phone) {
  // true means invalid, so our conditions got reversed
  return {
    firstName: firstName.length === 0,
    last_name: lastName.length === 0,
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

class NoSignInAppt extends Component {



  constructor() {
    super();
    this.socket = io("https://mighty-cliffs-91335.herokuapp.com/" /*, {transports: ['websocket']}*/);
    this.socket.on('connect', () => {
      console.log('connected');
    });
    this.socket.on('message', (data) => {
      console.log(data.apptCust[0]);
      if(this.state.date===data.apptCust[0].date&&this.state.employeeId===data.apptCust[0].EmployeeId){
         this.setState({ step: 1 });
          window.Materialize.toast("New Appointments Have Been Made", 10000);
      } console.log(this.state.appointments.appointments)
      console.log(this.state.appointments.appointments[data.apptCust[0].EmployeeId][data.apptCust[0].date])
      let currentSchedule= this.state.appointments.appointments[data.apptCust[0].EmployeeId][data.apptCust[0].date]
      let updatedSchedule = currentSchedule.concat(data.apptCust)
      console.log(updatedSchedule)
      let sortAppts =  updatedSchedule.sort((a, b) => (a.slot - b.slot))
      
      this.setState(this.state.appointments.appointments[data.apptCust[0].EmployeeId][data.apptCust[0].date]=sortAppts)
    //  console.log(this.state.appointments.appointments[data.apptCust[0].EmployeeId][data.apptCust[0].date])
    console.log(this.state.appointments)
    });

    this.state = {
      
  
    maxDate: moment().add(1, 'months').toDate(),
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
    filteredEmployees: undefined,
    employeeId: "",
    active: "",
    employees: [],
    Days: [],
    appointments: [],
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    loading: true,
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
  }

  initialState = {
    maxDate: moment().add(1, 'months').toDate(),
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
    filteredEmployees: undefined,
    employeeId: "",
    active: "",
    employees: [],
    Days: [],
    appointments: [],
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    loading: true,
    schedule: {},
    appointmentDateSelected: true,
    appointmentMeridiem: 0,
    touched: {
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
    }
  }

  state = {
    maxDate: moment().add(1, 'months').toDate(),
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
    filteredEmployees: undefined,
    employeeId: "",
    active: "",
    employees: [],
    Days: [],
    appointments: [],
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    loading: true,
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



  async componentDidMount() {
    this.setState({
      loading: true
    })
    this.loadDaysOff();

    await this.loadEmployees();
    await this.getAppointments();
    await this.filteredEmployees(this.state.employees, this.state.date)

    await this.setState({
      loading: true,

    })
  }
  loadDaysOff = () => {
    API.getDaysOffCust()
      .then(res => this.setState({
        daysOff: res.data,

      }))
  };
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
  handleFetch(response) {
    if (!this.state.loading) {
      const { appointments } = response

      const filteredAppointments = appointments[this.state.employeeId][this.state.date]

      console.log(appointments, filteredAppointments)
      const initSchedule = {}
      const today = moment().subtract(1, 'day')
      initSchedule[today.format('YYYY-MM-DD')] = true
      const schedule = !filteredAppointments.length ? initSchedule : filteredAppointments.reduce((currentSchedule, appointment) => {

        const { date, slot, EmployeeId, service } = appointment

        const dateString = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')

        // console.log(currentSchedule)
        !currentSchedule[date] ? currentSchedule[dateString] = Array(40).fill(false) : null
        Array.isArray(currentSchedule[dateString]) ?
          currentSchedule[dateString][slot] = true : null
        return currentSchedule
      }, initSchedule)

      //Imperative x 100, but no regrets
      for (let day in schedule) {
        let slots = schedule[day]

        slots.length ? (slots.every(slot => slot === true)) ? schedule[day] = true : null : null
      }
      this.setState({
        schedule,
        loading: true
      })
    } else {

      return null
    }
  }

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

  loadEmployees = () => {
    API.getEmployeesCust()
      .then(res => this.setState({ employees: res.data }))
      .then(res => console.log(this.state.employees))
      .catch(err => console.log(err));
  };
  getAppointments = () => {
    API.getAppointmentsCust()
      .then(res => this.setState({ appointments: { appointments: res.data } }))
      .catch(err => console.log(err));
  };
  // convertDay = () => {
  //   this.setState({day:moment(this.state.appointmentDate,'YYYY-MM-DD').format("DDDD")
  // });
  // }
  isWorking = () => {
    // console.log(date)
    let test = moment().add(1, 'days').toDate()
    console.log(test)
    //  this.setState({disableDayFn:test})
    //  let day= moment(date).format("dddd")
    //  let anyWorking=""
    //  this.state.employees.forEach(element => {
    //   if(element.day==="on"){
    //     anyWorking=true
    //   }
    //  });
    //  if(anyWorking===true){return true}else{return false}
    return test
  }
  convertTime = () => {
    this.setState({
      appointmentDate: this.state.date,
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
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      loading: false,
      step: 1,
      [name]: value,
      day: moment(value, 'YYYY-MM-DD').format("dddd")


    }); console.log(this.state.day)
    this.filteredEmployees(this.state.employees, this.state.day)
  };
  handleEmployeeChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      loading: false,
      active: value,
      [name]: value
    });
    this.convertTime();

    // console.log(this.state.appointments)
    this.handleFetch(this.state.appointments)
    this.setState({
      loading: false,
      step: 2,
    });

  };
  handleClose = event => {
    this.props.closeAppt()
    this.setState(this.initialState)

  }

  handleSubmit = async event => {

    await API.saveCustomerNoSignCust({

      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phone,
      time: this.state.time,
      date: this.state.date,
      service: this.state.service,
      employeeId: this.state.active,
      account_key: "Customer18"
    }).then(res => {
console.log(res.data)
      const socket = io("https://mighty-cliffs-91335.herokuapp.com/")
      socket.send(res.data)
      if (res.data.status === "success") { window.Materialize.toast(`Confirmation Details Sent to ${res.data.email}!`, 5000); this.props.apptMade(`Confirmation Email Sent!`) } else {
        window.Materialize.toast('Looks Like Something Went Wrong, Please Try Again.', 5000); this.props.apptMade("Error, Please Try Again")
      }
    });

    this.setState(this.initialState)
    this.componentDidMount();

  }
  renderAppointmentTimes() {
    if (!this.state.loading && this.state.step >= 3) {

      console.log(this.state.employees)
      const shiftEndTime = this.state.day + "shiftEndTime"
      const shiftStartTime = this.state.day + "shiftStartTime"
      const filteredEmployee = this.state.employees.filter(employee => employee.id == this.state.employeeId)
      const filteredEmployeeObject = filteredEmployee[0]

      const filteredEmployeeDayOff = this.state.daysOff.filter(daysOff => daysOff.EmployeeId == this.state.employeeId)
      const filteredEmployeeDayOffToday = filteredEmployeeDayOff.filter(daysOff => daysOff.date == this.state.date)

      const slots = [...Array(40).keys()]

      return slots.map(slot => {
        console.log(this.state.schedule)
        const appointmentDateString = this.state.appointmentDate
        const t1 = moment().hour(9).minute(0).add(slot / 4, 'hours')
        const t2 = moment().hour(9).minute(0).add(slot / 4 + (.25 * this.state.service), 'hours')
        const timeNow = moment().format('YYYY-MM-DD') === this.state.appointmentDate && moment().hour() > 9 ? (moment().hour() - 8.5) * 4 >= slot ? true : false : false
        const withinSchedule = slot >= filteredEmployeeObject[shiftStartTime] && slot + this.state.service <= filteredEmployeeObject[shiftEndTime] ? false : true
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
              if (slot + i >= filteredEmployeeDayOffToday[0].slotBegin && slot + i < filteredEmployeeDayOffToday[0].slotEnd) {
                anyTaken = true
              }
            }

          }
          if (!timeNow && !withinSchedule && !withinDayOff && !anyTaken) {
            return <Button

              style={{ margin: "5px", width: "160px", paddingLeft: "0px", paddingRight: "0px" }}
              waves="light"
              name="time"
              onClick={this.handleTimeChange}
              key={slot}
              value={value}
              disabled={scheduleDisabled || timeNow || withinSchedule || withinDayOff || anyTaken}
            >{t1.format('h:mm a') + ' - ' + t2.format('h:mm a')}</Button>
          } else { null }
        }

        return optionSelect(this.state.service)


      })
    } else {
      return null
    }
  }

  filteredEmployees = (employees, day) => {
    console.log(day)
    if (day === "Sunday") {
      this.setState({
        filteredEmployees: employees.filter(employee => employee.Sunday === "on")
      });
    }

    if (day === "Monday") {
      this.setState({
        filteredEmployees: employees.filter(employee => employee.Monday === "on")
      });
    }
    if (day === "Tuesday") {
      this.setState({
        filteredEmployees: employees.filter(employee => employee.Tuesday === "on")
      });
    }
    if (day === "Wednesday") {
      this.setState({
        filteredEmployees: employees.filter(employee => employee.Wednesday === "on")
      });
    }
    if (day === "Thursday") {
      this.setState({
        filteredEmployees: employees.filter(employee => employee.Thursday === "on")
      });
    }
    if (day === "Friday") {
      this.setState({
        filteredEmployees: employees.filter(employee => employee.Friday === "on")
      });
    }
    if (day === "Saturday") {
      this.setState({
        filteredEmployees: employees.filter(employee => employee.Saturday === "on")
      });
    } if (day === "Choose A Date") { this.setState({ filteredEmployees: undefined }) }
  };
  render() {
    const errors = validate(this.state.firstName, this.state.lastName, this.state.email, this.state.phone);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };
    console.log(this.state,errors,isDisabled)

    return (
      <Section> <h4>{this.state.step < 4 ? "Make A New Appointment" : "Some Confirmation Details And We're All Set."}</h4>
        <div className="container">
          <div className="row">
        


            {this.state.step < 4 ? <div>
              <Row>

                <Input
                  disabled={this.state.step > 4 ? true : false}
                  s={12}
                  className={this.state.step > 0 ? "valid green-text datepicker" : "black-text datepicker"}
                  type="date"
                  name="date"
                  placeholder={this.state.date}
                  defaultValue={this.state.date}
                  onChange={this.handleDateChange}
                  
                  options={
                    { min: new Date(), max: this.state.maxDate,  format:"yyyy-mm-dd"}
                  }
                >
                  <Icon>date_range</Icon>
                </Input>

              </Row>
              <Row>
                {this.state.filteredEmployees !== undefined ? (
                  //  {/* <Icon>account_circle</Icon> */}
                  <Input
                    disabled={this.state.step === 0 ? true : false}
                    name="employeeId"

                    s={12}
                    label={this.state.filteredEmployees.length === 0 ? "Oops, Looks Like We're Closed" : "Choose an Employee"}
                    type="select"
                    onChange={this.handleEmployeeChange}
                    className={this.state.step > 1 ? "valid green-text modalDrop" : "modalDrop black-text"}
                    icon="person"
                  >
                    {this.state.filteredEmployees.map(employee => (
                      <option name="active" id="name" key={employee.id} value={employee.id}>
                        {employee.first_name} {employee.last_name}
                      </option>
                    ))}

                  </Input>) : (<Input

                    disabled={this.state.step === 0 ? true : false}
                    name="employeeId"

                    s={12}
                    label="First, Choose A Date"
                    type="select"
                    className="modalDrop"
                    icon="arrow_upward"

                  ></Input>)}

                <Input
                  disabled={this.state.step < 2 ? true : false}
                  name="service"
                  label={this.state.step < 2 ? "First, Choose A Stylist" : "Choose A Service"}
                  s={12}

                  type="select"
                  onChange={this.handleServiceChange}
                  className={this.state.step < 3 ? "modalDrop black-text" : "valid green-text modalDrop"}
                  icon={this.state.step < 2 ? "arrow_upward" : this.state.step < 3 ? "arrow_forward" : "arrow_downward"}
                >
                  <option name="active" type="number" value={1}>Regular Cut</option>
                  <option name="active" type="number" value={2}>Shampoo, Style And Cut</option>
                  <option name="active" type="number" value={3}>Other</option>
                  <option name="active" type="number" value={4}>Other And Other</option>
                  <option name="active" type="number" value={5}>Cut, Style And Color</option>
                  <option name="active" type="number" value={6}>Cut, Style, Color, Press</option>
                  <option name="active" type="number" value={7}>Perm</option>
                  <option name="active" type="number" value={8}>Regular Cut</option>

                </Input></Row>
              <div
                disabled={this.state.step < 3 ? true : false}
                s={12}
                l={12}
                className={this.state.step < 4 ? "black-text center" : "valid green-text  center"}
              ><div >{this.state.step < 3 ? "First, Choose A Service" : "Choose A Time"}</div>
                {this.renderAppointmentTimes() ? this.renderAppointmentTimes().every(element => element === undefined) ? "No Times Available" : this.renderAppointmentTimes() : null}
              </div>
            </div> : <div className="scale-transition"><Row>
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
                type="text"
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
            }

            <Col s={12} className="center" style={{ marginTop: "50px" }}>
              <Button
                disabled={this.state.step !== 8 ? true : false}
                disabled={isDisabled}
                className="btn blue lighten-1 "
                onClick={this.handleSubmit}
              >
                Save Appointment
            </Button>
              <Button
                style={{ marginLeft: "5px" }}
                className="blue"
                onClick={this.handleClose}
                waves="light"
              >
                Close
            </Button>
            </Col>


          </div>
        </div>
      </Section>
    );
  }
}
export default NoSignInAppt;