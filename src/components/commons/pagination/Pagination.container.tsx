import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import PaginationUI from './Pagination.presenter';
import type { IPaginationProps } from './Pagination.types';

export default function Pagination({
  count,
  refetch,
  category,
  setPage,
}: IPaginationProps): JSX.Element {
  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);
  const itemsPerPage = 8;
  const pagesToShow = 5;
  const lastPage = Math.ceil((count ?? itemsPerPage) / itemsPerPage);

  useEffect(() => {
    if (activedPage > lastPage) {
      setPage(1);
      setActivedPage(1);
    }
  }, [category]);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    const page = Number(event.currentTarget.id);
    setActivedPage(page);
    setPage(page);
    refetch({ page, category });
  };

  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    setStartPage(startPage - pagesToShow);
    setActivedPage(startPage - pagesToShow);
    refetch({ page: startPage - pagesToShow });
  };

  const onClickNextPage = (): void => {
    if (startPage + pagesToShow <= lastPage) {
      setStartPage(startPage + pagesToShow);
      setActivedPage(startPage + pagesToShow);
      refetch({ page: startPage + pagesToShow });
    }
  };

  return (
    <PaginationUI
      startPage={startPage}
      lastPage={lastPage}
      pagesToShow={pagesToShow}
      activedPage={activedPage}
      onClickPage={onClickPage}
      onClickPrevPage={onClickPrevPage}
      onClickNextPage={onClickNextPage}
    />
  );
}
