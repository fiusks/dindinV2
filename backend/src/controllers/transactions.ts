import knexInstance from "../config/db.config";
import { RequestHandler } from "express";
import { TransactionDocument, TransactionResponse } from "../models/transactions";
import dayjs from "dayjs";
import { getErrorMessage } from "../utils/handleErrors";
import { IResponse } from "../models/api";



export const listAllTransactions:RequestHandler = async (req, res)=> {
  try {
    const {id:user_id} = req.user!

    if(!user_id){
     throw new Error('Operação não autorizada')
    }

    const transactions:TransactionDocument[] = await knexInstance("transactions").where('user_id',user_id)
    transactions.map((transaction)=>{
     transaction.date=dayjs(transaction.date).format('YYYY-MM-DD').toString()
    })

    return res.status(200).json({data:transactions});

  } catch (error) {

    return res.status(404).json({error:getErrorMessage(error)})
  }
}

export const createTransaction:RequestHandler = async (req, res)=> {

  interface ITransactionID{
    id:number
  }

  type ResponseAddTransaction = IResponse<ITransactionID>

  try {
    const {date,description,amount,category,type} = req.body as TransactionDocument
    const {id:user_id} =req.user!

    const newTransaction = {
      user_id,
      date:new Date(date),
      description,
      amount:amount,
      category,
      type,
    }

    const [{id:transactionId}] = await knexInstance("transactions").insert(newTransaction).returning('id') as [ITransactionID]

    const addTransactionResponse = {data:{id:transactionId}} as ResponseAddTransaction


    return res.status(201).json(addTransactionResponse);

  } catch (error) {
    return res.status(404).json({error:getErrorMessage(error)})
  }
}

export const deleteTransaction:RequestHandler = async (req, res)=> {

  try {

    const {id:user_id} = req.user!
    const { id }= req.params;

    const deletedTransaction = await knexInstance("transactions").delete().where('id',Number(id)).andWhere('user_id',user_id)

    if(!deletedTransaction){
      throw new Error('Transação não existe')
    }

    return res.status(200).json({data:'Transação deletada com sucesso'});
  } catch (error) {
    return res.status(404).json({error:getErrorMessage(error)})
  }
}

export const updateTransaction:RequestHandler = async (req, res)=> {
  try {
    const { id } = req.params;

    const {date,description,amount,category,type} = req.body as TransactionDocument

    const newTransactionData = {
      date,
      description,
      amount,
      category,
      type,
    }

    const updatedTransaction=await knexInstance("transactions").where({id}).update(newTransactionData)

    if(!updatedTransaction){
      throw new Error('Transação não existe')
    }

    return res.status(200).json({data:"Transação atualizada com sucesso"});
  } catch (error) {
    return res.status(400).json({error:getErrorMessage(error)});
  }
}
