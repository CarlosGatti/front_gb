import React from "react";
import axios from "axios";
import moment from "moment";
import SweetAlert from 'react-bootstrap-sweetalert';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Datetime from 'react-datetime';

import ReactDatetime from "react-datetime";
// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    CardSubtitle,
    Button,
    Table,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";


class FollowUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            dataFollowUp: [],
            DateContact: moment(),
            Desc: '',
            Status: '',

            alert: null,
            validation: '',

        };

        //set bind variables
        this.setDateContact = this.setDateContact.bind(this);
        this.setDesc = this.setDesc.bind(this);
        this.setStatus = this.setStatus.bind(this);



        //events
        this.CreateFollowUp = this.CreateFollowUp.bind(this);
        this.onRowClick = this.onRowClick.bind(this);


        //alerts
        this.hideAlert = this.hideAlert.bind(this);
        this.successCreatedAlert = this.successCreatedAlert.bind(this);
        this.successUpdatedAlert = this.successUpdatedAlert.bind(this);

    }

    //set variables
    setDateContact(props) {
        console.log(moment(props));
        this.setState({ DateContact: moment(props) });
    };

    setDesc(props) {
        this.setState({ Desc: props.target.value });
    };

    setStatus(props) {
        this.setState({ Status: props.target.value });
    };


    //select the customer
    onRowClick(row) {
        console.log(row);
        this.setState({
            Name: row.Name,
            Type: row.Type,
            ProjectId: row.ProjectId
        });
    }


    //select the customer
    trClassName(rowData, rIndex) {
        var teste = Object(rowData);
        //  console.log(teste.CustomerId);
        return { backgroundColor: rIndex % 2 === 0 ? 'red' : 'blue' };
    }

    //clear form
    clearImputs() {
        this.setState({
            ProjectId: '',
            DateContact: '',
            Status: '',
            Desc: '',
        });
    }

    //select all customers in database
    SelectAllCustomer(evento) {



        
        axios.get('http://localhost:5000/api/sales/getallprojects')
            .then(res => {
                this.setState({ dataCustomers: res.data });
                console.log(res.data);
                return res.json();
            })
            .catch(error => {
                console.log(error);
            });
    };

    CreateFollowUp(evento) {
        var followUpCreate = {
            ProjectId: this.state.ProjectId,
            DateContact: this.state.DateContact,
            Status: this.state.Status,
            Desc: this.state.Desc,
        }

        axios.post('http://localhost:5000/api/sales/create/followup', followUpCreate)
            .then(res => {

                console.log("User Created");
                this.SelectAllCustomer();
                this.successCreatedAlert();
                return res.json();
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    this.setState({ validation: error.response.data[0].msg });
                    console.log(error.response.data[0].msg);
                }
            });
    };



    //ALERTS
    successCreatedAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Good job!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    FollowUp created successfully!
                </SweetAlert>
            )
        });
    }

    successUpdatedAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Good job!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    FollowUp updated successfully!
                </SweetAlert>
            )
        });
    }

    successDeleteAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Good job!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    FollowUp deleted successfully!
                </SweetAlert>
            )
        });
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }




    componentDidMount() {
        this.SelectAllCustomer();
    }



    render() {

        const options = {
            onRowClick: this.onRowClick
        };






        return (
            <>
                {this.state.alert}
                <div className="content">
                    <Row>
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Edit FollowUp</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <blockquote className="blockquote">
                                            <Row>





                                                <Col md="12">
                                                    <FormGroup>
                                                        <label>Name Customer</label>
                                                        <Input
                                                            placeholder="Select Customer"
                                                            type="text"
                                                            value={this.state.Name}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>


                                                <Col md="12">
                                                    <FormGroup>
                                                        <label>Type Project</label>
                                                        <Input
                                                            placeholder="Select Project"
                                                            type="text"
                                                            value={this.state.Type}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="4">
                                                    <FormGroup>
                                                        <label>Id Project</label>
                                                        <Input
                                                            placeholder="Select Project"
                                                            type="text"
                                                            value={this.state.ProjectId}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md="4">
                                                    <FormGroup>
                                                        <label>Id Timeline</label>
                                                        <Input
                                                            placeholder="Select Project"
                                                            type="text"
                                                            value={this.state.ProjectId}
                                                            disabled
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </blockquote>






                                        <Row>

                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Date Contact</label>
                                                    <ReactDatetime
                                                        inputProps={{
                                                            className: "form-control",
                                                            placeholder: "Date Contact",
                                                        }}
                                                        id="DateContact"
                                                        name="DateContact"
                                                        value={this.state.DateContact}
                                                        onChange={this.setDateContact}
                                                    />
                                                </FormGroup>



                                            </Col>


                                            <Col md="12">
                                                <FormGroup>
                                                    <label for="exampleSelect1">Status</label>
                                                    <Input type="select" name="select" id="exampleSelect1" value={this.state.Status} onChange={this.setStatus}>
                                                        <option> </option>
                                                        <option>Walk Thru</option>
                                                        <option>Subcontract Estimate</option>
                                                        <option>Proposal</option>
                                                        <option>Contract</option>
                                                        <option>Permit</option>
                                                        <option>Schedule Execution</option>
                                                        <option>Execution</option>
                                                        <option>Final Walk Thru</option>
                                                        <option>Fill Paperwork</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>



                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Description Status</label>
                                                    <Input
                                                        cols="80"
                                                        placeholder="Complement"
                                                        rows="4"
                                                        type="textarea"
                                                        value={this.state.Complement}
                                                        onChange={this.setComplement} />
                                                </FormGroup>
                                            </Col>



                                        </Row>

                                        <Row>
                                            <Col className="pr-md-1" md="12">
                                                <FormGroup>
                                                    <label> {this.state.validation}</label>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                                <CardFooter>

                                    <Button className="btn-fill" color="success" type="submit" onClick={this.CreateFollowUp}>
                                        Save
                                    </Button>

                                    <Button className="btn-fill" color="primary" type="submit" onClick={this.UpdateCustomer} disabled={!this.state.CustomerId}>
                                        Update
                                    </Button>

                                    <Button className="btn-fill" color="danger" type="submit" onClick={this.DeleteCustomer} disabled={!this.state.CustomerId}>
                                        Delete
                                    </Button>

                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">List Project</h5>
                                </CardHeader>
                                <CardBody>
                                    <BootstrapTable data={this.state.dataCustomers} options={options} trClassName={this.trClassName}>
                                        <TableHeaderColumn dataField='CustomerId' isKey>CustomerId</TableHeaderColumn>
                                        <TableHeaderColumn dataField='Name'>Customer Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField='Type'>Type Project</TableHeaderColumn>
                                        <TableHeaderColumn dataField='City'>City</TableHeaderColumn>
                                        <TableHeaderColumn dataField='Status'>Status</TableHeaderColumn>
                                    </BootstrapTable>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </div>
            </>
        );
    }
}

export default FollowUp;











