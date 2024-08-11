import { ChangeEvent, MouseEvent } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from '../../../../commons/types/generated/types';

export interface IBoardListUIProps {
  data?: Pick<IQuery, 'fetchBoards'>;
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined,
  ) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchBoards'>>>;
  category: string;
  searchTerm: string;
  count: number;
  checkComplete: boolean;
  handleChangeCategory: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleChangeComplete: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickWriteButton: () => void;
  onClickSearchButton: () => void;
  onClickBoardItem: (event: MouseEvent<HTMLDivElement>) => void;
  setPage: (event) => void;
}
