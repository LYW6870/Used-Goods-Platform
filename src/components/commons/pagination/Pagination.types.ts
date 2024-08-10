import { ApolloQueryResult } from '@apollo/client';
import { MouseEvent } from 'react';
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from '../../../commons/types/generated/types';

export interface IPaginationProps {
  count?: number;
  refetch: (
    variables: Partial<IQueryFetchBoardsArgs>,
  ) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchBoards'>>>;
  category: string;
  setPage: (event) => void;
}

export interface IPaginationUIProps {
  startPage: number;
  lastPage: number;
  activedPage: number;
  pagesToShow: number;
  onClickPage: (event: MouseEvent<HTMLSpanElement>) => void;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
}
