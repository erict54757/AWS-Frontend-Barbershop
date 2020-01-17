import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Row, CardPanel, Input, Icon, Tab, Tabs, Col, Button } from "react-materialize";
import ManagerPortalModal from "./managerPortalModal";
import DaySchedule from "./DaySchedule"

import moment from "moment";
import API from "../utils/API";
import "./managerPortal.css";
import Tab4 from "./Tab4"
import DeleteEmployee from "./DeleteEmployee"
import Appointment from "./DumbApptCard"
import ManagerMode from "./ManagerMode"
import DeleteEmpSchedule from "./DeleteEmpSchedule"
import io from "socket.io-client";

class ManagerPortal extends Component {
  constructor() {
  super();
  this.socket = io("https://mighty-cliffs-91335.herokuapp.com/" /*, {transports: ['websocket']}*/);
  this.socket.on('connect', () => {
    console.log('connected');
  });
  this.socket.on('message', (data) => {
    console.log(data.apptCust[0]);
    if(this.state.date===data.apptCust[0].date&&this.state.active===data.apptCust[0].EmployeeId){
       this.setState({ step: 1 });
        window.Materialize.toast("New Appointments Have Been Made", 10000);
    } console.log(this.state.appointments)
    console.log(this.state.appointments[data.apptCust[0].EmployeeId][data.apptCust[0].date])
    let currentSchedule= this.state.appointments[data.apptCust[0].EmployeeId][data.apptCust[0].date]
    let updatedSchedule = currentSchedule.concat(data.apptCust)
    console.log(updatedSchedule)
    let sortAppts =  updatedSchedule.sort((a, b) => (a.slot - b.slot))
    
    this.setState(this.state.appointments[data.apptCust[0].EmployeeId][data.apptCust[0].date]=sortAppts)
  //  console.log(this.state.appointments[data.apptCust[0].EmployeeId][data.apptCust[0].date])
  console.log(this.state.appointments)
  });
  this.state = {
      
    
      managerMode: true,
      minDate: moment().subtract(7, 'days').toDate(),
      touched: false,
      date: moment().format('YYYY-MM-DD'),
      appointments: [],
      appt: [],
      filtered: [],
      employees: [],
      employee: [],
      custName: "",
      employeeInfoTab: true,
      employeeScheduleTab: true,
      scheduleTab: true,
      active: "",
      Sunday: "",
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      FridayshiftEndTime: "",
      FridayshiftStartTime: "",
      MondayshiftEndTime: "",
      MondayshiftStartTime: "",
      SaturdayshiftEndTime: "",
      SaturdayshiftStartTime: "",
      SundayshiftEndTime: "",
      SundayshiftStartTime: "",
      ThursdayshiftEndTime: "",
      ThursdayshiftStartTime: "",
      TuesdayshiftEndTime: "",
      TuesdayshiftStartTime: "",
      WednesdayshiftEndTime: "",
      WednesdayshiftStartTime: "",
      loading: true,
      withinRequestAppt: []
    
  

    };
  }

  state = {
    managerMode: true,
    minDate: moment().subtract(7, 'days').toDate(),
    touched: false,
    date: moment().format('YYYY-MM-DD'),
    appointments: [],
    appt: [],
    filtered: [],
    employees: [],
    employee: [],
    custName: "",
    employeeInfoTab: true,
    employeeScheduleTab: true,
    scheduleTab: true,
    active: "",
    Sunday: "",
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    FridayshiftEndTime: "",
    FridayshiftStartTime: "",
    MondayshiftEndTime: "",
    MondayshiftStartTime: "",
    SaturdayshiftEndTime: "",
    SaturdayshiftStartTime: "",
    SundayshiftEndTime: "",
    SundayshiftStartTime: "",
    ThursdayshiftEndTime: "",
    ThursdayshiftStartTime: "",
    TuesdayshiftEndTime: "",
    TuesdayshiftStartTime: "",
    WednesdayshiftEndTime: "",
    WednesdayshiftStartTime: "",
    loading: true,
    withinRequestAppt: []
  };


  async componentDidMount() {
    this.setState({ loading: true, employeeInfoTab: true })
    this.loadEmployees();
    this.loadAppointmentsStartUp();
    this.loadDaysOff()
    await this.setState({ loading: false, })
  }

