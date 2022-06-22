import knexInstance from "../config/db.config";
import { RequestHandler } from "express";
import { TransactionDocument, TransactionFilters } from "../models/transactions";
import dayjs from "dayjs";
import { getErrorMessage } from "../utils/handleErrors";


export const listFilteredTransactions:RequestHandler = async (req,res)=>{

  try {
    const {categories,minValue,maxValue,weekday} = req.body as TransactionFilters
    const statelessCategories = categories.map((category)=>category.filterValue)

    let filteredList:TransactionDocument[] =[]
    if(categories.length!==0){
      if(minValue && maxValue){
        filteredList = await knexInstance("transactions").whereIn('category',statelessCategories).andWhereBetween('amount',[minValue,maxValue])
      }else if(minValue){
        filteredList = await knexInstance("transactions").whereIn('category',statelessCategories).andWhere('amount',">",minValue)
      }else if(maxValue){
        filteredList = await knexInstance("transactions").whereIn('category',statelessCategories).andWhere('amount',"<",maxValue)
      }else{

        filteredList = await knexInstance("transactions").whereIn('category',statelessCategories)
      }
    }else{
      if(minValue && maxValue){
        filteredList = await knexInstance("transactions").whereBetween('amount',[minValue,maxValue])
      }else if(minValue){
        filteredList = await knexInstance("transactions").where('amount',">",minValue)
      }else if(maxValue){
        filteredList = await knexInstance("transactions").where('amount',"<",maxValue)
      }else{
        filteredList = await knexInstance("transactions")
      }
    }

    if(weekday.length!==0){
      filteredList.map((transaction)=>{
        transaction.weekday = new Date(transaction.date).toLocaleDateString('pt-BR',{weekday:"long"}).replace('-feira',"").toLowerCase()

      })

      filteredList=filteredList.filter((transaction)=>{
        return weekday.find((day)=>day.filterValue?.toLowerCase()===transaction.weekday)
      }
      )}

      filteredList.map((transaction)=>{
        transaction.date=dayjs(transaction.date).format('YYYY-MM-DD').toString()
       })

    return res.status(200).json(filteredList);

  } catch (error) {
    return res.status(404).json({error:getErrorMessage(error)})
  }
}
