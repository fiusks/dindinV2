import knexInstance from "../config/db.config";
import { RequestHandler } from "express";
import bcrypt from 'bcrypt'
import { ISignUp,ISignIn, IUser } from "../models/users";
import jwt from 'jsonwebtoken'
import { getErrorMessage } from "../utils/handleErrors";

export const signUp:RequestHandler =async (req,res) => {
  try{
        const{firstname,lastname,email,password}=req.body as ISignUp

        const userExist = await knexInstance('users').where({email}).first()

        if(userExist){
          throw new Error("E-mail já cadastrado")
        }
        const encryptedPassword = await bcrypt.hash(password,10)

        const newUser = {
            firstname,lastname,email,password:encryptedPassword
        }

        await knexInstance('users').insert(newUser)

        return res.status(200).json({data:"New user registered"})
    }catch(e){
      return res.status(404).json({error:getErrorMessage(e)})

    }
}

export const signIn:RequestHandler = async(req,res)=>{
  const {email,password} = req.body as ISignIn
  const secret = process.env.JWT_SECRET!


  try {
    const userExist = await knexInstance("users").where({email}).first() as IUser

    if(!userExist){
      throw new Error("E-mail e/ou senha inválidos")
    }

    const validatePassword = await bcrypt.compare(password,userExist.password)

    if(!validatePassword){
      throw new Error("E-mail e/ou senha inválidos")
    }

    const {id} = userExist

    const token = jwt.sign({id},secret,{expiresIn:"1d"})

    return res.status(200).json({
      accessToken:token,
      id,
    })

  } catch (error) {
    return res.status(404).json({error:getErrorMessage(error)})

  }
}
