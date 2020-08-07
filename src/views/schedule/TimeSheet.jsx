import React, { PureComponent } from 'react';
import axios from "axios";

import Moment from 'react-moment';

import ReactTable from "react-table";
import ReactDatetime from "react-datetime";
import SweetAlert from 'react-bootstrap-sweetalert';
import Select from "react-select";

import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Alert } from 'react-bootstrap';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Collapse,
  Row,
  Table
} from "reactstrap";

const token = localStorage.getItem('auth-token');






class RegisterSchedule extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataFrenquencyEvents: '',
      lista : [],
      filter: ''
    };

    this.GetFrequencyEvents = this.GetFrequencyEvents.bind(this);

  }



  GetFrequencyEvents(evento) {
    axios.get('http://localhost:5000/api/frequency/events')
      .then(res => { 
        this.setState({ lista: res.data });
        return res.json();
      })
      .catch(error => {
        console.log(error);
      });
  }






  componentDidMount() {
    this.GetFrequencyEvents();
  }

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
          Team created successfully!
            </SweetAlert>
      )
    });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  render(props) {




    return (
      <>
        <div className="content">

          <Row>

            <Col md="12">
              <Card >
                {this.state.alert}
                <CardHeader>
                  <CardTitle tag="h3">Data User: </CardTitle>
                </CardHeader>
                <CardBody>
                  <h4><b>Customer Name:</b> {this.state.CustomerName} </h4>
                  <h4><b>Date:</b> {this.state.City} </h4>
                  <h4><b>Follow you:</b> {this.state.ExecutionId} </h4>
                </CardBody>
              </Card >
            </Col>
          </Row>


          <Row>
            <Col md="6">
              <Card>
                <CardBody>
                  <blockquote className="blockquote">
                    <label>Start Job</label>
                    <FormGroup>
                      <ReactDatetime
                        inputProps={{
                          className: "form-control",
                          placeholder: "Date scheduling",
                        }}
                        id="DateStart"
                        name="DateStart"
                        value={this.state.DateScheduled}
                        onChange={this.setDateScheduled}

                      />
                    </FormGroup>
                    <label>Finish Job</label>
                    <FormGroup>
                      <ReactDatetime
                        inputProps={{
                          className: "form-control",
                          placeholder: "Date scheduling",
                        }}
                        id="DateStart"
                        name="DateStart"
                        value={this.state.DateScheduledEnd}
                        onChange={this.setDateScheduledEnd}
                      />
                    </FormGroup>



                    <label>User Note</label>
                    <FormGroup>
                      <textarea className="form-control" type="text" value={this.state.InstallerNote} onChange={this.setInstallerNote} />
                    </FormGroup>
                  </blockquote>


                  <Button className="btn-fill" id="create" color="info" type="submit" onClick={this.createExecution} disabled={!this.state.ScheduleId}>
                    Create New
                  </Button>

                  <Button className="btn-fill" color="success" onClick={this.updateExecution} disabled={!this.state.ExecutionId}>
                    Save Editions
                  </Button>
                  <Button className="btn-fill" color="warning" onClick={this.cancelForm} disabled={!this.state.ExecutionId}>
                    Cancel
                  </Button>

                </CardBody>
              </Card>
            </Col>

          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Registers</CardTitle>
                </CardHeader>
                <CardBody>





                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className="text-center">Start Job</th>
                        <th className="text-right">Finish Job</th>
                        <th className="text-right">Total</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>




                    {
                        this.state.lista.map(function (events) {
                          return (
                            <tr key={events.FrequencyEventsId}>
                              <td>{events.FrequencyEventsId}</td>
                              <td>{events.Name}</td>
                          
                              <td>{events.Email}</td>
                              <td><Moment format="YYYY-MM-DD HH:mm" date={events.Start}/></td>
                              <td><Moment format="YYYY-MM-DD HH:mm" date={events.Finish}/></td>
                            
                              <td>{events.TimeDiff}</td>

                              <td className="text-right">
                                <Button className="btn-icon btn-simple" color="info" size="sm">
                                  <i className="fa fa-user"></i>
                                </Button>{` `}
                                <Button className="btn-icon btn-simple" color="success" size="sm">
                                  <i className="fa fa-edit"></i>
                                </Button>{` `}
                                <Button className="btn-icon btn-simple" color="danger" size="sm">
                                  <i className="fa fa-times" />
                                </Button>{` `}
                              </td>


                            </tr>
                          );
                        })
                      }






                    </tbody>
                  </Table>














                </CardBody>
              </Card>
            </Col>






          </Row>
        </div >
      </>
    );
  }
}
export default RegisterSchedule;