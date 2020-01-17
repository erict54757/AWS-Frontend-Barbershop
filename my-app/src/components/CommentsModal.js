import React, { Component } from "react";
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import { Modal, Button, Row, Col, Icon, Input,Section } from "react-materialize";
import API from "../utils/API";




class CommentsModal extends Component {
    state = {
        comments: "",

    }
 componentDidMount() {
    this.findCustComments(this.props.custId)

    }
    findCustComments = async custId => {
        await API.findCustComments(custId)
            .then(res =>{
                if(res.data){ this.setState({comments:res.data})}})
            .catch(err => console.log(err))

    }
    saveCustComments = async () => {
        await API.saveCustComments(this.props.custId, { comments: this.state.comments })
            .then(res => this.props.setActive(this.props.employee))
            .catch(err => console.log(err))
    }
    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    render() {


        return (
            <Modal
                l={6}
                m={9}
                s={11}
                style={{ height: "auto" }}
                actions={
                    <Row>
                        <Col className="center"

                            s={12}>
                            <Button
                                raised="true"
                                style={{ height: "auto" }}
                                waves='light'
                                onClick={this.saveCustComments}
                                type="button"
                                className="modal-close btn center red text-center"
                            >
                                Save
                            </Button>
                        </Col>


                    </ Row>
                }


                trigger={<Button tooltip="Notes" data-position="left" raised="true" waves="light" className="tooltipped" s={3} style={{ paddingLeft: "15px", paddingRight: "15px", marginRight: "-25px", marginTop: "-15px" }}>
                    <Icon className="white-text">comment</Icon>
                </Button>}
            >
            <Section>
                <Row>
                    <Col s={12} className="center">
                        <h5 className="center">
                            Notes For {this.props.firstName} {this.props.lastName}.
                        </h5></Col>
                       

  
                     <Input
                      
                        s={12}
                            onChange={this.handleInputChange}
                            value={this.state.comments} 
                            maxLength={140}
                            name="comments"
                            type="textarea"
                           >
                          <Icon >comments</Icon>
                        </Input>   
                        
          
                    
                </Row></Section>
            </Modal>
        );
    }
}

export default CommentsModal;
