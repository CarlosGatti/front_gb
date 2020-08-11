import React from "react";
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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


class Project extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            dataCustomers: [],
            Type: '',
            Address: '',
            City: '',
            Country: '',
            ZipCode: '',
            Complement: '',

            alert: null,
            validation: '',
        };

        //set bind variables
        this.setType = this.setType.bind(this);
        this.setAddress = this.setAddress.bind(this);
        this.setCity = this.setCity.bind(this);
        this.setCountry = this.setCountry.bind(this);
        this.setZipcode = this.setZipcode.bind(this);
        this.setComplement = this.setComplement.bind(this);

        //events
        this.CreateProject = this.CreateProject.bind(this);
        this.SelectAllCustomer = this.SelectAllCustomer.bind(this);
        this.onRowClick = this.onRowClick.bind(this);

        this.trClassName = this.trClassName.bind(this);

        //alerts
        this.hideAlert = this.hideAlert.bind(this);
        this.successCreatedAlert = this.successCreatedAlert.bind(this);
        this.successUpdatedAlert = this.successUpdatedAlert.bind(this);

    }

    //set variables
    setType(props) {
        this.setState({ Type: props.target.value });
    };

    setAddress(props) {
        this.setState({ Address: props.target.value });
    };

    setCity(props) {
        this.setState({ City: props.target.value });
    };

    setCountry(props) {
        this.setState({ Country: props.target.value });
    };

    setZipcode(props) {
        this.setState({ ZipCode: props.target.value });
    };

    setComplement(props) {
        this.setState({ Complement: props.target.value });
    };

    //select the customer
    onRowClick(row) {
        console.log(row);
        this.setState({
            Name: row.Name,
            CustomerId: row.CustomerId,
            Address: row.Address,
            City: row.City,
            Country: row.Country,
            ZipCode: row.ZipCode,
            Complement: row.Complement,
            AddressId: row.AddressId,
            ProjectId: row.ProjectId,
            Type: row.Type,
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
            Type: '',
            CustomerId: '',
            Address: '',
            City: '',
            Country: '',
            ZipCode: '',
            Complement: '',
            dataCustomers: [],
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
    CreateProject(evento) {
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
                this.clearImputs();
                return res.json();
            })
            .catch(error => {
           //     if (error.response && error.response.data[0].msg) {
            //        this.setState({ validation: error.response.data[0].msg });
              //      console.log(error.response.data[0].msg);
              //    } 
              console.log(error.response);
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
                                    <h5 className="title">Edit Project</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form>
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
                                                    <label for="exampleSelect1">Type Project</label>
                                                    <Input type="select" name="select" id="exampleSelect1" value={this.state.Type} onChange={this.setType}>
                                                        <option>New Home</option>
                                                        <option>Remodeling Home</option>
                                                        <option>Demolition</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>

                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Address</label>
                                                    <Input
                                                        placeholder="Project Address"
                                                        type="text"
                                                        value={this.state.Address}
                                                        onChange={this.setAddress}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="pr-md-1" md="4">
                                                <FormGroup>
                                                    <label>City</label>
                                                    <Input
                                                        placeholder="City Name"
                                                        type="text"
                                                        value={this.state.City}
                                                        onChange={this.setCity} />
                                                </FormGroup>
                                            </Col>
                                            <Col className="px-md-1" md="4">
                                                <FormGroup>
                                                    <label>Country</label>
                                                    <Input
                                                        defaultValue="Country Name"
                                                        type="text"
                                                        value={this.state.Country}
                                                        onChange={this.setCountry} />
                                                </FormGroup>
                                            </Col>
                                            <Col className="pl-md-1" md="4">
                                                <FormGroup>
                                                    <label>Postal Code</label>
                                                    <Input
                                                        placeholder="ZIP Code"
                                                        type="text"
                                                        value={this.state.Zipcode}
                                                        onChange={this.setZipcode} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Complement</label>
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
                                    <BootstrapTable data={this.state.dataCustomers} options={options} exportCSV>
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

export default Project;











