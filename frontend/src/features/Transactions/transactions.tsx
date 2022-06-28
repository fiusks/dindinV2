import './styles.scss';
import { Row, Col } from 'react-bootstrap';
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
