import knexInstance from "../config/db.config";
import { TransactionDocument, TransactionRequestHandler,ITransactionID } from "../models/transactions";
import dayjs from "dayjs";
import { getErrorMessage } from "../utils/handleErrors";




export const listAllTransactions:TransactionRequestHandler = async (req, res)=> {
  try {
    const {id:user_id} = req.user!

    if(!user_id){
     throw new Error('Operação não autorizada')
    }

    // otimizar o knex para obter os valores do DB já divido por 100
    const transactions:TransactionDocument[] = await knexInstance("transactions").where('user_id',user_id)

    transactions.map((transaction)=>{
     transaction.date=dayjs(transaction.date).format('YYYY-MM-DD').toString()
     transaction.amount =(transaction.amount/100)
    })
    const categories= transactions.map((transaction)=>transaction.category)

    return res.status(200).json({data:{transactions,categories}});

  } catch (error) {

    return res.status(404).json({error:getErrorMessage(error)})
  }
}

export const createTransaction:TransactionRequestHandler = async (req, res)=> {

  try {
    const {date,description,amount,category,type} = req.body
    const {id:user_id} =req.user!

    const newTransaction = {
      user_id,
      date:new Date(date),
      description,
      amount:Number(amount)*100,
      category,
      type,
    }

    const [{id:transactionId}] = await knexInstance("transactions").insert(newTransaction).returning('id') as [ITransactionID]

    return res.status(201).json({data:{
      id:transactionId
    }});

  } catch (error) {
    return res.status(404).json({error:getErrorMessage(error)})
  }
}

export const deleteTransaction:TransactionRequestHandler = async (req, res)=> {

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

export const updateTransaction:TransactionRequestHandler = async (req, res)=> {
  try {
    const { id } = req.params;

    const {date,description,amount,category,type} = req.body as TransactionDocument

    const newTransactionData = {
      date,
      description,
      amount:Number(amount)*100,
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
