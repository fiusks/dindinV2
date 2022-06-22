import './styles.scss';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { transactionRegistration } from '../../../types/transactions';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const transactionSchemaschema = yup
  .object({
    amount: yup
      .number()
      .min(0.01, 'O valor deve ser maior que R$ 0,00')
      .required('O valor da transação é obrigatório'),
    category: yup.string().required('A categoria é obrigatória'),
    date: yup.date().required('A data da transação é obrigatória'),
    description: yup.string().required('Inserir uma descrição'),
  })
  .required();

export default function TransactionModal(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<transactionRegistration>({
    resolver: yupResolver(transactionSchemaschema),
  });
  const { show, setShow } = props;
  const onSubmit = (data: transactionRegistration) => {
    console.log(data);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <h2>{` Registro`}</h2>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Type</Form.Label>
              <input
                type="text"
                {...register('type')}
                className={`form-control ${errors.type ? 'is-invalid' : ''}`}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Valor</Form.Label>
              <input
                type="text"
                {...register('amount')}
                className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
              />
              <Form.Text>{errors.amount?.message}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Categoria</Form.Label>
              <input
                type="text"
                {...register('category')}
                className={`form-control ${
                  errors.category ? 'is-invalid' : ''
                }`}
              />
              <Form.Text>{errors.category?.message}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data</Form.Label>
              <input
                type="password"
                {...register('date')}
                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
              />
              <Form.Text>{errors.date?.message}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descrição</Form.Label>
              <input
                type="password"
                {...register('description')}
                className={`form-control ${
                  errors.description ? 'is-invalid' : ''
                }`}
              />
              <Form.Text>{errors.description?.message}</Form.Text>
            </Form.Group>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
