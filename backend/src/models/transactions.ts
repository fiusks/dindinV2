export interface TransactionDocument {
  id?:number,
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
  categories:FilterData[]
  minValue:number
  maxValue:number
  weekday:FilterData[]
}
