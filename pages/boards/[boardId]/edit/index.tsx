import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import BoardWrite from '../../../../src/components/units/boards/write/BoardWrite.container';
import {
  IQuery,
  IQueryFetchBoardArgs,
} from '../../../../src/commons/types/generated/types';

const FETCH_BOARD = gql`
  query fetchBoard($boardId: Int!) {
    fetchBoard(boardId: $boardId) {
      id
      userId
      isComplete
      category
      price
      address
      addressDetail
      title
      contents
      images
    }
  }
`;

export default function BoardEditPage() {
  const router = useRouter();
  const skipQuery = !router || typeof router.query.boardId !== 'string';

  const { data } = useQuery<Pick<IQuery, 'fetchBoard'>, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: { boardId: Number(router.query.boardId) },
      skip: skipQuery,
    },
  );

  return <BoardWrite isEdit data={data} />;
}
