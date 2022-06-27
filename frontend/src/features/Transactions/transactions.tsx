import './styles.scss';
import { Row, Col } from 'react-bootstrap';
import TransactionList from './TransactionList';
import ResumeTransactions from './ResumeTransactions';
import Filter from '../Filter';
import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { transactionsList } from './transactionsSlice';
import { updateCategories } from '../Filter/filtersSlice';
import { ReponseTransactions } from '../../types/transactions';

export default function Transactions() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(transactionsList()).then((res) => {
      const { data: transactions } = res.payload as ReponseTransactions;
      dispatch(updateCategories(transactions));
    });
  }, []);

  return (
    <>
      <Row className="home-container">
        <Col>
          <Row>
            <Col>
              <Filter />
            </Col>
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
