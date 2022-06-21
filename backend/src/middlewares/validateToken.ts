import knexInstance from "../config/db.config";
import { RequestHandler } from "express";
import jwt from 'jsonwebtoken'

interface IAccessToken{
  id:number,
}

export const validateToken:RequestHandler = async(req,res,next)=>{
  const{authorization} = req.headers

  if(!authorization || authorization === "Bearer"){
    return res.status(404).json({erro:"Acesso não autorizado"})
  }

  try {
    const secret = process.env.JWT_SECRET!

    const token = authorization.replace("Bearer ","")

    const {id} =jwt.verify(token,secret) as IAccessToken

    if(!id){
      return res.status(400).json({error:"Acesso não autorizado"})
    }

    const userExist = await knexInstance('users').where({id}).first()

    if(!userExist){
      return res.status(404).json({error:"Usuário não encontrado"});
    }

    req.user ={id}

    next()

  } catch (error) {
    return res.status(404).json({error:"Acesso não autorizado"})

  }
}
