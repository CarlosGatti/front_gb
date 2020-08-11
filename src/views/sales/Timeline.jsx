
import React, { PureComponent } from 'react';
import axios from "axios";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

// reactstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Progress,
  Table,
  Row,
  Col,
  CardSubtitle,
  CardText,
  CardLink,
  UncontrolledTooltip
} from "reactstrap";

const token = localStorage.getItem('auth-token');

class Timeline extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

      dataTimeline: [],
      customer: '',
      project: '',
      city: '',
    }

    this.GetProjectTimeline = this.GetProjectTimeline.bind(this);
  }


  GetProjectTimeline(evento) {
    var a = new URLSearchParams(this.props.location.search).get("id")
    console.log(a);

    axios.get('http://localhost:5000/api/sales/project/' + a)
      .then(res => {

        this.setState({ dataTimeline: res.data });

        this.setState({ customer: res.data[0].Name });
        this.setState({ project: res.data[0].Type });
        this.setState({ city: res.data[0].City });


        return res.json();
      })
      .catch(error => {
        console.log(error);
      });



  }


  componentDidMount() {

    this.GetProjectTimeline();
  }


  render(props) {

    var dateCurrent = new Date().getDate()



    return (
      <>
        <div className="content">





          <Card >
            <CardBody>
              <CardTitle>Customer Name:  {this.state.customer}</CardTitle>
              <CardSubtitle className="mb-2 text-muted">Project: {this.state.project}</CardSubtitle>


              <CardText>City: {this.state.city}</CardText>
            </CardBody>


          </Card>


























          <div className="header text-center">
            <h3 className="title">Timeline</h3>
          </div>
          <Row>
            <Col md="12">
              <Card className="card-timeline card-plain">
                <CardBody>
                  <ul className="timeline">


                    {
                      this.state.dataTimeline.map(function (events) {
                        return (
                          <li className={events.Status == "Walk Thru" && "timeline-inverted"
                            || events.Status == "Proposal" && "timeline-inverted"
                            || events.Status == "Permit" && "timeline-inverted"
                            || events.Status == "Execution" && "timeline-inverted"
                            || events.Status == "Fill Paperwork" && "timeline-inverted"}>

                            {events.Status == "Walk Thru" && <div className="timeline-badge danger"><i className="tim-icons icon-planet" /></div>}
                            {events.Status == "Subcontract Estimate" && <div className="timeline-badge info"><i className="tim-icons icon-cart" /></div>}
                            {events.Status == "Proposal" && <div className="timeline-badge success"><i className="tim-icons icon-email-85" /></div>}
                            {events.Status == "Contract" && <div className="timeline-badge danger"><i className="tim-icons icon-coins" /></div>}
                            {events.Status == "Permit" && <div className="timeline-badge info"><i className="tim-icons icon-paper" /></div>}
                            {events.Status == "Schedule Execution" && <div className="timeline-badge success"><i className="tim-icons icon-calendar-60" /></div>}
                            {events.Status == "Execution" && <div className="timeline-badge danger"><i className="tim-icons icon-notes" /></div>}
                            {events.Status == "Final Walk Thru" && <div className="timeline-badge info"><i className="tim-icons icon-camera-18" /></div>}
                            {events.Status == "Fill Paperwork" && <div className="timeline-badge success"><i className="tim-icons icon-satisfied" /></div>}

                            <div className="timeline-panel">
                              <div className="timeline-heading">
                                {events.Status == "Walk Thru" && <Badge color="danger" pill> {events.Status}</Badge>}
                                {events.Status == "Subcontract Estimate" && <Badge color="info" pill> {events.Status}</Badge>}
                                {events.Status == "Proposal" && <Badge color="success" pill> {events.Status}</Badge>}
                                {events.Status == "Contract" && <Badge color="danger" pill> {events.Status}</Badge>}
                                {events.Status == "Permit" && <Badge color="info" pill> {events.Status}</Badge>}
                                {events.Status == "Schedule Execution" && <Badge color="success" pill> {events.Status}</Badge>}
                                {events.Status == "Execution" && <Badge color="danger" pill> {events.Status}</Badge>}
                                {events.Status == "Final Walk Thru" && <Badge color="info" pill> {events.Status}</Badge>}
                                {events.Status == "Fill Paperwork" && <Badge color="success" pill> {events.Status}</Badge>}
                              </div>
                              <div className="timeline-body">
                                <p>
                                  {events.Desc}
                                </p>
                              </div>
                              <h6>
                                <i className="ti-time" />
                                <Moment format="YYYY-MM-DD HH:mm" date={events.DateContact} />
                              </h6>



                            </div>
                          </li>
                        );
                      })
                    }


                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Timeline;
