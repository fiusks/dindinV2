import { Request } from 'express';

export interface IFiltersTransactions {
  filterValue?: string;
  state?: boolean;
}
export interface IFilterOptions {
  weekday: IFiltersTransactions[];
  categories: IFiltersTransactions[];
  minValue: string;
  maxValue: string;
}

export interface RequestFilter extends Request {
  body: IFilterOptions;
}
