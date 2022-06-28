import { IResponse } from "./api"

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
export interface FilterData{
  filterValue:string
  isActive:boolean
}
export interface TransactionFilters{
  categories?:string[]
  minValue?:number
  maxValue?:number
  weekday?:string[]
}

export type TransactionResponse = IResponse<TransactionDocument[]>
