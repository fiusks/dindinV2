export interface TransactionDocument {
  id?:number,
  date:Date|string,
  weekday?:string,
  description:string,
  amount:number,
  category:string,
  type:"credit"|"debit",
}

