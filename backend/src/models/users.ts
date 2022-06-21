import { IResponse } from "./api"

export interface ISignUp {
    firstname:string,
    lastname:string,
    email:string,
    password:string
  }

export interface ISignIn {
  email:string,
  password:string
}

export interface IUserDB extends ISignUp{
  id:number
}

interface IUserData {
  id: number;
  accessToken: string;
}

export type UserDataResponse = IResponse<IUserData>
