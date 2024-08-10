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
  // searchTerm이나 checkComplete같은것 굳이 props로 Pagination에 전달해야 하나?
  // 일단 한다고 해도 작성 완료한다음에 따로 뺴자.

  const [category, setCategory] = useState('전체');
  const [checkComplete, setCheckComplete] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  let inputTerm = '';
  const [page, setPage] = useState(1);

  const { data, refetch } = useQuery<
    Pick<IQuery, 'fetchBoards'>,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS, { variables: { page, category, checkComplete, searchTerm } });

  useEffect(() => {
    refetch({ page, category, checkComplete, searchTerm });
  }, [category, checkComplete]);

  const { data: dataBoardsCount } = useQuery<
    Pick<IQuery, 'fetchBoardsCount'>,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT, { variables: { category, checkComplete, searchTerm } });

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeComplete = (event) => {
    setCheckComplete(event.target.checked);
  };

  const handleChangeSearch = (event) => {
    inputTerm = event.target.value;
  };

  const onClickSearchButton = () => {
    setSearchTerm(inputTerm);
    refetch({ page, category, checkComplete, searchTerm: inputTerm });
  };

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
        searchTerm={searchTerm}
        checkComplete={checkComplete}
        handleChangeCategory={handleChangeCategory}
        handleChangeComplete={handleChangeComplete}
        handleChangeSearch={handleChangeSearch}
        onClickSearchButton={onClickSearchButton}
        count={dataBoardsCount?.fetchBoardsCount}
        setPage={setPage}
      />
    </>
  );
}
// count={dataBoardsCount?.fetchBoardsCount}
// onClickMoveToBoardNew={onClickMoveToBoardNew}
// onClickMoveToBoardDetail={onClickMoveToBoardDetail}
