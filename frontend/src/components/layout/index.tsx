import './styles.scss';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/images/logo.svg';
import { Outlet, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUser, userLogout } from '../../features/User/userSlice';
import { ToastContainer } from 'react-toastify';
import logoutIcon from '../../assets/images/logout.png';

export default function Layout() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <Container fluid className="h-100 p-0">
      <Navbar className="navbar-background">
        <Container fluid>
          <Navbar.Brand
            as={Link}
            to={user.data.accessToken ? '/transactions' : '/'}
          >
            <img alt="app logo" src={logo} />
            Dindin
          </Navbar.Brand>
          <Nav>
            {!user.data.accessToken ? (
              <>
                <Nav.Link as={Link} to="signUp">
                  Registrar
                </Nav.Link>
                <Nav.Link as={Link} to="signIn">
                  Log In
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/" onClick={() => dispatch(userLogout())}>
                <img src={logoutIcon} alt="logout icon" />
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Row className="w-100 layout-body mx-auto">
        <Col>
          <Outlet />
          <ToastContainer
            position="bottom-right"
            autoClose={1800}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Col>
      </Row>
    </Container>
  );
}