  loadWithinRequestAppt = appt => {

    this.setState({
      employeeInfoTab: false,
      employeeScheduleTab: false,
      scheduleTab: false,
      requestOff: true, withinRequestAppt: appt
    });
  }
  loadDaysOff = () => {
    API.getDaysOff()
      .then(res => this.setState({
        daysOff: res.data,
      }))
  };
  RequestOff = employee => {
    console.log("hellooooooooo request")
    this.setState({
      active: employee.id,
      employee: employee,
      employeeInfoTab: false,
      employeeScheduleTab: false,
      scheduleTab: false,
      requestOff: true
    });
    this.changeShifts(employee);

  }

  deleteLoadDaysOff = () => {
    API.getDaysOff()
      .then(res => this.setState({
        daysOff: res.data,
        employeeInfoTab: false,
        employeeScheduleTab: false,
        scheduleTab: false,
        requestOff: true
      }))
  };
  managerMode = () => {
    this.setState({ managerMode: true })
  }
  managerModeOff = () => {
    this.setState({ managerMode: false })
  }

  loadEmployees = () => {
    API.getEmployees()
      .then(res => this.setState({ employees: res.data }))
      .catch(err => console.log(err));
  };
  //displaying the chosen employee
  setActive = (employee) => {
    console.log("hellooooooooo")
    this.setState({
      employee: employee,
      employeeInfoTab: false,
      employeeScheduleTab: true,
      scheduleTab: false,
      requestOff: false
    });
    this.changeShifts(employee);
  };


  changeEmployee = employee => {
    this.setState({
      active: employee.id,
      employee: employee,
      requestOff: false,
      employeeInfoTab: true
    });
    this.changeShifts(employee);
  };
  changeEmployeeSchedule = employee => {
    this.setState({
      active: employee.id,
      employee: employee,
      employeeInfoTab: false,
      requestOff: false,
      employeeScheduleTab: true
    });
    this.changeShifts(employee);
  };
  changeSchedule = employee => {
    this.setState({
      active: employee.id,
      employee: employee,
      employeeInfoTab: false,
      employeeScheduleTab: false,
      scheduleTab: true,
    });
    this.changeShifts(employee);

  };
  changeShifts = (employee) => {
    this.setState({
      Sunday: employee.Sunday,
      Monday: employee.Monday,
      Tuesday: employee.Tuesday,
      Wednesday: employee.Wednesday,
      Thursday: employee.Thursday,
      Friday: employee.Friday,
      Saturday: employee.Saturday,
      FridayshiftEndTime: employee.FridayshiftEndTime,
      FridayshiftStartTime: employee.FridayshiftStartTime,
      MondayshiftEndTime: employee.MondayshiftEndTime,
      MondayshiftStartTime: employee.MondayshiftStartTime,
      SaturdayshiftEndTime: employee.SaturdayshiftEndTime,
      SaturdayshiftStartTime: employee.SaturdayshiftStartTime,
      SundayshiftEndTime: employee.SundayshiftEndTime,
      SundayshiftStartTime: employee.SundayshiftStartTime,
      ThursdayshiftEndTime: employee.ThursdayshiftEndTime,
      ThursdayshiftStartTime: employee.ThursdayshiftStartTime,
      TuesdayshiftEndTime: employee.TuesdayshiftEndTime,
      TuesdayshiftStartTime: employee.TuesdayshiftStartTime,
      WednesdayshiftEndTime: employee.WednesdayshiftEndTime,
      WednesdayshiftStartTime: employee.WednesdayshiftStartTime
    })
  }


  deleteEmployee = (id) => {
    API.deleteEmployee(id)
      .then(res => {
        this.loadEmployees();
      })
      .then(res => {
        this.setState({
          employee: [], employeeInfoTab: false,
          employeeScheduleTab: false,
          scheduleTab: false,
          requestOff: true
        });
      })
      .catch(err => console.log(err));
  };
  deleteEmployeeScheduleTab = (id) => {
    API.deleteEmployee(id)
      .then(res => {
        this.loadEmployees();
      })
      .then(res => {
        this.setState({
          employee: [], employeeInfoTab: false,
          employeeScheduleTab: false,
          scheduleTab: true,
          requestOff: false
        });
      })
      .catch(err => console.log(err));
  };

