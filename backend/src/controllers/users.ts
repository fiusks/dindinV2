import knexInstance from "../config/db.config";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getErrorMessage } from "../utils/handleErrors";
import { UserLoginHandler,UserRegisterRequestHandler,IUserData } from "../models/users";

export const signUp:UserRegisterRequestHandler =async (req,res) => {
  try{
        const{firstname,lastname,email,password}=req.body

        const userExist = await knexInstance('users').where({email}).first() as IUserData

        if(userExist){
          throw new Error("E-mail já cadastrado")
        }
        const encryptedPassword = await bcrypt.hash(password,10)

        const newUser = {
            firstname,lastname,email,password:encryptedPassword
        }

        await knexInstance('users').insert(newUser)

        return res.status(200).json({data:"Usuário cadastrado com sucesso"})
    }catch(e){
      return res.status(404).json({error:getErrorMessage(e)})

    }
}

export const signIn:UserLoginHandler = async(req,res)=>{
  const {email,password} = req.body
  const secret = process.env.JWT_SECRET!
  console.log('entrei')
  try {
    const user = await knexInstance("users").where({email}).first() as IUserData

    if(!user){
      throw new Error("E-mail e/ou senha inválidos")
    }

    const validatePassword = await bcrypt.compare(password,user.password)

    if(!validatePassword){
      throw new Error("E-mail e/ou senha inválidos")
    }

    const token = jwt.sign({id:user.id},secret,{expiresIn:"1d"})

    return res.status(200).json({data:{
      accessToken:token,
      id:user.id!
    }})

  } catch (error) {
    return res.status(404).json({error:getErrorMessage(error)})

  }
}
