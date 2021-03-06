
import React, { PureComponent } from 'react';
import axios from "axios";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

// reactstrap components
import {
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
  NavLink,
  UncontrolledTooltip
} from "reactstrap";

const token = localStorage.getItem('auth-token');

class Dashboard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataProjects: [],
    }
    this.GetAllProjects = this.GetAllProjects.bind(this);
  }


  GetAllProjects(evento) {
    axios.get('http://localhost:5000/api/sales/getallprojects')
      .then(res => {
        console.log(res.data);
        this.setState({ dataProjects: res.data });
        return res.json();
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.GetAllProjects();
  }

  render(props) {

    var dateCurrent = new Date().getDate()




    return (
      <>
        <div className="content">


          <Card >
            <CardHeader>
              <h5 className="title">JOB PROGRESS</h5>
            </CardHeader>
            <hr></hr>
            <div class="row">
            {
              this.state.dataProjects.map(function (events) {
                return (
            
                    <div class="col-md-6 col-lg-4">


                      <CardBody key={events.CustomerId}>
                        <CardTitle>Customer Name: {events.Name} </CardTitle>
                        <CardSubtitle className="mb-2 text-muted">Project: {events.Type}</CardSubtitle>
                        <CardText>Last Contact: <Moment format="YYYY-MM-DD HH:mm" date={events.DateContact} /></CardText>
                        <CardText>Type: {events.Type}</CardText>
                        <CardText>City: {events.City}</CardText>

                        <blockquote className="blockquote">
                          {events.Status != null && <CardText>Status: {events.Status}</CardText>}
                          {events.Status == null && <CardText>Status: Pending First Contact</CardText>}
                        </blockquote>

                        {events.Status != null &&   <Link to={`/admin/timeline/?id=${events.ProjectId}`}>Check Timeline</Link>}
                                
                      </CardBody>

                    </div>
              
                );
              })
            }
                </div>
          </Card>





        </div>
      </>
    );
  }
}

export default Dashboard;
