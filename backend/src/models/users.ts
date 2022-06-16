import {Request} from 'express'

export interface IUserSignUp {
    firstname:string,
    lastname:string,
    email:string,
    password:string
  }

  export interface IUserLogin {
    email:string,
    password:string
  }
  
