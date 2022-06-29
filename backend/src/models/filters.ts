import { RequestHandler } from 'express';
import {ParamsDictionary} from 'express-serve-static-core'
import { IResponse } from './api';
import {TransactionListResponse} from './transactions'

  export interface TransactionFilters{
    categories?:string[]
    minValue?:number
    maxValue?:number
    weekday?:string[]
  }

  export type FilterResponse = RequestHandler<
  ParamsDictionary,
  IResponse<TransactionListResponse>,
  TransactionFilters>
