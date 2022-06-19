import './styles.scss';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../assets/images/logo.svg';
import { Outlet } from 'react-router-dom';

export default function Layout(){
    return(
        <Container fluid className="layout-container">
        <Row className="layout-header">
          <Col>
            <div className="header-container">
              <img src={logo} alt="App logo" />
              <h1>Dindin</h1>
            </div>
          </Col>
          <Col>
          
          </Col>
        </Row>
        <Row className="w-100 layout-body">
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
    )
}