export interface TransactionDocument {
  id: number;
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

export type ITransactionID = Pick<TransactionDocument, 'id'>;

export type TransactionResponseMessage =
  | 'Transação deletada com sucesso'
  | 'Transação atualizada com sucesso';

export interface TransactionListResponse {
  transactions: TransactionDocument[];
  categories: string[];
}
