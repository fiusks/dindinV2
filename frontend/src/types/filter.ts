import { IResponse } from './api';

type day =
  | 'Segunda'
  | 'Terça'
  | 'Quarta'
  | 'Quinta'
  | 'Sexta'
  | 'Sábado'
  | 'Domingo';

export interface IFiltersTransactions {
  [filterName: string]: boolean;
}

export interface IFilters {
  weekday: string[];
  categories: string[];
  minValue: string;
  maxValue: string;
}
export interface IActiveFilters {
  weekday: false | string[];
  categories: false | string[];
  minValue: string;
  maxValue: string;
}
// export interface IFiltersUpdate extends IFiltersTransactions {
//   filterType: 'weekday' | 'categories' | 'minValue' | 'maxValue';
// }
export type teste = {
  weekday: { [k: string]: string }[];
  categories: { [k: string]: string }[];
  minValue: string;
  maxValue: string;
};
export interface IFilterOptions {
  weekday: IFiltersTransactions;
  categories: IFiltersTransactions;
  minValue: string;
  maxValue: string;
}
export type ResponseFilters = IResponse<IFilterOptions>;
