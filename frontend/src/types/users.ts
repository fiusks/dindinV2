import { IResponse } from './api';

//User Registration types
export interface IUserRegistration {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export type UserRegistrationResponse = IResponse<IUserRegistration>;

//User Login Types
export type UserLogin = Pick<IUserRegistration, 'email' | 'password'>;

export interface IUserLoginError {
  error: string;
}
export interface IUserData {
  id: string;
  accessToken: string;
}

export type UserDataResponse = IResponse<IUserData>;
