import React from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Modal, Button, Row, Col } from "react-materialize";
import moment from "moment"




const DeleteRequestOff = props => (





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
                    <Button style={{ height: "auto" }}
                        waves='light'
                        type="button"
                        className="modal-close btn center red text-center"
                    >
                        Cancel
            </Button>
                </Col>
                <Col className="center"
                    l={6}
                    s={12}>
                    <Button
                        onClick={() => props.handleDeleteDaysOff(props.id)}
                        waves='light'
                        style={{ height: "auto" }}
                        type="button"
                        className="modal-close center text-center btn  red"
                    >
                        Remove Day Off
            </Button>
                </Col>
            </ Row>
        }


        trigger={<Button waves='light' className="red deleteButton"
        >Delete</Button>}
    >
        <Row><Col s={12} className="center">
            <h5 className="center">Requested Day Off For {props.first_name} {props.last_name} On {props.date} From {moment().hour(9).minute(0).add(props.slotBegin / 4, 'hours').format('h:mm a')} To {moment().hour(9).minute(0).add(props.slotEnd / 4, 'hours').format('h:mm a')}.</h5>
            <h5 className="center">Are You Sure You Would Like To Remove It?</h5>
        </Col></Row>
    </Modal>




);
export default DeleteRequestOff
