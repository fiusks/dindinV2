import './singUp.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import {
  UserRegistrationResponse,
  IUserRegistration,
} from '../../../types/users';

const userRegistrationSchema = yup
  .object({
    firstname: yup.string().required('O nome é obrigatório'),
    lastname: yup.string().required('O sobrenome é obrigatório'),
    email: yup
      .string()
      .email('Inserir um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password'), null], 'Senhas não conferem'),
  })
  .required();

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IUserRegistration>({
    resolver: yupResolver(userRegistrationSchema),
  });
  const fetchSignUp = async (
    payload: IUserRegistration
  ): Promise<UserRegistrationResponse> => {
    const response = await fetch('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const result: UserRegistrationResponse = await response.json();
    return result;
  };

  const onSubmit = (data: IUserRegistration) => {
    const { confirmPassword, ...payload } = data;
    fetchSignUp(payload).then((response) => {
      if (response.error) {
        setError('email', { message: response.error });
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nome</Form.Label>
        <input
          type="text"
          {...register('firstname')}
          className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
        />
        <Form.Text>{errors.firstname?.message}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Sobrenome</Form.Label>
        <input
          type="text"
          {...register('lastname')}
          className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
        />
        <Form.Text>{errors.lastname?.message}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>E-mail</Form.Label>
        <input
          type="text"
          {...register('email')}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
        />
        <Form.Text>{errors.email?.message}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Senha</Form.Label>
        <input
          type="password"
          {...register('password')}
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
        />
        <Form.Text>{errors.password?.message}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Confirmar Senha</Form.Label>
        <input
          type="password"
          {...register('confirmPassword')}
          className={`form-control ${
            errors.confirmPassword ? 'is-invalid' : ''
          }`}
        />
        <Form.Text>{errors.confirmPassword?.message}</Form.Text>
      </Form.Group>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </div>
    </Form>
  );
}
