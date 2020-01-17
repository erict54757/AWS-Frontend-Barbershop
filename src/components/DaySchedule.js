import React from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Row, Input, Col, Button, Card } from "react-materialize";

import moment from "moment"





const DaySchedule = props => (

  <Card
    style={{ padding: "0" }}
    className={props.Day !== "on" ? "red col s12 center z-depth-5 hoverable" : "hoverable green darken-2 col s12 center z-depth-5"}
  >
    <Row>{props.Day !== "on" ? <h4 s={12} className="white-text">{props.dayValue}</h4> : <h4 s={12} className="white-text">{props.dayValue}</h4>} </Row>
    <Row><Col s={12}>
      <Button
        waves="light"

        name={props.dayValue}
        className={props.Day !== "on" ? "left grey lighten-2" : "blue lighten-1 left"}
        onClick={props.changeDayOn}

      >On</Button>
      <Button
        name={props.dayValue}
        waves="light"

        className={props.Day !== "on" ? "right blue lighten-1" : "grey lighten-2 right"}
        onClick={props.changeDayOff}
      >Off</Button>
    </Col></Row>

    <Row key="theSundayScheduleOfEachEmployee">
      {/* Shift Start Time================================================ */}
      <Input
        name={`${props.dayValue}shiftStartTime`}
        label="Shift Start"
        m={6}
        s={6}
        l={6}
        type="select"
        value={props.shiftStartChange}
       onChange={props.handleInputChange}
        className="modalDrop grey lighten-2 blue-text"

      >
        {[...Array(20).keys()].map(slot => <option key={slot/5} value={slot*2}>
        {moment().hour(9).minute(0).add(slot / 2, 'hours').format('h:mm a')}</option>)}
      </Input>
      {/* Shift End Time ============================================ */}
      <Input
        name={`${props.dayValue}shiftEndTime`}

        label="Shift End"
        m={6}
        s={6}
        l={6}
        type="select"

        value={props.shiftEndChange}
        onChange={props.handleInputChange}
        className="modalDrop grey lighten-2 blue-text"
      >

{[...Array(21).keys()].map(slot =>  <option disabled={props.shiftStartChange >= slot*2 ? true : false}  key={slot/6}value={slot*2}>
   {moment().hour(9).minute(0).add(slot / 2, 'hours').format('h:mm a')}</option> )}
       
      
      </Input>
      <Button
        value={props.dayValue}
        waves="light"
        className="blue lighten-2 center"
        onClick={props.onClick}
      >Save</Button>


      {/* Lunch Start Time================================================ */}
      {/* <Input
        name="lunchStartTime"
        label="Lunch Start"
        m={6}
        s={6}
        l={6}
        type="select"
        onChange={props.updateDayShift}
        value={props.lunchStartTime}
        className="modalDrop grey lighten-2 blue-text"
      >
        <option value="0000">None</option>
        <option value="0800">8:00AM</option>
        <option value="0830">8:30AM</option>
        <option value="0900">9:00AM</option>
        <option value="0930">9:30AM</option>
        <option value="1000">10:00AM</option>
        <option value="1030">10:30AM</option>
        <option value="1100">11:00AM</option>
        <option value="1130">11:30AM</option>
        <option value="1200">12:00PM</option>
        <option value="1230">12:30PM</option>
        <option value="1300">1:00PM</option>
        <option value="1330">1:30AM</option>
        <option value="1400">2:00PM</option>
        <option value="1430">2:30PM</option>
        <option value="1500">3:00PM</option>
        <option value="1530">3:30PM</option>
        <option value="1600">4:00PM</option>
        <option value="1630">4:30PM</option>
        <option value="1700">5:00PM</option>
        <option value="1730">5:30PM</option>
        <option value="1800">6:00PM</option>
        <option value="1830">6:30PM</option>
        <option value="1900">7:00PM</option>
      </Input>
      {/* Lunch End Time ============================================ */}
      {/* <Input
        name="lunchEndTime"
        label="Lunch End"
        m={6}
        s={6}
        l={6}
        type="select"
        onChange={props.updateDayShift}

        value={props.lunchEndTime}
        className="modalDrop grey lighten-2 blue-text"
      >
        <option value="0000">None</option>
        <option value="0800">8:00AM</option>
        <option value="0830">8:30AM</option>
        <option value="0900">9:00AM</option>
        <option value="0930">9:30AM</option>
        <option value="1000">10:00AM</option>
        <option value="1030">10:30AM</option>
        <option value="1100">11:00AM</option>
        <option value="1130">11:30AM</option>
        <option value="1200">12:00PM</option>
        <option value="1230">12:30PM</option>
        <option value="1300">1:00PM</option>
        <option value="1330">1:30AM</option>
        <option value="1400">2:00PM</option>
        <option value="1430">2:30PM</option>
        <option value="1500">3:00PM</option>
        <option value="1530">3:30PM</option>
        <option value="1600">4:00PM</option>
        <option value="1630">4:30PM</option>
        <option value="1700">5:00PM</option>
        <option value="1730">5:30PM</option>
        <option value="1800">6:00PM</option>
        <option value="1830">6:30PM</option>
        <option value="1900">7:00PM</option>
      </Input> */}

    </Row>

  </Card>
);
export default DaySchedule