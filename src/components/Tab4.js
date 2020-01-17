import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Button, Row, Col, CardPanel, Icon, Input } from "react-materialize";
import ManagerPortalModal from "./managerPortalModal"
import moment from "moment"
import API from "../utils/API";
import DeleteRequestOff from "./DeleteRequestOff"
import DeleteEmployee from "./DeleteEmployee"
import ManagerMode from "./ManagerMode"
import "./managerPortal.css";


function validate(slotBegin, slotEnd, date, active) {
    // true means invalid, so our conditions got reversed
    return {
        slotBegin: slotBegin.length === 0,
        slotEnd: slotEnd.length === 0,
        date: date.length === 0,
        active: active.length === 0


    };
};
class Tab4 extends Component {
    state = {

        slotBegin: "0",
        slotEnd: "40",
        loading: true,
        employee: this.props.employee,
        active: this.props.active,
        employees: this.props.employees,
        date: this.props.date,
        daysOff: this.props.daysOff,
        customers: this.props.customers,
        appointments: true,
        showAppts: false
    }

    componentDidMount() {
        this.setState({ loading: false })
    }
    handleDeleteDaysOff = id => {
        API.deleteDaysOff(id)
            .then(res => this.props.loadDaysOff())
    }
    handleSaveDaysOff = async  event => {
        this.setState({ loading: true })
        await API.saveDayOff({
            date: this.state.date,
            slotBegin: this.state.slotBegin,
            slotEnd: this.state.slotEnd,
            EmployeeId: this.state.active
        })

            .then(res => {

                if (res.data === true) {
                    { window.Materialize.toast(`Day Off Successfully Added!`, 5000) }

                    this.props.loadWithinRequestAppt(res.data)
                    this.props.loadDaysOff()
                    this.setState({ loading: false })
                } else {

                    { window.Materialize.toast(`Delete Or Update The Following Appointments`, 7000) }
                    // this.props.loadWithinRequestAppt(res.data)
                    this.setState({ loading: false })
                }
                this.renderApptWithinDayOff(this.props.withinRequestAppt)

            })
    }

    renderApptWithinDayOff() {

        return this.props.withinRequestAppt


    }


    handleInputChange = event => {

        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
        // Updating the input's state
        this.setState({
            [name]: value
        });
        if (name === "date") {
            this.props.handleDateChange(event)
        }
    };

    clearAppointments = () => {
        this.setState({ appointments: true })
    }


    truncate = function (str, n, str2) {

        if (str[n] === undefined) {
            return str + " " + str2;
        }
        else {
            return str + " " + str2.substr(0, 3) + '...';
        }

    }