  // Updating employees appointments
  // ====================================================================
  // sortByTime() {
  //   this.setState(prevState => {
  //     this.state.Appointments.sort((a, b) => (a.time - b.time))
  //   });
  // }
  loadAppointments = () => {
    API.getAppointments()
      .then(res => this.setState({
        appointments: res.data,

      }))
      .catch(err => console.log(err));
  };
  loadAppointmentsStartUp = () => {
    API.getAppointments()
      .then(res => this.setState({
        appointments: res.data,
      }))
      .catch(err => console.log(err));
      console.log(this.state.appointments)
  };

  sendCancelThenDelete = async (id, email, firstName, lastName, time, date, slot, service, EmployeeId, CustomerId) => {
    await API.sendCancellationEmail({
      firstName: firstName, lastName: lastName, email: email, time: time,
      date: date, slot: slot, service: service, EmployeeId: EmployeeId, CustomerId: CustomerId
    })
    const idObject = [...Array(service).keys()].reduce(function (accumulator, service) {
      accumulator[service + id] = true
      return accumulator
    }, {});

    const filteredAppointmentDelete = await this.state.appointments[this.state.active][this.state.date].filter(appointmentDelete => {
      return idObject[appointmentDelete.id] !== true
    })

    await this.setState(
      this.state.appointments[this.state.active][this.state.date]= filteredAppointmentDelete 
    )
    await API.deleteAppointment(id, {
      slot: slot, service: service, date: date,
      CustomerId: CustomerId, EmployeeId: EmployeeId
    })
      .then(res => this.loadAppointments)
      .catch(err => console.log(err));

  };
  deleteAppointment = async (id, appointmentData) => {

    const idObject = await [...Array(appointmentData.service).keys()].reduce(function (accumulator, service) {
      accumulator[service + id] = true
      return accumulator
    }, {});

    const filteredAppointmentDelete = await this.state.appointments[this.state.active][this.state.date].filter(appointmentDelete => {
      return idObject[appointmentDelete.id] !== true
    })

    await this.setState(
      this.state.appointments[this.state.active][this.state.date]= filteredAppointmentDelete 
    )

    await API.deleteAppointment(id, appointmentData)
      .then(() => this.loadAppointments)
      .catch(err => console.log(err));
  };

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
  handleScheduleChange = event => {
    event.preventDefault();
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      [name]: value,
      employeeInfoTab: false,
      employeeScheduleTab: false,
      scheduleTab: true
    });


  };

  handleDateChange = event => {
    event.preventDefault();
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      [name]: value,
      touched: true,
      employeeInfoTab: false,
      employeeScheduleTab: true,
      scheduleTab: false
    });
  };
  handleDateChangeTab4 = event => {
    event.preventDefault();
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // Updating the input's state
    this.setState({
      [name]: value,
      touched: true,
      employeeInfoTab: false,
      employeeScheduleTab: false,
      requestOff: true,
      scheduleTab: false
    });
  };

  updateDayShift = async (shiftstart, valueStart, shiftEnd, valueEnd, day, valueOnOff, active) => {
    this.setState({
      loading: true, employeeScheduleTab: false,
      employeeInfoTab: false,
      requestOff: false,
      scheduleTab: true
    });
    try {
      const employeeData = await API.updateEmployee(this.state.employee.id, {
        [shiftstart]: valueStart,
        [shiftEnd]: valueEnd,
        [day]: valueOnOff
      })
      const employee = employeeData.data
      await this.loadEmployees()
      await this.changeShifts(employee)
      await this.setState({
        // [day+"shiftEndTime"]:valueEnd,[day+"shiftStartTime"]:valueStart,[day]:valueOnOff,
        loading: false,
        employeeScheduleTab: false,
        employee: employeeData.data,
        employeeInfoTab: false,
        requestOff: false,
        scheduleTab: true
      })
    }
    catch (err) {
      console.log(err)
    }

  }

  truncate = function (str, n, str2) {
    if (str[n] === undefined) {
      return str + " " + str2;
    }
    else {
      return str + " " + str2.substr(0, 3) + '...';
    }

  }

  changeDayOff = (event) => {

    const name = event.target.name;
    this.setState({
      [name]: "off",
      employeeInfoTab: false,
      employeeScheduleTab: false,
      scheduleTab: true
    })


  }
  changeDayOn = (event) => {

    const name = event.target.name;
    this.setState({
      [name]: "on",
      employeeInfoTab: false,
      employeeScheduleTab: false,
      scheduleTab: true
    });
  }
  renderApptsManager = (tab) => {


    if (this.state.employee.id) {
      if (this.state.appointments[this.state.employee.id][this.state.date]) {//  console.log(this.state.appointments[this.state.employee.id][this.state.date])
        let count = 1
        let apptTimes = []
        return this.state.appointments[this.state.employee.id][this.state.date].map(appointment => {

          const { slot, date, service, Customer } = appointment;
          if (count == 1) {
            count++
            if (count - 1 == appointment.service) { count = 1 }
            apptTimes.push({ slot: appointment.slot, service: appointment.service })
            console.log(Customer)
            return <div className="col s12 m6 l4 center" key={appointment.id + 1} >

              <Appointment
                timeEnd={moment().hour(9).minute(0).add(parseInt(appointment.slot + appointment.service) / 4, 'hours').format('h:mm a')}
                daysOff={this.state.daysOff}
                sendCancelThenDelete={this.sendCancelThenDelete}
                customers={Customer}
                id={appointment.id}
                CustId={appointment.CustomerId}
                EmpId={appointment.EmployeeId}
                time={moment().hour(9).minute(0).add(parseInt(appointment.slot) / 4, 'hours').format('h:mm a')}
                reset={() => this.componentDidMount()}
                slot={appointment.slot}
                service={appointment.service}
                date={appointment.date}
                employee={this.state.employee}
                setActive={tab}
                getAppointments={this.loadAppointments}
                deleteAppointment={this.deleteAppointment}
                appointments={this.state.appointments[appointment.EmployeeId]}
              />
            </div>

          } else { if (count == appointment.service) { count = 1 } else { count++ } return null }

        })
      }
    } else {

      return null

    }

  }
  appointmentResult = function () {
     if (this.state.date<= moment().add(32, "days").format("YYYY-MM-DD") && this.state.employee.id) {
      if (this.state.appointments[this.state.employee.id][this.state.date].length===0) {
        return (<h5>
          No Appointments to Display
        </h5>);
      }
    } else if (this.state.employee.length === 0) {
      return (<h5>
        Select An Employee To View Appointments
        </h5>);
    }
  }
  render() {
    
    const filteredAppointments = []


    const convertTime = () => {

    }
    const filteredDays = this.state.employees.filter(Day => {
      return (

        Day.id === this.state.employee.id
      );
    });
    console.log(this.state.appointments)

    return (

      <div className="container managerPortalContain white" >
        <div
          className=" z-depth-5 manager white"
          style={{ marginTop: "25px", marginBottom: "25px", padding: "0" }}
        >
          <Tabs
            className="white-text managerTabs z-depth-5"
            style={{ borderRadius: "5px", marginTop: "5px", padding: "0" }}
          >
            <Tab className="text-white" title="Information" href="#employeeInfo" active={this.state.employeeInfoTab}>
              <div>
                <Row>

                  <Col style={{ marginRight: "7px", marginTop: "20px" }}>
                    <ManagerMode
                      isOnOff={this.state.managerMode}
                      managerMode={() => this.managerMode()}
                      managerModeOff={() => this.managerModeOff()} />
                  </Col>
                </Row>

                <Row>
                  <Col
                    s={12}
                    m={4}
                    className="lighten-4 black-text center employeeList"
                  >
                    {this.state.employees.length ? (
                      <ul className="collection with-header center  z-depth-1 ">
                        <li className="collection-header black white-text center">
                          <h5 className="center black white-text">Employees</h5>
                        </li>
                        {this.state.employees.map(employee => (<div key={employee.id / 2}>

                          <Button
                            className={employee.id === this.state.active ? "col s7 left selectEmployee blue  waves-effect waves-black"
                              : " col s7 grey left waves-effect waves-black"}
                            style={{ width: "100%" }}
                            key={employee.id}
                            onClick={() => this.changeEmployee(employee)}
                          >
                            {this.truncate(employee.first_name, 5, employee.last_name)}
                          </Button> </div>
                        ))}

                      </ul>
                    ) : (
                        <p style={{ marginLeft: "5px" }} className="left">
                          No Employees to Display
                  </p>
                      )}
                  </Col>

                  <div id="employeeInfo"
                    className="col s12 m8 lighten-4 black-text">
                    <CardPanel className="z-depth-2 employeeInfo" style={{ marginBottom: "-20px" }}>
                      {this.state.employee.length !== 0 ? (
                        <div>
                          {this.state.employee.first_name ?
                            (<h4>{this.state.employee.first_name} {this.state.employee.last_name}'s Information</h4>) :
                            (<h4>Employee Information</h4>)}
                          <h5>
                            Name: {this.state.employee.first_name}{" "}
                            {this.state.employee.last_name}
                          </h5>
                          <h5>Phone: {this.state.employee.phone}</h5>
                          <h5>E-Mail: {this.state.employee.email}</h5>
                          <h5>
                            Address: {this.state.employee.street}{" "}
                            {this.state.employee.city} {this.state.employee.state}
                          </h5>
                        </div>
                      ) : (
                          <div className="row">
                            <h5>Name:</h5>
                            <h5>Phone:</h5>
                            <h5>E-Mail:</h5>
                            <h5>Address:</h5>
                            <h5 className="col s12 center">No Employee Selected</h5>
                          </div>

                        )}
                    </CardPanel>
                  </div>
                </Row>
              </div>
            </Tab>

            <Tab className="white-text" title="Appointments" active={this.state.employeeScheduleTab}   >
              <div>
                <Row>

                  <Col style={{ marginRight: "7px", marginTop: "20px" }}>
                    <ManagerMode
                      isOnOff={this.state.managerMode}
                      managerMode={() => this.managerMode()}
                      managerModeOff={() => this.managerModeOff()} />
                  </Col>
                </Row>

                <Row>
                  <Col
                    s={12}
                    m={4}
                    className="lighten-4 black-text center employeeList"
                  >
                    {this.state.employees.length ? (
                      <ul className="collection with-header center  z-depth-1 ">
                        <li className="collection-header black white-text center">
                          <h5 className="center black white-text">Employees</h5>
                        </li>
                        {this.state.employees.map(employee => (<div key={employee.id / 3}>

                          <Button
                            raised="true"
                            className={employee.id === this.state.active ? "col s7 left selectEmployee blue  waves-effect waves-black"
                              : " col s7 grey left waves-effect waves-black"}
                            style={{ width: "100%" }}
                            key={employee.id}
                            onClick={() => this.changeEmployeeSchedule(employee)}
                          >
                            {this.truncate(employee.first_name, 5, employee.last_name)}
                          </Button> </div>
                        ))}
                      </ul>
                    ) : (
                        <p style={{ marginLeft: "5px" }} className="left">
                          No Schedule to Display
                  </p>
                      )}
                  </Col>



                  <Col
                    s={12}
                    m={8}
                    id="employeeSchedule"
                    className="lighten-4 black-text"
                  >
                    <CardPanel className="z-depth-2 employeeSchedule employeeInfo" >
                      <Row className="employeeSchedule center-align">
                        <h5> {this.state.active ? !this.state.touched ? "Select A Date To View Appointments" : moment(this.state.date, 'YYYY-MM-DD').format("DD MMMM, YYYY") : "Select An Employee"}</h5>
                        <Col className="date center " s={12}>



                          <Input
                            s={12}
                            className="center "
                            name="date"
                            type="date"
                            placeholder={this.state.date}
                            value={this.state.date}
                            onChange={this.handleDateChange}
                            options={
                              {  min: this.state.minDate, format:"yyyy-mm-dd" }
                            }
                          >
                            <Icon>date_range</Icon>
                          </Input>
                          <Col s={1} m={2} l={2} />
                        </Col>
                      </Row>
                    </CardPanel>
                  </Col>
                  <Col
                    s={12}

                    id="employeeSchedule"
                    className="lighten-4 black-text"
                  >
                    <CardPanel className="z-depth-2 employeeSchedule" style={{ marginBottom: "-20px" }}>
                      <Row className="employeeSchedule">
                        {this.state.employee.first_name ?
                          (<h4>{this.state.employee.first_name} {this.state.employee.last_name}'s Appointments</h4>) :
                          (<h4>Appointments</h4>)}
                      </Row>

                      <Row className="center">
                        <Col s={12} className="lighten-4 black-text ">
                          {this.state.appointments ? (
                            <div>

                              {this.renderApptsManager(this.setActive)}
                            </div>
                          ) : (
                              <h5 className="hide">Something</h5>
                            )}
                          <div>{this.appointmentResult()}</div>

                        </Col>
                      </Row>
                    </CardPanel>
                  </Col>
                </Row>
              </div>
            </Tab>
            {/* third tab============ */}
            {this.state.active !== "" && this.state.managerMode ? (
              <Tab className="text-white" title="Schedule" href="#schedule" active={this.state.scheduleTab}>
                <div style={{ padding: "0" }}>
                  <Row>
                    <Col style={{ marginLeft: "7px", marginTop: "10px" }}>
                      <ManagerPortalModal
                        managerMode={this.state.managerMode}
                        loadEmployees={this.loadEmployees}
                        setActive={this.changeSchedule}
                      />
                    </Col>
                    <Col style={{ marginRight: "7px", marginTop: "20px" }}>
                      <ManagerMode
                        isOnOff={this.state.managerMode}
                        managerMode={() => this.managerMode()}
                        managerModeOff={() => this.managerModeOff()} />
                    </Col>
                  </Row>

                  <div className="row" style={{ margin: "0px", width: "100%" }}>
                    <Col
                      style={{ padding: "0" }}
                      s={12}
                      m={12}
                      className="lighten-4 black-text center employeeList"
                    >
                      {this.state.employees.length ? (
                        <ul className="collection with-header shift center  z-depth-1 ">
                          <li className="collection-header black white-text center">
                            <h5 className="center black white-text">Employees</h5>
                          </li>
                          {this.state.employees.map(employee => (<Col s={12} m={6} key={employee.id / 8} style={{ padding: "0px" }}>
                            <Button
                              className={employee.id === this.state.active ? "col s6 left selectEmployee blue hoverable waves-effect waves-black"
                                : " col s6 grey left waves-effect waves-black hoverable"}
                              style={{ width: "75%" }}
                              key={employee.id}
                              onClick={() => this.changeSchedule(employee)}
                            >
                              {this.truncate(employee.first_name, 5, employee.last_name)}
                            </Button> <DeleteEmpSchedule

                              deleteEmployee={() => this.deleteEmployeeScheduleTab(employee.id)}
                              id={employee.id}
                              first_name={employee.first_name}
                              last_name={employee.last_name}
                            /></Col>
                          ))}
                        </ul>
                      ) : (
                          <p style={{ marginLeft: "5px" }} className="left">
                            No Employees to Display
                  </p>
                        )}

                    </Col>
                    {/* display a card for each day of the week showing each employees schedule */}
                    <div
                      style={{ padding: "0" }}
                      className="col s12  lighten-4 black-text">
                      <CardPanel className="z-depth-2  "
                        style={{ marginBottom: "0" }}
                      >
                        <div className="row"
                          style={{ padding: "0", marginBottom: "0" }} key="filteredDayShiftContain">

                          <div className="col s12 m6 l4 center " >

                            <DaySchedule
                              dayValue="Sunday"
                              Day={this.state.Sunday}
                              changeDayOn={this.changeDayOn}
                              changeDayOff={this.changeDayOff}
                              shiftStartChange={this.state.SundayshiftStartTime}
                              handleInputChange={this.handleScheduleChange}
                              shiftEndChange={this.state.SundayshiftEndTime}
                              loading={this.state.loading}
                              key="filteredDayShifts1"
                              onClick={() => this.updateDayShift("SundayshiftStartTime", this.state.SundayshiftStartTime,
                                "SundayshiftEndTime", this.state.SundayshiftEndTime,
                                "Sunday", this.state.Sunday, this.state.active)}
                            // onClick={() => this.changeEmployee(employee)}
                            // updateDayShift={this.updateDayShift()}
                            />
                          </div>


                          <div className="col s12 m6 l4 center" >

                            <DaySchedule
                              dayValue="Monday"
                              Day={this.state.Monday}
                              changeDayOn={this.changeDayOn}
                              changeDayOff={this.changeDayOff}
                              shiftStartChange={this.state.MondayshiftStartTime}
                              handleInputChange={this.handleScheduleChange}
                              shiftEndChange={this.state.MondayshiftEndTime}
                              loading={this.state.loading}
                              onClick={() => this.updateDayShift("MondayshiftStartTime", this.state.MondayshiftStartTime,
                                "MondayshiftEndTime", this.state.MondayshiftEndTime,
                                "Monday", this.state.Monday, this.state.active)}
                              key="filteredDayShifts2"
                            // updateDayShift={this.updateDayShiftMonday}
                            />
                          </div>


                          <div className="col s12 m6 l4 center" >

                            <DaySchedule
                              dayValue="Tuesday"
                              Day={this.state.Tuesday}
                              changeDayOn={this.changeDayOn}
                              changeDayOff={this.changeDayOff}
                              shiftStartChange={this.state.TuesdayshiftStartTime}
                              handleInputChange={this.handleScheduleChange}
                              shiftEndChange={this.state.TuesdayshiftEndTime}
                              onClick={() => this.updateDayShift("TuesdayshiftStartTime", this.state.TuesdayshiftStartTime,
                                "TuesdayshiftEndTime", this.state.TuesdayshiftEndTime,
                                "Tuesday", this.state.Tuesday, this.state.active)}
                              loading={this.state.loading}
                              key="filteredDayShifts3"
                            // updateDayShift={this.updateDayShiftTuesday}
                            />
                          </div>


                          <div className="col s12 m6 l4 center" >

                            <DaySchedule
                              dayValue="Wednesday"
                              Day={this.state.Wednesday}
                              changeDayOn={this.changeDayOn}
                              changeDayOff={this.changeDayOff}
                              shiftStartChange={this.state.WednesdayshiftStartTime}
                              handleInputChange={this.handleScheduleChange}
                              shiftEndChange={this.state.WednesdayshiftEndTime}
                              onClick={() => this.updateDayShift("WednesdayshiftStartTime", this.state.WednesdayshiftStartTime,
                                "WednesdayshiftEndTime", this.state.WednesdayshiftEndTime,
                                "Wednesday", this.state.Wednesday, this.state.active)}
                              loading={this.state.loading}
                              key="filteredDayShifts4"
                            // updateDayShift={this.updateDayShiftWednesday}
                            />
                          </div>


                          <div className="col s12 m6 l4 center" >

                            <DaySchedule
                              dayValue="Thursday"
                              Day={this.state.Thursday}
                              changeDayOn={this.changeDayOn}
                              changeDayOff={this.changeDayOff}
                              shiftStartChange={this.state.ThursdayshiftStartTime}
                              handleInputChange={this.handleScheduleChange}
                              shiftEndChange={this.state.ThursdayshiftEndTime}
                              onClick={() => this.updateDayShift("ThursdayshiftStartTime", this.state.ThursdayshiftStartTime,
                                "ThursdayshiftEndTime", this.state.ThursdayshiftEndTime,
                                "Thursday", this.state.Thursday, this.state.active)}
                              loading={this.state.loading}
                              key="filteredDayShifts5"
                            // updateDayShift={this.updateDayShiftThursday}
                            />
                          </div>


                          <div className="col s12 m6 l4 center" >

                            <DaySchedule
                              dayValue="Friday"
                              Day={this.state.Friday}
                              changeDayOn={this.changeDayOn}
                              changeDayOff={this.changeDayOff}
                              shiftStartChange={this.state.FridayshiftStartTime}
                              handleInputChange={this.handleScheduleChange}
                              shiftEndChange={this.state.FridayshiftEndTime}
                              onClick={() => this.updateDayShift("FridayshiftStartTime", this.state.FridayshiftStartTime,
                                "FridayshiftEndTime", this.state.FridayshiftEndTime,
                                "Friday", this.state.Friday, this.state.active)}
                              loading={this.state.loading}
                              key="filteredDayShifts6"
                            // updateDayShift={this.updateDayShiftFriday}
                            />
                          </div>


                          <div className="col s12 m6 l4 center" >

                            <DaySchedule
                              dayValue="Saturday"
                              Day={this.state.Saturday}
                              changeDayOn={this.changeDayOn}
                              changeDayOff={this.changeDayOff}
                              shiftStartChange={this.state.SaturdayshiftStartTime}
                              handleInputChange={this.handleScheduleChange}
                              shiftEndChange={this.state.SaturdayshiftEndTime}
                              onClick={() => this.updateDayShift("SaturdayshiftStartTime", this.state.SaturdayshiftStartTime,
                                "SaturdayshiftEndTime", this.state.SaturdayshiftEndTime,
                                "Saturday", this.state.Saturday, this.state.active)}
                              loading={this.state.loading}
                              key="filteredDayShifts7"
                            // updateDayShift={this.updateDayShiftSaturday}
                            />
                          </div>


                        </div>
                      </CardPanel>
                    </div>
                  </div>
                </div>
              </Tab>) : (<Tab className="text-white" title="Schedule" href="#schedule" active={this.state.scheduleTab}>
                {this.state.managerMode ? <div>
                  <Row>
                    <Col style={{ marginLeft: "5px", marginTop: "10px" }}>
                      <ManagerPortalModal
                        loadEmployees={this.loadEmployees}
                        managerMode={this.state.managerMode}
                      />
                    </Col>
                    <Col style={{ marginRight: "7px", marginTop: "20px" }}>
                      <ManagerMode
                        isOnOff={this.state.managerMode}
                        managerMode={() => this.managerMode()}
                        managerModeOff={() => this.managerModeOff()} />
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      s={12}
                      m={12}
                      className="lighten-4 black-text center employeeList"
                    >
                      {this.state.employees.length ? (
                        <ul className="collection with-header shift center  z-depth-1 ">
                          <li className="collection-header black white-text center">
                            <h5 className="center black white-text">Employees</h5>
                          </li>
                          {this.state.employees.map(employee => (<Col s={12} m={6} key={employee.id / 8} style={{ padding: "0px" }}>
                            <Button
                              className={employee.id === this.state.active ? "col s6 left selectEmployee blue hoverable waves-effect waves-black"
                                : " col s6 grey left waves-effect waves-black hoverable"}
                              style={{ width: "75%" }}
                              key={employee.id}
                              onClick={() => this.changeSchedule(employee)}
                            >
                              {this.truncate(employee.first_name, 5, employee.last_name)}
                            </Button> <DeleteEmpSchedule

                              deleteEmployee={() => this.deleteEmployeeScheduleTab(employee.id)}
                              id={employee.id}
                              first_name={employee.first_name}
                              last_name={employee.last_name}
                            /></Col>
                          ))}
                        </ul>
                      ) : (
                          <p className="left">
                            No Employees to Display
                  </p>
                        )}
                    </Col>
                    {/* display a card for each day of the week showing each employees schedule */}
                    <div
                      className="col s12  lighten-4 black-text">
                      <CardPanel className="z-depth-2" style={{ height: "250px", marginBottom: "-20px" }} > <h4 className="center">No Employee Selected.</h4>    </CardPanel>
                    </div>
                  </Row>
                </div> : <h4>Not Authorized</h4>}
              </Tab>)}
            {/* fourth tab============ */}

            <Tab className="text-white" title="Request Off" href="#requestOff" style={{ marginBottom: "-20px" }} active={this.state.requestOff}>
              {this.state.managerMode ?
                <Tab4
                appointments={this.state.appointments}
                  isOnOff={this.state.managerMode}
                  managerMode={() => this.managerMode()}
                  managerModeOff={() => this.managerModeOff()}
                  loadWithinRequestAppt={this.loadWithinRequestAppt}
                  loadDaysOff={this.deleteLoadDaysOff}
                  daysOff={this.state.daysOff}
                  active={this.state.active}
                  loading={this.state.loading}
                  deleteEmployee={this.deleteEmployee}
                  loadEmployees={this.loadEmployees}
                  employees={this.state.employees}
                  employee={this.state.employee}
                  requestOff={this.RequestOff}
                  withinRequestAppt={this.renderApptsManager(this.RequestOff)}
                  handleDateChange={this.handleDateChangeTab4}
                  date={this.state.date}
                  customers={this.state.Customers}
                  reset={() => this.componentDidMount()}
                  getAppointments={this.loadAppointments}

                  deleteAppointment={this.deleteAppointment}
                  appointments={this.state.appointments[this.state.employee.id]}
                  sendCancelThenDelete={() => this.sendCancelThenDelete}

                /> : <h4>Not Authorized</h4>}
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default ManagerPortal;
