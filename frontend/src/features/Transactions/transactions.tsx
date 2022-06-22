import './styles.scss';
import { Row, Col } from 'react-bootstrap';
import TransactionList from './TransactionList';
import ResumeTransactions from './ResumeTransactions';

export default function Transactions() {
  return (
    <>
      <Row className="home-container">
        <Col>
          <Row>
            <Col>Filter</Col>
          </Row>
          <Row>
            <Col>
              <TransactionList />
            </Col>
          </Row>
        </Col>
        <Col className="resume-col" md={12} lg={4} xl={4} xxl={3}>
          <ResumeTransactions />
        </Col>
      </Row>
    </>
  );
}
