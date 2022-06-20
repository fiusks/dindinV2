import './styles.scss';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/images/logo.svg';
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <Container fluid className="layout-container w-100">
      <Navbar bg="light" className="layout-header w-100">
        <Container fluid className="navbar-content">
          <Navbar.Brand as={Link} to="signUp">
            <img alt="app logo" src={logo} />
            DinDin
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="signIn">
              Sign In
            </Nav.Link>
            <Nav.Link as={Link} to="signUp">
              Sign Up
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Row className="w-100 layout-body">
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
