import React from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Modal, Button, Row, Col } from "react-materialize";




const DeleteEmpSchedule = props => (
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
                        onClick={() => props.deleteEmployee(props.id)}
                        waves='light'
                        style={{ height: "auto" }}
                        type="button"
                        className="modal-close center text-center btn  red"
                    >
                        Remove Employee
            </Button>
                </Col>
            </ Row>
        }
        trigger={<Button waves='light' className="red right hoverable"
            style={{ width: "25%"}}
        >X</Button>}
    >
        <Row><Col s={12} className="center">
            <h5 className="center">Are You Sure You Would Like To Remove {props.first_name} {props.last_name}?</h5>

        </Col></Row>
    </Modal>
);
export default DeleteEmpSchedule