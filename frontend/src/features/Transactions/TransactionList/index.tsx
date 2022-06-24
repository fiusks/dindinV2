import './styles.scss';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectTransactions, transactionsList } from '../transactionsSlice';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { TransactionDocument } from '../../../types/transactions';
import { dateFormat, weekdayFormat } from '../../../helpers/stringFormat';
import DeleteModal from '../DeleteTransactionModal';

export default function TransactionList() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);

  useEffect(() => {
    dispatch(transactionsList());
  }, []);
  return (
    <Table hover borderless responsive>
      <thead>
        <tr>
          <th className="tHide">Data</th>
          <th className="tHide">Dia da Semana</th>
          <th>Descrição</th>
          <th className="tHide">Categoria</th>
          <th>Valor</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.data.map((transaction: TransactionDocument) => (
          <tr key={transaction.id}>
            <td className="table-date tHide">{dateFormat(transaction.date)}</td>
            <td className="tHide">{weekdayFormat(transaction.date)}</td>
            <td>{transaction.description}</td>
            <td className="tHide">{transaction.category}</td>
            <td className={`${transaction.type}`}>{`R$  ${Number(
              transaction.amount
            ).toFixed(2)}`}</td>
            <td className="table-action-buttons">
              {/* <EditTransaction id={transaction.id!} /> */}
              <DeleteModal id={Number(transaction.id!)} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
