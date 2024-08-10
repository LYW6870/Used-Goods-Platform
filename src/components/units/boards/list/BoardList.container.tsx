import { useQuery } from '@apollo/client';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import { MouseEvent } from 'react';
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from './BoardList.queries';
import BoardListUI from './BoardList.presenter';
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from '../../../../commons/types/generated/types';

export default function BoardList() {
  // const router = useRouter();

  const [category, setCategory] = useState('전체');
  const [checkComplete, setCheckComplete] = useState(false);
  const [page, setPage] = useState(1);

  const { data, refetch } = useQuery<
    Pick<IQuery, 'fetchBoards'>,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS, { variables: { page, category, checkComplete } });

  useEffect(() => {
    refetch({ page, category, checkComplete });
    console.log(page, category, checkComplete);
  }, [category, checkComplete]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const { data: dataBoardsCount } = useQuery<
    Pick<IQuery, 'fetchBoardsCount'>,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT, { variables: { category, checkComplete } });

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeComplete = (event) => {
    setCheckComplete(event.target.checked);
    console.log(event.target.checked);
  };

  // 고민! 페이지네이션에 카테고리와 setPage useState를 전달해주어야 할지 아니면 쿠키에 넣고 불러올지...

  // const onClickMoveToBoardNew = () => {
  //   router.push('/boards/new');
  // };

  // const onClickMoveToBoardDetail = (
  //   event: MouseEvent<HTMLDivElement>,
  // ): void => {
  //   router.push(`/boards/${event.currentTarget.id}`);
  // };

  return (
    <>
      <BoardListUI
        data={data}
        refetch={refetch}
        category={category}
        handleChangeCategory={handleChangeCategory}
        handleChangeComplete={handleChangeComplete}
        count={dataBoardsCount?.fetchBoardsCount}
        setPage={setPage}
      />
    </>
  );
}
// count={dataBoardsCount?.fetchBoardsCount}
// onClickMoveToBoardNew={onClickMoveToBoardNew}
// onClickMoveToBoardDetail={onClickMoveToBoardDetail}
