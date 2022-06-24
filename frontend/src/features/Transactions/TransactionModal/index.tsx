import './styles.scss';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { transactionRegistration } from '../../../types/transactions';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
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
    reset,
    formState: { errors },
  } = useForm<transactionRegistration>({
    defaultValues: {
      type: 'credit',
    },
    resolver: yupResolver(transactionSchemaschema),
  });
  const { show, setShow, title } = props;
  const onSubmit = (data: transactionRegistration) => {
    console.log(data);
    reset();
  };
  const onHide = () => {
    setShow(false);
    reset();
  };

  return (
    <>
      <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <h2>{`${title} Registro`}</h2>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="type-button">
              <input
                {...register('type')}
                type="radio"
                name="type"
                id="credit"
                value="credit"
              />
              <label htmlFor="credit" className="credit">
                Entrada
              </label>
              <input
                {...register('type')}
                type="radio"
                id="debit"
                name="type"
                value="debit"
              />
              <label htmlFor="debit" className="debit">
                Saída
              </label>
            </div>
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
                type="date"
                {...register('date')}
                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
              />
              <Form.Text>{errors.date?.message}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descrição</Form.Label>
              <input
                type="text"
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