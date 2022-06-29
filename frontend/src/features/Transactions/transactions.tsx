import './styles.scss';
import { Row, Col, Container } from 'react-bootstrap';
import TransactionList from './TransactionList';
import ResumeTransactions from './ResumeTransactions';
import Filter from '../Filter';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { transactionsList } from './transactionsSlice';
import {
  listFilteredTransactions,
  selectFilters,
} from '../Filter/filtersSlice';

export default function Transactions() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  useEffect(() => {
    if (!Object.keys(filters.activeFilters).length) {
      dispatch(transactionsList());
    } else {
      dispatch(listFilteredTransactions());
    }
  }, [filters.activeFilters]);

  return (
    <Container fluid>
      <Row className="transactions-component-container">
        <Col sm={12} md={12} lg={4} xl={3} xxl={3}>
          <ResumeTransactions />
        </Col>
        <Col>
          <Col>
            <Filter />
          </Col>
          <Col>
            <TransactionList />
          </Col>
        </Col>
      </Row>
    </Container>
  );
}
