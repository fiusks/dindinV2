import knexInstance from "../config/db.config";
import { RequestHandler } from "express";
import { TransactionDocument, TransactionFilters, TransactionResponse } from "../models/transactions";
import { getErrorMessage } from "../utils/handleErrors";


export const listFilteredTransactions:RequestHandler = async (req,res)=>{
  try {
    const {categories,minValue,maxValue,weekday} = req.body as TransactionFilters

    await knexInstance('transactions').modify(function(querybuilder){
      if(minValue){
        querybuilder.andWhere('amount','>=',Number(minValue))
      }
      if(maxValue){
        querybuilder.andWhere('amount','<=',Number(maxValue))
      }
      if(categories){
        querybuilder.whereIn('category',categories)
      }
      if(weekday){
        const days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta',"Sábado"]
        let query=''
        weekday.forEach((day)=>{
          const index = days.indexOf(day)
          if(index!==-1){
            query=query+" "+index
          }
      })
      query = query.trim().replace(" ",",")
        querybuilder.andWhereRaw(` extract(dow from date + interval '3 hours') in (${query})`)
      }

    }).then(function(result:TransactionDocument[]){
      const filteredList = {data:result} as TransactionResponse
      return res.status(200).json(filteredList);
    })

  } catch (error) {
    return res.status(404).json({error:getErrorMessage(error)})
  }
}
