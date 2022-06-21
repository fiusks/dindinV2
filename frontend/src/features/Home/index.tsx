import './styles.scss';
import { Row, Col } from 'react-bootstrap';
export default function Home() {
  return (
    <Row className="h-100">
      <Col className="home-text">
        <h1>Controle as suas finanças em um só lugar!</h1>
      </Col>
    </Row>
  );
}
