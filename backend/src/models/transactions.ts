import { IResponse } from "./api"
import { RequestHandler } from "express"
import {ParamsDictionary} from 'express-serve-static-core'

export interface TransactionDocument {
  id?:number,
  user_id?:number,
  date:Date|string,
  weekday?:string,
  description:string,
  amount:number,
  category:string,
  type:"credit"|"debit",
}

export interface TransactionListResponse{
  transactions:TransactionDocument[]
  categories:string[]
}

type TransactionResponseMessage = 'Transação deletada com sucesso'|'Transação atualizada com sucesso'
type TransactionResponse=TransactionResponseMessage|ITransactionID|TransactionListResponse


export type ITransactionID = Pick<TransactionDocument,'id'>

export type TransactionRequestHandler = RequestHandler<
ParamsDictionary,
IResponse<TransactionResponse>,
TransactionDocument>

