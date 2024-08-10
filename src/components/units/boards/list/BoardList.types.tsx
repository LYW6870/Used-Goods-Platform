import { ApolloQueryResult } from '@apollo/client';
// import { MouseEvent } from 'react';
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from '../../../../commons/types/generated/types';

export interface IBoardListUIProps {
  data?: Pick<IQuery, 'fetchBoards'>;
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined,
  ) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchBoards'>>>;
  // count?: number;
  // onClickMoveToBoardNew: () => void;
  // onClickMoveToBoardDetail: (event: MouseEvent<HTMLDivElement>) => void;
  category: string;
  searchTerm: string;
  count: number;
  checkComplete: boolean;
  handleChangeCategory: (event) => void;
  handleChangeComplete: (event) => void;
  handleChangeSearch: (event) => void;
  onClickSearchButton: () => void;
  setPage: (event) => void;
}
