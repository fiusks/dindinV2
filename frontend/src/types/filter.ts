import { IResponse } from './api';

export interface IFiltersTransactions {
  filterName: string;
  value?: string;
  state?: boolean;
}
export interface IFiltersUpdate extends IFiltersTransactions {
  filterType: 'weekday' | 'categories' | 'minValue' | 'maxValue';
}
export interface IFilterOptions {
  weekday: IFiltersTransactions[];
  categories: IFiltersTransactions[];
  minValue: IFiltersTransactions[];
  maxValue: IFiltersTransactions[];
}
export type ResponseFilters = IResponse<IFilterOptions>;
