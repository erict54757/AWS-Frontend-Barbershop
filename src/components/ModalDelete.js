import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Modal, Button, Row, Col,Icon } from "react-materialize";
import moment from "moment"




class ModalDelete extends Component {
  state = {
    hasPast: false,

  }
  hasPast(time, date) {
    let dateTime = date + " " + time
    let timeNow = moment().format("YYYY-DD-MM h:mm a")
    // 11:00 am 2019-26-01
    console.log(dateTime)
    console.log(timeNow)

    if (moment(dateTime, "YYYY-DD-MM h:mm a").isBefore(moment(), "minute")) {

      this.setState({ hasPast: true })
    } else { this.setState({ hasPast: false }) }


    // API.deleteAppointment(id)
    //   .then(res => this.props.getAppointments())
    //   .catch(err => console.log(err));
  }


  render() {

    console.log(this.props.time, this.props.slot, this.props.service)
    return (
      <Modal
        l={6}
        m={9}
        s={11}
        style={{ height: "auto" }}
        actions={
          <Row>
            <Col className="center"
              l={6}
              s={12}>
              <Button
              raised="true"
              style={{ height: "auto" }}
                waves='light'
                onClick={() => this.props.deleteAppointment(this.props.id,
                  {
                    slot: this.props.slot, service: this.props.service, date: this.props.date,
                    CustomerId: this.props.CustomerId, EmployeeId: this.props.EmployeeId
                  }).then(this.props.setActive(this.props.employee))}
                type="button"
                className="modal-close btn center red text-center"
              >
                Remove
            </Button>
            </Col>
            <Col className="center"
              l={6}
              s={12}>
              <Button
              raised="true"
                waves='light'
                style={{ height: "auto" }}
                onClick={() => this.props.sendCancelThenDelete(this.props.id, this.props.email, this.props.firstName,
                  this.props.lastName, this.props.time, this.props.date, this.props.slot, this.props.service, this.props.EmployeeId, this.props.CustomerId).then(this.props.setActive(this.props.employee))}
                type="button"
                className="modal-close center text-center btn  red"
              >
                Remove & Send Cancellation Email
            </Button>
            </Col>
          </ Row>
        }


        trigger={<Col  s={3}  ><Button raised="true" waves='light' tooltip="Delete"  className="tooltipped red deleteButton"
          onClick={() => this.hasPast(this.props.time, this.props.date)} ><Icon large className="white-text">clear</Icon></Button></Col>}
      >
        <Row><Col s={12} className="center">
          <h5 className="center">Upcoming appointment with {this.props.firstName} {this.props.lastName} on {this.props.date} at {this.props.time}.</h5>
          <h5 className="center">Are you sure you would like to remove it?</h5>
        </Col></Row>
      </Modal>
    );
  }
}

export default ModalDelete;
