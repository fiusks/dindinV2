import './styles.scss';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/images/logo.svg';
import { Outlet, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUser, userLogout } from '../../features/User/userSlice';
import { ToastContainer } from 'react-toastify';

export default function Layout() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <Container fluid className="h-100 p-0">
      <Navbar bg="light" className="layout-header w-100">
        <Container fluid className="navbar-content">
          <Navbar.Brand
            as={Link}
            to={user.data.accessToken ? '/transactions' : '/'}
          >
            <img alt="app logo" src={logo} />
            DinDin
          </Navbar.Brand>
          <Nav>
            {!user.data.accessToken ? (
              <>
                <Nav.Link as={Link} to="signIn">
                  Sign In
                </Nav.Link>
                <Nav.Link as={Link} to="signUp">
                  Sign Up
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/" onClick={() => dispatch(userLogout())}>
                Logout
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
