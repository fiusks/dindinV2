import { IResponse } from "./api"
import { RequestHandler } from "express";
import {ParamsDictionary} from 'express-serve-static-core'

export type UserResponseMessage ='Usuário cadastrado com sucesso'


export interface IUserData {
    id?:number,
    firstname:string,
    lastname:string,
    email:string,
    password:string
  }

export type IUserLoginData = Pick<IUserData, 'email' | 'password'>


interface IUserLoginResponseData {
  id: number;
  accessToken: string;
}

export type UserLoginHandler = RequestHandler<
  ParamsDictionary,
  IResponse<IUserLoginResponseData>,
  IUserLoginData>

export type UserRegisterRequestHandler = RequestHandler<ParamsDictionary,
  IResponse<UserResponseMessage>,
  IUserData>
