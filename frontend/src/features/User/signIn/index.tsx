import './singIn.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { UserLogin } from '../../../types/users';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectUser, userLogin } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userRegistrationSchema = yup
  .object({
    email: yup
      .string()
      .email('Inserir um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
  })
  .required();

export default function SignUp() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserLogin>({
    resolver: yupResolver(userRegistrationSchema),
  });

  const onSubmit = async (payload: UserLogin) => {
    const resultAction = await dispatch(userLogin(payload));
    if (userLogin.fulfilled.match(resultAction)) {
      toast.success('Usuário logado com sucesso');
      navigate('/transactions');
    } else {
      if (resultAction.payload) {
        const erroMessage = resultAction.payload.error;
        setError('password', { message: erroMessage });
        setError('email', { message: erroMessage });
      }
    }
    console.log(user.data.accessToken, 'access');
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>E-mail</Form.Label>
          <input
            type="text"
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
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
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Registrar
          </button>
        </div>
      </Form>
    </>
  );
}
