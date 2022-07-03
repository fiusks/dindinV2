import knexInstance from "../config/db.config";
import { TransactionDocument } from "../models/transactions";
import { getErrorMessage } from "../utils/handleErrors";
import {TransactionFilters,FilterResponse}from "../models/filters"


export const listFilteredTransactions:FilterResponse = async (req,res)=>{
  try {
    const {id:user_id} = req.user!

    const {categories,minValue,maxValue,weekday} = req.body as TransactionFilters

    await knexInstance('transactions').where('user_id',user_id).modify(function(querybuilder){
      if(minValue){
        querybuilder.andWhere('amount','>=',Number(minValue*100))
      }
      if(maxValue){
        querybuilder.andWhere('amount','<=',Number(maxValue*100))
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
      const categories = result.map((transaction)=>transaction.category)
      result.forEach((transaction)=>{
        transaction.amount=transaction.amount/100
      })
      return res.status(200).json({data:{
        transactions:result,
        categories
      }});
    })

  } catch (error) {
    return res.status(404).json({error:getErrorMessage(error)})
  }
}
