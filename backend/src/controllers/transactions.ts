import knexInstance from "../config/db.config";
import { RequestHandler } from "express";
import { TransactionDocument } from "../models/transactions";
import dayjs from "dayjs";
import { getErrorMessage } from "../utils/handleErrors";


export const listAllTransactions:RequestHandler = async (req, res)=> {
  try {
    const id = req.user?.id

    if(!id){
      console.log('deu merda')
     throw new Error('Operação não autorizada')
    }

    const transactions = await knexInstance("transactions").where('user_id',id) as TransactionDocument[]
    transactions.map((transaction)=>{
     transaction.date=dayjs(transaction.date).format('YYYY-MM-DD').toString()
    })

    return res.status(200).json({data:transactions});

  } catch (error) {

    return res.status(404).json({error:getErrorMessage(error)})
  }
}

export const createTransaction:RequestHandler = async (req, res)=> {
  try {
    const {date,description,amount,category,type} = req.body as TransactionDocument

    const newTransaction = {
      date:new Date(date),
      description,
      amount:amount,
      category,
      type,
    }

    await knexInstance("transactions").insert(newTransaction)

    return res.status(201).json({data:"Transação cadastrada com sucesso"});
  } catch (error) {
    return res.status(404).json({error:getErrorMessage(error)})
  }
}

export const deleteTransaction:RequestHandler = async (req, res)=> {
  try {

    const { id }= req.params;
    const deletedTransaction = await knexInstance("transactions").del().where('id',id)

    if(!deletedTransaction){
      throw new Error('Transação não existe')
    }

    return res.status(200).json({data:"Transação excluída com sucesso"});
  } catch (error) {
    return res.status(404).json({error:getErrorMessage(error)})
  }
}

export const updateTransaction:RequestHandler = async (req, res)=> {
  try {
    const { id } = req.params;

    const {date,description,amount,category,type} = req.body as TransactionDocument

    const updatedTransaction = {
      date:date,
      description,
      amount:amount,
      category,
      type,
    }

    await knexInstance("transactions").where({id}).update(updatedTransaction)


    return res.status(200).json({data:"Transação atualizada com sucesso"});
  } catch (error) {
    console.log(error)
    return res.status(400).json("Falha ao atualizar a transação");
  }
}
