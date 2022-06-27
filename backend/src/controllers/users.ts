import knexInstance from "../config/db.config";
import { RequestHandler } from "express";
import bcrypt from 'bcrypt'
import { IUserLoginData, IUserData, UserLoginResponse } from "../models/users";
import jwt from 'jsonwebtoken'
import { getErrorMessage } from "../utils/handleErrors";

export const signUp:RequestHandler =async (req,res) => {
  try{
        const{firstname,lastname,email,password}=req.body as IUserData

        const userExist = await knexInstance('users').where({email}).first()

        if(userExist){
          throw new Error("E-mail já cadastrado")
        }
        const encryptedPassword = await bcrypt.hash(password,10)

        const newUser = {
            firstname,lastname,email,password:encryptedPassword
        }

        await knexInstance('users').insert(newUser)

        return res.status(200).json({data:"Cadastro realizado com sucesso"})
    }catch(e){
      return res.status(404).json({error:getErrorMessage(e)})

    }
}

export const signIn:RequestHandler = async(req,res)=>{
  const {email,password} = req.body as IUserLoginData
  const secret = process.env.JWT_SECRET!

  try {
    const {id,password:passwordDB} = await knexInstance("users").where({email}).first() as IUserData

    if(!id){
      throw new Error("E-mail e/ou senha inválidos")
    }

    const validatePassword = await bcrypt.compare(password,passwordDB)

    if(!validatePassword){
      throw new Error("E-mail e/ou senha inválidos")
    }

    const token = jwt.sign({id},secret,{expiresIn:"1d"})

    const loginResponse:UserLoginResponse = {
      data:{
        accessToken:token,
        id
    }}

    return res.status(200).json(loginResponse)

  } catch (error) {
    return res.status(404).json({error:getErrorMessage(error)})

  }
}
