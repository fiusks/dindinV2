import { IResponse } from "./api"

export interface IUserData {
    id?:number,
    firstname:string,
    lastname:string,
    email:string,
    password:string
  }

export interface IUserLoginData {
  email:string,
  password:string
}


interface IUserLoginResponseData {
  id: number;
  accessToken: string;
}

export type UserLoginResponse = IResponse<IUserLoginResponseData>
export type UserDataResponse = IResponse<IUserData>
