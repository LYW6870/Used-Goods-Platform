import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import PaginationUI from './Pagination.presenter';
import type { IPaginationProps } from './Pagination.types';

export default function Pagination({
  count,
  refetch,
  category,
  setPage,
  searchTerm,
  checkComplete,
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
  }, [category, searchTerm, count, checkComplete]);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    const page = Number(event.currentTarget.id);
    setActivedPage(page);
    setPage(page);
    refetch({ page, category, checkComplete, searchTerm });
  };

  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    const page = startPage - pagesToShow;
    setStartPage(page);
    setActivedPage(page);
    setPage(page);
    refetch({
      page,
      category,
      checkComplete,
      searchTerm,
    });
  };

  const onClickNextPage = (): void => {
    const page = startPage + pagesToShow;
    if (page <= lastPage) {
      setStartPage(page);
      setActivedPage(page);
      setPage(page);
      refetch({
        page,
        category,
        checkComplete,
        searchTerm,
      });
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
