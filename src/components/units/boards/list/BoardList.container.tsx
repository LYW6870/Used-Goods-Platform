import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from './BoardList.queries';
import BoardListUI from './BoardList.presenter';
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from '../../../../commons/types/generated/types';
import removeSpecialChars from '../../../../commons/libraries/utils/removeSpecialChars';

export default function BoardList() {
  const router = useRouter();

  const [category, setCategory] = useState('전체');
  const [checkComplete, setCheckComplete] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const inputTerm = useRef<string>('');

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

  const handleChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleChangeComplete = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckComplete(event.target.checked);
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    inputTerm.current = event.target.value;
  };

  const onClickSearchButton = () => {
    const cleanString = removeSpecialChars(inputTerm.current);
    if (cleanString === '') {
      Modal.error({ content: '검색어를 입력해주세요' });
      return;
    }
    setSearchTerm(cleanString);
    refetch({ page, category, checkComplete, searchTerm: cleanString });
  };

  const onClickWriteButton = () => {
    router.push('/boards/new');
  };

  const onClickBoardItem = (event: MouseEvent<HTMLDivElement>): void => {
    router.push(`/boards/${event.currentTarget.id}`);
  };

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
        onClickWriteButton={onClickWriteButton}
        onClickBoardItem={onClickBoardItem}
        count={dataBoardsCount?.fetchBoardsCount}
        setPage={setPage}
      />
    </>
  );
}
