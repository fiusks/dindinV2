import { IResponse } from './api';

//User Registration types
export interface IUserData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
type UserResponseMessage = 'Usuário cadastrado com sucesso';
export type UserRegistrationResponse = IResponse<UserResponseMessage>;

//User Login Types
export type IUserLoginData = Pick<IUserData, 'email' | 'password'>;

export interface IUserLoginError {
  error: string;
}
interface IUserLoginResponseData {
  id: string;
  accessToken: string;
}

export type UserDataResponse = IResponse<IUserLoginResponseData>;
