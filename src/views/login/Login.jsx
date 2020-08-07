import React from "react";
import axios from "axios";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";

export const AUTH_TOKEN = 'auth-token'


class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      Email: '',
      Password: '',
      Alert: null
    };

    this.LoginUser = this.LoginUser.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);

  }

  setEmail(evento) {
    this.setState({ Email: evento.target.value });
  }

  setPassword(evento) {
    this.setState({ Password: evento.target.value });
  }


  


  // select email for login
  setEmail(evento) {
    this.setState({ Email: evento.target.value });
  }
  // select password for login
  setPassword(evento) {
    this.setState({ Password: evento.target.value });
  }





  LoginUser(evento) {
    evento.preventDefault();
    axios.post('http://localhost:5000/api/users/login', { Email: this.state.Email, Password: this.state.Password })
      .then(res => {
        window.location.href = "http://localhost:3000/admin/dashboard";
        return res.json();
      })
      .catch(error => {
        console.log(error);
      });
  }




  componentDidMount() {
    document.body.classList.toggle("login-page");
  }

  componentWillUnmount() {

  }

  render() {


    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form className="form" onSubmit={this.LoginUser}>
                <Card className="card-login card-white">
                  <CardHeader>
                    <img
                      alt="..."
                      src={require("assets/img/card-info.png")}
                    />
                    <CardTitle tag="h1">Log in</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" type="text" value={this.state.Email} onChange={this.setEmail} />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Password" type="password" value={this.state.Password} onChange={this.setPassword} />
                    </InputGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="mb-3"
                      color="info"
                      value="login"
                      size="lg"
                    >
                      Get Started
                    </Button>
                    <label>{this.state.msg}</label>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Container>
        </div>
      </>
    );
  }
  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }
}

export default Login;
