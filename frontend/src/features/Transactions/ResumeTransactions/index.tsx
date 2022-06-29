import './styles.scss';
import { Row } from 'react-bootstrap';
import { useAppSelector } from '../../../app/hooks';
import { selectTransactions } from '../transactionsSlice';
import AddTransaction from '../AddTransactionModal';

export default function ResumeTransactions() {
  const transactions = useAppSelector(selectTransactions);
  const resumeTransaction = () => {
    const income = transactions.data.reduce(
      (acc, transaction) =>
        transaction.type === 'credit' ? acc + Number(transaction.amount) : acc,
      0
    );
    const outcome = Math.abs(
      transactions.data.reduce(
        (acc, transaction) =>
          transaction.type === 'debit' ? acc + Number(transaction.amount) : acc,
        0
      )
    );
    const balance = Number(income) - Number(outcome);
    return { income, outcome, balance };
  };
  const { income, outcome, balance } = resumeTransaction();
  return (
    <div className="resume-component">
      <div className="resume-container">
        <h3>Resumo</h3>
        <Row>
          <div className="resume-data-row">
            <h4>Entradas</h4>
            <h4 className="credit">{`R$ ${income.toFixed(2)}`}</h4>
          </div>
        </Row>
        <Row>
          <div className="resume-data-row">
            <h4>Saídas</h4>
            <h4 className="debit">{`R$ ${outcome.toFixed(2)}`}</h4>
          </div>
        </Row>
        <Row className="balance-row">
          <div className="resume-data-row">
            <h4 className="balance">Saldo</h4>
            <h4 className="balance-value">{`R$ ${balance.toFixed(2)}`}</h4>
          </div>
        </Row>
      </div>
      <AddTransaction />
    </div>
  );
}
