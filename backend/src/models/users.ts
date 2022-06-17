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

export interface IUser extends ISignUp{
  id:number
}
export interface IAccessToken{
  id:number,
}
