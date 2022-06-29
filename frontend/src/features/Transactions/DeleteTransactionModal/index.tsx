import './styles.scss';
import deleteIcon from '../../../assets/images/deleteIcon.svg';
import arrowUp from '../../../assets/images/arrowUp.svg';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { deleteTransactionById } from './deleteTransactionReducer';

type Props = {
  id: number;
};
export default function DeleteModal({ id }: Props) {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    dispatch(deleteTransactionById(id));
    handleClose();
  };

  return (
    <div className="delete-modal-icon">
      <img src={deleteIcon} alt="delete Icon" onClick={handleShow} />

      {show && (
        <div className="delete-modal-container">
          <img src={arrowUp} alt="arrow Up" className="arrow-icon" />
          <p>Apagar Item?</p>
          <div className="buttons-container">
            <button onClick={handleSubmit} className="accept-btn">
              Sim
            </button>
            <button onClick={handleClose} className="reject-btn">
              Não
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
