import React from "react";
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Datetime from 'react-datetime';

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
            DateContact: '',
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



        //alerts
        this.hideAlert = this.hideAlert.bind(this);
        this.successCreatedAlert = this.successCreatedAlert.bind(this);
        this.successUpdatedAlert = this.successUpdatedAlert.bind(this);

    }

    //set variables
    setDateContact(props) {
        this.setState({ DateContact: props.target.value });
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
           // Name: row.Name,

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
            DateContact: '',
            Status: '',
            Desc: '',
        });
    }

    //select all customers in database
    SelectAllCustomer(evento) {
        axios.get('http://localhost:5000/api/sales/getallprojectscustomer')
            .then(res => {
                this.setState({ dataCustomers: res.data });
                console.log(res.data);
                return res.json();
            })
            .catch(error => {
                console.log(error);
            });
    };

    //create customer
    CreateFollowUp(evento) {
        var projectCreate = {
            CustomerId: this.state.CustomerId,
            Type: this.state.Type,
            Address: this.state.Address,
            City: this.state.City,
            Country: this.state.Country,
            ZipCode: this.state.ZipCode,
            Complement: this.state.Complement,
        }
        axios.post('http://localhost:5000/api/sales/create/projectandaddress', projectCreate)
            .then(res => {

                console.log("User Created");
                this.SelectAllCustomer();
                this.successCreatedAlert();
                return res.json();
            })
            .catch(error => {
                this.setState({ validation: error.response.data[0].msg });
                console.log(error.response.data[0].msg);
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
                    Project created successfully!
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
                    Project updated successfully!
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
                    Project deleted successfully!
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
                                            </Row>
                                        </blockquote>






                                        <Row>

                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Date Contact</label>
                                                    <Datetime
                                                        timeFormat={false}
                                                        inputProps={{ placeholder: "Datetime Contact" }}
                                                        value={this.DateContact}
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

                                    <Button className="btn-fill" color="success" type="submit" onClick={this.CreateProject}>
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











