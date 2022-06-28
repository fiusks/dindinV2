import { IResponse } from './api';

export type days =
  | 'Segunda'
  | 'Terça'
  | 'Quarta'
  | 'Quinta'
  | 'Sexta'
  | 'Sábado'
  | 'Domingo';

export interface IFilterOptions {
  categories: string[];
  activeFilters: IActiveFilters;
}

export interface IActiveFilters {
  weekday?: string[];
  categories?: string[];
  minValue?: string;
  maxValue?: string;
}

export type ResponseFilters = IResponse<IFilterOptions>;
