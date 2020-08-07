import React from "react";
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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
  FormText,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

class Customer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataCustomers: [],
      customerUpdate: [],
      options: [],
      resultado: [],
      Name: '',
      alert: null,
      validation: '',
    };

    this.setName = this.setName.bind(this);
    this.CreateCustomer = this.CreateCustomer.bind(this);
    this.UpdateCustomer = this.UpdateCustomer.bind(this);
    this.DeleteCustomer = this.DeleteCustomer.bind(this);
    this.clearImputs = this.clearImputs.bind(this);
    this.SelectAllCustomer = this.SelectAllCustomer.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.successCreatedAlert = this.successCreatedAlert.bind(this);
    this.successUpdatedAlert = this.successUpdatedAlert.bind(this);
  }


  //select the customer
  onRowClick(row) {
    this.setState({
      Name: row.Name,
      CustomerId: row.CustomerId,
      dateCreated: row.dateCreated
    });
  }


  //set variables
  setName(evento) {
    this.setState({ Name: evento.target.value });
  };


  //select all customers in database
  SelectAllCustomer(evento) {
    axios.get('http://localhost:5000/api/sales/customerslist')
      .then(res => {
        this.setState({ dataCustomers: res.data });
        return res.json();
      })
      .catch(error => {
        console.log(error);
      });
  };


  // EVENTS
  //create customer
  CreateCustomer(evento) {
    var customerCreate = {
      Name: this.state.Name,
    }
    axios.post('http://localhost:5000/api/sales/create/customer', customerCreate)
      .then(res => {
        this.SelectAllCustomer();
        this.successCreatedAlert();
        this.clearImputs();
        return res.json();
      })
      .catch(error => {
        if (error.response && error.response.data) {
          this.setState({ validation: error.response.data[0].msg });
          console.log(error.response.data[0].msg);
        } 
      });
  };

  //update customer
  UpdateCustomer(evento) {

    var customerUpdate = {
      Name: this.state.Name,
      CustomerId: this.state.CustomerId,
    }

    axios.post('http://localhost:5000/api/sales/update/customer', customerUpdate)
      .then(res => {
        console.log("User Updated");
        this.SelectAllCustomer();
        this.successUpdatedAlert();
        this.clearImputs();
        return res.json();
      })
      .catch(error => {     
        if (error.response && error.response.data) {
          this.setState({ validation: error.response.data[0].msg });
          console.log(error.response.data[0].msg);
        }  
      });
  };

  //update customer
  DeleteCustomer(evento) {

    var customerUpdate = {
      CustomerId: this.state.CustomerId,
    }

    axios.post('http://localhost:5000/api/sales/delete/customer', customerUpdate)
      .then(res => {
        console.log("User Updated");
        this.SelectAllCustomer();
        this.successDeleteAlert();
        this.clearImputs();
        return res.json();
      })
      .catch(error => {
        if (error.response && error.response.data) {
          this.setState({ validation: error.response.data[0].msg });
          console.log(error.response.data[0].msg);
        } 
      });
  };

  //clear form customer
  clearImputs() {
    this.setState({
      Name: '',
      CustomerId: '',
    });
  }


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
          Customer created successfully!
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
          Customer updated successfully!
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
          Customer deleted successfully!
        </SweetAlert>
      )
    });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  //execute init
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
                  <h5 className="title">Edit Customer</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="12">
                        <FormGroup>
                          <label>Name</label>
                          <Input placeholder="Full Name" type="text" value={this.state.Name} onChange={this.setName} />
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

                  <Button className="btn-fill" color="success" type="submit" onClick={this.CreateCustomer} disabled={this.state.CustomerId}>
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
                    <TableHeaderColumn dataField='CustomerId' isKey>Id Customer</TableHeaderColumn>
                    <TableHeaderColumn dataField='Name'>Customer Name</TableHeaderColumn>
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

export default Customer;
