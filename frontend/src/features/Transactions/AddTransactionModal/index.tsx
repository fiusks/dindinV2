import './styles.scss';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function AddTransaction() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>Adicionar Transação</Button>
    </>
  );
}
