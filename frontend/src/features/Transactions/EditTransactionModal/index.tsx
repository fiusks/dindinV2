import './styles.scss';
import editIcon from '../../../assets/images/editIcon.svg';
import TransactionModal from '../TransactionModal';
import { useState } from 'react';

type Props = {
  id: string;
};

export default function EditTransaction({ id }: Props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <img src={editIcon} alt="edit Icon" onClick={handleShow} />
      {show && (
        <TransactionModal
          show={show}
          setShow={setShow}
          title="Editar"
          id={id}
        />
      )}
    </>
  );
}
