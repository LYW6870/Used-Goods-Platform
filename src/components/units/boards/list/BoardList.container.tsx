import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from '../../../../commons/types/generated/types';
import BoardListUI from './BoardList.presenter';
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from './BoardList.queries';

export default function BoardList() {
  const router = useRouter();
  const { data, refetch } = useQuery<
    Pick<IQuery, 'fetchBoards'>,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS, { variables: { page: 1, category: '전체' } });

  const { data: dataBoardsCount } = useQuery<
    Pick<IQuery, 'fetchBoardsCount'>,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT, { variables: { category: '전체' } });

  const onClickMoveToBoardNew = () => {
    router.push('/boards/new');
  };

  const onClickMoveToBoardDetail = (
    event: MouseEvent<HTMLDivElement>,
  ): void => {
    router.push(`/boards/${event.currentTarget.id}`);
  };

  return (
    <>
      <BoardListUI
        data={data}
        refetch={refetch}
        count={dataBoardsCount?.fetchBoardsCount}
        onClickMoveToBoardNew={onClickMoveToBoardNew}
        onClickMoveToBoardDetail={onClickMoveToBoardDetail}
      />
    </>
  );
}
