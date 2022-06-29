import '../styles.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { UserRegistrationResponse, IUserData } from '../../../types/users';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IUserData>({
    resolver: yupResolver(userRegistrationSchema),
  });
  const fetchSignUp = async (
    payload: IUserData
  ): Promise<UserRegistrationResponse> => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/auth/signup`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );
    const result: UserRegistrationResponse = await response.json();
    return result;
  };

  const onSubmit = (data: IUserData) => {
    const { confirmPassword, ...payload } = data;
    fetchSignUp(payload).then((response) => {
      if (response.error) {
        setError('email', { message: response.error });
      } else {
        navigate('/signin');
        toast.success('Novo usuário cadastrado');
      }
    });
  };

  return (
    <>
      <div className="user-form-container signup">
        <h2>Novo usuário</h2>
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
      </div>
    </>
  );
}
