import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Modal, Button, Row, Col, Input,Icon } from "react-materialize";




class ModalDelete extends Component {
    state = {
        password: ""

    }
    //  submit=()=> {
    //   if (this.state.password==="password"){
    //       ()=>this.props.managerMode()
    //   } 

    //   }
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


    render() {
        const passwordCheck = this.state.password === "password" ? false : true


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
                                onClick={() => this.props.managerModeOff()}
                                type="button"
                                className="modal-close btn center red text-center"
                            >
                                Exit Mode
            </Button>
                        </Col>
                        <Col className="center"
                            l={6}
                            s={12}>
                            <Button
                                raised="true"
                                waves='light'
                                style={{ height: "auto" }}
                                disabled={passwordCheck}
                                onClick={() => this.props.managerMode()}
                                type="button"
                                className="modal-close center text-center btn  green"
                            >
                                Enter Manager Mode
            </Button>
                        </Col>
                    </ Row>
                }


                trigger={<Col s={3}  >
                    <Button raised="true" waves='light' className={this.props.isOnOff ? "green" : "red"}
                    >Manager</Button>
                </Col>}
            >
                <Row>
                    <Col s={12} className="center">
                        <h5 className="col s12">
                            Submit Password To Enter Manager Mode.</h5>
                            
                            <Row>
                        <Col s={12} m={8} className="col offset-m2 center">
                       <Input s={12}   name="password" label="Password" type="password" onChange={this.handleInputChange} value={this.state.password} >
                       <Icon>lock_open</Icon></Input>
                        </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        );
    }
}

export default ModalDelete;
