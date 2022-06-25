import { IResponse } from './api';

export interface TransactionDocument {
  id?: string;
  date: string;
  weekday?: string;
  description: string;
  amount: string;
  category: string;
  type: 'credit' | 'debit';
}
export type transactionRegistration = Omit<
  TransactionDocument,
  'id' | 'weekday'
>;
export type ReponseTransactions = IResponse<TransactionDocument[]>;
export interface FilterData {
  filterValue: string;
  isActive: boolean;
}
export interface TransactionFilters {
  categories: FilterData[];
  minValue: number;
  maxValue: number;
  weekday: FilterData[];
}
