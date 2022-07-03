import './styles.scss';
import { Row, Col } from 'react-bootstrap';
export default function Home() {
  return (
    <Row className="h-100">
      <Col className="home-text">
        <h1>Controle as suas finanças em um só lugar!</h1>
        <div className="contact-info">
          <p>Essa aplicação foi desenvolvida por Rafael Barros</p>
          <div className="logos">
            <a href="https://www.linkedin.com/in/rafabarros1/" target="_blank">
              <img
                alt=""
                src="https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white"
              />
            </a>

            <a href="https://github.com/fiusks/dindinV2" target="_blank">
              <img
                alt=""
                src="https://img.shields.io/badge/-GitHub-black?style=flat-square&logo=Github&logoColor=white"
              />
            </a>
          </div>
        </div>
      </Col>
    </Row>
  );
}
