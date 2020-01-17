/* eslint-disable no-unused-expressions */
import React from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Row, Col, Icon, Input, Button } from "react-materialize";
import moment from "moment";
import EmployeeScheduleModal from "./employeeScheduleModal";
// import { Link, Route } from "react-router-dom";
import Appointment from "./DumbApptCard";
import "./employeeScheduleModal.css";
import "./employeeSchedule.css";
import API from "../utils/API";
import ReactLoading from 'react-loading';
import NoSignInAppt from "./NoSIgnInAppt";

class EmployeeSchedule extends React.Component {
  state = {
    minDate: moment().subtract(7, 'days').toDate(),
    maxDate:moment().add(1, 'months').toDate(),
    newAppt: false,
    date: moment().format('YYYY-MM-DD'),
    appointments: [],
    customers: [],
    id: [],
    employee: ""
  };
  setActive = (employee) => {
    this.setState({ employee: employee })
  }

  getAppointments = async () => {
    this.setState({ loading: true })
    await API.getAppointmentsById(this.props.id)
      .then(res => this.setState({ appointments: res.data }))
      .catch(err => console.log(err));
    // await this.getAllCustIdByAppointment(this.state.appointments)
    await this.setState({ loading: false })
  };

  // getCustomers = () => {
  //   this.setState({ loading: true })
  //   API.getCustomers()
  //     .then(res => this.setState({
  //       customers: res.data,
  //       loading: false
  //     }))
  //     .catch(err => console.log(err));
  // };
  loadEmployee = () => {
    console.log(this.props)
    API.getEmployee(this.props.id)
      .then(res => this.setState({ employee: res.data }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    event.preventDefault();
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    // name === "date" ? value = moment(event.target.value, "DD MMMM, YYYY").format('YYYY-DD-MM') : event.target.value
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  deleteAppointment = async (id, appointmentData) => {
  //   console.log(this.state.appointments)
  //   const filteredAppointmentDelete = this.state.appointments[this.props.id][this.state.date].filter(appointmentDelete => {

  //     return appointmentDelete.CustomerId != appointmentData.CustomerId
  //   })

  //  await this.setState({ appointments: { [this.props.id]: { [this.state.date]: [filteredAppointmentDelete] } } })
  //   console.log(appointmentData)
    API.deleteAppointment(id, appointmentData)

      .then(res => this.componentDidMount())
      .catch(err => console.log(err));
  };
  sendCancelThenDelete = (id, email, firstName, lastName, time, date, slot, service, EmployeeId, CustomerId) => {
    API.sendCancellationEmail({
      firstName: firstName, lastName: lastName, email: email, time: time,
      date: date, slot: slot, service: service, EmployeeId: EmployeeId, CustomerId: CustomerId
    })
    const filteredAppointmentDelete = this.state.appointments[this.props.id][this.state.date].filter(appointmentDelete => {

      return appointmentDelete.CustomerId != CustomerId
    })


    this.setState({ appointments: { [this.props.id]: { [this.state.date]: [filteredAppointmentDelete] } } })
   
    API.deleteAppointment(id, {
      slot: slot, service: service, date: date,
      CustomerId: CustomerId, EmployeeId: EmployeeId
    })
      .then(res => this.componentDidMount())
      .catch(err => console.log(err));
  };
  // getAllCustIdByAppointment = appointments => {
  //   console.log(appointments)
  //   let id = []

  //   // if advantageous switch to this
  //   //   function uniq(appointments) {
  //   //    let seen = {};
  //   //     return appointments.filter(function(item) {
  //   //         return seen.hasOwnProperty(item.CustomerId) ? false : (seen[item.CustomerId] = true);
  //   //     });
  //   // }
  //   // console.log(uniq(appointments))
  //   appointments.forEach(element => {
  //     // console.log(element)
  //     id.push(element.CustomerId)

  //   });
  //   API.getAllCustomersWhere(id)
  //     .then(res => this.setState({ customers: res.data }))
  // }
  setAcive = (employee) => {

  }

  async componentDidMount() {
    this.setState({ loading: true })
    this.loadDaysOff()
    this.loadEmployee()
    await this.getAppointments()

    await this.setState({ loading: false })
  }
  loadDaysOff = () => {
    API.getDaysOff()
      .then(res => this.setState({
        daysOff: res.data,

      }))
  };
  newAppt = () => {
    this.setState({ newAppt: true })
  }
  newApptOff = () => {

    this.setState({ newAppt: false })

  }
  renderScheduledAppt(tab) {

    const filteredAppointments = this.state.appointments[this.props.id][this.state.date]
    let count = 1

    if (filteredAppointments.length) {
      return filteredAppointments.map(appointment => {
        console.log(appointment,count,appointment.service);
        if (count == 1) {
          count++
          if (count - 1 == appointment.service) { count = 1 }
          return <div className="col s12 m6 l4 center" key={appointment.id + 1} >

            <Appointment
              timeEnd={moment().hour(9).minute(0).add(parseInt(appointment.slot + appointment.service) / 4, 'hours').format('h:mm a')}
              daysOff={this.state.daysOff}
              sendCancelThenDelete={this.sendCancelThenDelete}
              customers={appointment.Customer}
              id={appointment.id}
              CustId={appointment.CustomerId}
              EmpId={appointment.EmployeeId}
              time={moment().hour(9).minute(0).add(parseInt(appointment.slot) / 4, 'hours').format('h:mm a')}
              reset={() => this.componentDidMount()}
              slot={appointment.slot}
              service={appointment.service}
              date={appointment.date}
              employee={this.state.employee}
              getAppointments={this.getAppointments}
              deleteAppointment={this.deleteAppointment}
              appointments={this.state.appointments[this.props.id]}
              setActive={this.setActive}
            />

          </div>

        } else { if (count == appointment.service) { count = 1 } else { count++ } return null }

      })

    } else {

      return <div className="container">
        <h3>No Scheduled Appointments For This Day</h3>
      </div>

    }

  }


  render() {
    console.log(this.state.appointments, this.state.appointments[this.props.id])



    return (
      <div>
        {this.state.loading === false ? (
          <div>
            <div className={!this.state.newAppt ? "container" : ""}>
              <Row>
                {this.state.newAppt ? <EmployeeScheduleModal
                  daysOff={this.state.daysOff}
                  key="1"
                  id={this.props.id}
                  getAppointments={this.getAppointments}
                  getCustomers={this.getCustomers}
                  reset={() => this.componentDidMount()}
                  employee={this.state.employee}
                  appointments={this.state.appointments[this.props.id]}
                  newApptOff={this.newApptOff}
                /> :
                  <Col className="addCol">
                    <Button className="blue addAppointment waves-effect waves-light z-depth-2" onClick={this.newAppt}>
                      New Appointment</Button>

                  </Col>}
              </Row>
            </div><div>
              <div>
                {!this.state.newAppt ? <div>  <Row>
                  <Col className="inputDate ">
                    <Input
                      className="center "
                      name="date"
                      type="date"
                      placeholder={this.state.date}
                      value={this.state.date}
                      onChange={this.handleInputChange}
                      options={
                        {min: this.state.minDate, max: this.state.maxDate, format:"yyyy-mm-dd"}}
                    >
                      <Icon>date_range</Icon>
                    </Input>
                  </Col>
                </Row>

                  <Row
                    className="center"
                    style={{ paddingLeft: "3%", paddingRight: "3%" }}
                  >
                    {this.renderScheduledAppt()}
                  </Row></div> : null}</div>
            </div>
          </div>) : <ReactLoading type={"spinningBubbles"} style={{ marginLeft: "25%", marginRight: "25%" }} color={"#fffff"} height={667} width={375} />}
      </div>
    );
  }
}

export default EmployeeSchedule;
