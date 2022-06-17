import knexInstance from "../config/db.config";
import { RequestHandler } from "express";
import { TransactionDocument } from "../models/transactions";
import dayjs from "dayjs";


export const listAllTransactions:RequestHandler = async (req, res)=> {
  try {
    const id = req.user
    if(id){
      console.log(id)
    }
    const transactions = await knexInstance("transactions") as TransactionDocument[]
    transactions.map((transaction)=>{
     transaction.date=dayjs(transaction.date).format('YYYY-MM-DD').toString()
    })

    return res.status(200).json(transactions);

  } catch (error) {

    return res.status(400).json("deu ruim");
  }
}
