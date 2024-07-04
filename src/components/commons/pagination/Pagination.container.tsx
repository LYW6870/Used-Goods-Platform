import { useState } from 'react';
import type { MouseEvent } from 'react';
import PaginationUI from './Pagination.presenter';
import type { IPaginationProps } from './Pagination.types';

export default function Pagination({
  count,
  refetch,
}: IPaginationProps): JSX.Element {
  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);
  const lastPage = Math.ceil((count ?? 10) / 10);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    const page = Number(event.currentTarget.id);
    setActivedPage(Number(event.currentTarget.id));
    refetch({ page });
  };

  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    setActivedPage(startPage - 10);
    refetch({ page: startPage - 10 });
  };

  const onClickNextPage = (): void => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      setActivedPage(startPage + 10);
      refetch({ page: startPage + 10 });
    }
  };

  return (
    <PaginationUI
      startPage={startPage}
      lastPage={lastPage}
      activedPage={activedPage}
      onClickPage={onClickPage}
      onClickPrevPage={onClickPrevPage}
      onClickNextPage={onClickNextPage}
    />
  );
}
