import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Card, Row, Col} from "react-materialize";
import EmpApptUpdateModal from "./empApptUpdateModal.js";
import ModalDelete from "./ModalDelete.js";
import "./DumbApptCard.css";
import CommentsModal from "./CommentsModal"



class Appointment extends Component {

  state = {
    mouse: false
  }
  mouseOver = event => {
    this.setState({ mouse: true })
  }
  mouseLeft = event => {
    this.setState({ mouse: false })
  }
  render() {
  


    return (
      <Card
        onMouseEnter={this.mouseOver}
        onMouseLeave={this.mouseLeft}
        className="blue-grey darken-1 cardBody hoverable z-depth-5 col s12"
        textClassName="white-text"
      > 
        <div key={this.props.customers}>
          <div className=" right-align " s={12}>
           <CommentsModal firstName={this.props.customers.first_name} lastName={this.props.customers.last_name}  custId={this.props.customers.id} employee={this.props.employee}setActive={this.props.setActive}/>
          </div>
          <h5 className={this.state.mouse ? "col s12" : "col s12 truncate"}
          >
            {this.props.customers.first_name} {this.props.customers.last_name}
          </h5>


          <div className="center-align " style={{ fontSize: "1.4rem" }}>{this.props.time} To {this.props.timeEnd}</div>
          <Row>
            <Col
              s={12}
              style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
            >
              <EmpApptUpdateModal
              setActive={this.props.setActive}
                reset={this.props.reset}
                daysOff={this.props.daysOff}
                employee={this.props.employee}
                firstName={this.props.customers.first_name}
                lastName={this.props.customers.last_name}
                custId={this.props.customers.id}
                time={this.props.time}
                date={this.props.date}
                email={this.props.customers.email}
                service={this.props.service}
                slot={this.props.slot}
                phone={this.props.customers.phone}
                apptId={this.props.id}
                empId={this.props.EmpId}
                getAppointments={this.props.getAppointments}
                appointments={this.props.appointments}
                getCustomers={this.props.getCustomers}
              />


              <ModalDelete
                        employee={this.props.employee}
                  setActive={this.props.setActive}
                sendCancelThenDelete={this.props.sendCancelThenDelete}
                deleteAppointment={this.props.deleteAppointment}
                id={this.props.id}
                firstName={this.props.customers.first_name}
                lastName={this.props.customers.last_name}
                service={this.props.service}
                slot={this.props.slot}
                email={this.props.customers.email}
                time={this.props.time}
                date={this.props.date}
                CustomerId={this.props.customers.id}
                EmployeeId={this.props.EmpId}
              />


            </Col>
          </Row>
        </div>
     
      </Card>
    );
  }
}
export default Appointment;