    render() {
        const errors = validate(this.state.slotBegin, this.state.slotEnd, this.state.date, this.state.active);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        const filteredEmployeeDayOff = this.state.daysOff ? this.state.daysOff.filter(daysOff => daysOff.EmployeeId == this.state.active) : []
        const dateCheck = () => {
            let findings = false
            if (filteredEmployeeDayOff !== undefined) {
                filteredEmployeeDayOff.forEach(element => {
                    if (element.date == this.state.date) {
                        findings = true
                        return
                    } else { }
                })
            } if (!findings) {
                if (!this.state.active) { findings = true }
            }
            return findings
        }
        return (

            <div style={{ padding: "0px" }}>
                {this.props.loading === false ?
                    <div style={{ padding: "0px" }}>
                        <Row>
                            <Col style={{ marginLeft: "7px", marginTop: "10px" }}>
                                <ManagerPortalModal
                                    managerMode={this.props.isOnOff}
                                    loadEmployees={this.props.loadEmployees}
                                />
                            </Col>
                            <Col style={{ marginRight: "7px", marginTop: "20px" }}>
                                <ManagerMode
                                    isOnOff={this.props.isOnOff}
                                    managerMode={() => this.props.managerMode()}
                                    managerModeOff={() => this.props.managerModeOff()} />
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
                                        {this.state.employees.map(employee => (<div key={employee.id + 8}>

                                            <Button
                                                className={employee.id === this.props.active ? "col s7 left selectEmployee blue  waves-effect waves-black"
                                                    : " col s7 grey left waves-effect waves-black"}
                                                style={{ width: "70%" }}
                                                key={employee.id}
                                                onClick={() => this.props.requestOff(employee)}
                                            >
                                                {this.truncate(employee.first_name, 5, employee.last_name)}

                                            </Button> <DeleteEmployee
                                                size={"-15px"}
                                                setActive={this.props.requestOff}
                                                deleteEmployee={() => this.props.deleteEmployee(employee.id)}
                                                id={employee.id}
                                                first_name={employee.first_name}
                                                last_name={employee.last_name}
                                            /></div>
                                        ))}
                                    </ul>
                                ) : (
                                        <p style={{ marginLeft: "5px" }} className="left">
                                            No Schedule to Display
                  </p>
                                    )}
                            </Col>

                            <Col
                                m={8}
                                s={12}
                                className="lighten-4 black-text">
                                <CardPanel
                                    m={8}
                                    className="date center z-depth-2 employeeInfo"
                                >

                                    <Row className="center">
                                        <h5>{this.state.employee != "" ? `${this.state.employee.first_name} ${this.state.employee.last_name}` : "Select An Employee"}</h5>
                                        <Input
                                            s={12}
                                            className="center"
                                            name="date"
                                            type="date"
                                            placeholder={this.state.date}
                                            value={this.state.date}
                                            onChange={this.handleInputChange}
                                            options={
                                                { min: new Date(), format: "yyyy-mm-dd" }
                                            }
                                        >
                                            <Icon>date_range</Icon>
                                        </Input>
                                        <Col s={6} className="center">
                                            <Input
                                                s={12}
                                                name="slotBegin"
                                                label="Start"
                                                type="select"
                                                value={this.state.slotBegin}
                                                onChange={this.handleInputChange}
                                                className="modalDrop grey lighten-2 blue-text"

                                            >
                                                {[...Array(20).keys()].map(slot => slot * 2 < this.state.slotEnd ? <option type="number" key={slot / .3} value={slot * 2}>
                                                    {moment().hour(9).minute(0).add(slot / 2, 'hours').format('h:mm a')}</option> : <option disabled={true} key={slot / 8}>  {moment().hour(9).minute(0).add(slot / 2, 'hours').format('h:mm a')}</option>)}

                                            </Input></Col>
                                        <Col s={6} className="center"> <Input
                                            s={12}
                                            label="End"
                                            type="select"
                                            name="slotEnd"
                                            value={this.state.slotEnd}
                                            onChange={this.handleInputChange}
                                            className="modalDrop grey lighten-2 blue-text"
                                        >
                                            {[...Array(21).keys()].map(slot => slot * 2 > this.state.slotBegin ? <option type="number" key={slot / 9} value={slot * 2}>
                                                {moment().hour(9).minute(0).add(slot / 2, 'hours').format('h:mm a')}</option> : <option disabled={true} key={slot / 8}>  {moment().hour(9).minute(0).add(slot / 2, 'hours').format('h:mm a')}</option>)}
                                        </Input></Col>

                                        <Button

                                            disabled={isDisabled || dateCheck() || this.state.loading}

                                            style={{ margin: "5px" }}
                                            waves="light"
                                            className="blue"
                                            onClick={this.handleSaveDaysOff}
                                        >Request Off
                                       </Button>

                                    </Row>
                                </CardPanel>
                            </Col>

                        </Row>
                        {this.renderApptWithinDayOff() !== null ? <div className="red-text center" style={{ margin: "10px", fontSize: "1.2rem", fontWeight: "bold" }}
                        >Delete Or Update The Following Appointments</div> : null}
                        {this.state.appointments === true ?
                            this.renderApptWithinDayOff() : null}

                        <div>
                            {this.state.appointments === true ?
                                <CardPanel className="z-depth-2 hoverable" style={{ marginBottom: "-20px" }}>
                                    <Row className="employeeSchedule">
                                        <Col s={12}>
                                            {this.state.employee.first_name ?
                                                (<h4>{this.state.employee.first_name} {this.state.employee.last_name}'s Requested Days Off</h4>) :
                                                (<h4>Select An Employee</h4>)}
                                        </Col>
                                    </Row>

                                    <Row className="center " style={{ padding: "0px" }}>
                                        <Col s={12} className="lighten-4 black-text ">
                                            {filteredEmployeeDayOff !== undefined ? (
                                                <ul className=" "  >
                                                    {filteredEmployeeDayOff.map(appointment => (
                                                        <Col className="  col s12 m6 l6 " key={appointment.id + 8} ><CardPanel

                                                            className=" grey lighten-3  " style={{ fontSize: "1.5rem" }}
                                                            key={appointment.id / 9}
                                                        >
                                                            <div>{moment(appointment.date, 'YYYY-MM--DD').format("DD MMM, YYYY")} </div>
                                                            <Row>
                                                                <Col
                                                                    s={6}
                                                                >
                                                                    <span> From: {moment().hour(9).minute(0).add(appointment.slotBegin / 4, 'hours').format('h:mm a')}</span>
                                                                </Col>
                                                                <Col
                                                                    s={6}
                                                                >
                                                                    To: {moment().hour(9).minute(0).add(appointment.slotEnd / 4, 'hours').format('h:mm a')}
                                                                </Col>
                                                            </Row>

                                                            <DeleteRequestOff
                                                                id={appointment.id}
                                                                handleDeleteDaysOff={() => this.handleDeleteDaysOff(appointment.id)}
                                                                first_name={this.state.employee.first_name}
                                                                last_name={this.state.employee.last_name}
                                                                slotBegin={appointment.slotBegin}
                                                                slotEnd={appointment.slotEnd}
                                                                date={appointment.date}
                                                            />
                                                        </CardPanel></Col>
                                                    ))}
                                                </ul>
                                            ) : (
                                                    <h5>No Days Off Requested</h5>
                                                )}

                                        </Col>
                                    </Row>
                                </CardPanel>
                                : null}
                        </div>


                    </div>
                    : <div></div>}</div>
        );
    }
}

export default Tab4;
