import { useQuery } from '@apollo/client';
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from '../../../../commons/types/generated/types';
import BoardListUI from './BoardList.presenter';
import { FETCH_BOARDS } from './BoardList.queries';

export default function BoardList() {
  //   const router = useRouter();
  const { data } = useQuery<Pick<IQuery, 'fetchBoards'>, IQueryFetchBoardsArgs>(
    FETCH_BOARDS,
    { variables: { page: 2, category: '전체' } },
  );
  return (
    <>
      <BoardListUI data={data} />
    </>
  );
}
