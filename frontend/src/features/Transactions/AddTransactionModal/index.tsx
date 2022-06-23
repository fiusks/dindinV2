import './styles.scss';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import TransactionModal from '../TransactionModal';

export default function AddTransaction() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <TransactionModal show={show} setShow={setShow} title="Adicionar" />
      <Button onClick={handleShow}>Adicionar Transação</Button>
    </>
  );
}
