/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link" href="\dashboard\">
                Dashboard
              </a>
            </li>{" "}
            <li className="nav-item">
              <a
                className="nav-link"
                href="http://carlosgatti.com"
              >
                About me
              </a>
            </li>{" "}
            <li className="nav-item">
              <a className="nav-link" href="#">
                Intranet
              </a>
            </li>
          </ul>
          <div className="copyright">
            © {new Date().getFullYear()} made {" "}
            <a href="javascript:void(0)" target="_blank" color="info">
              CSA Carlos Gatti
            </a>
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
