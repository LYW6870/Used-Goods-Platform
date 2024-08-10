import { Page } from './Pagination.styles';
import type { IPaginationUIProps } from './Pagination.types';

export default function PaginationUI({
  onClickNextPage,
  onClickPrevPage,
  onClickPage,
  startPage,
  lastPage,
  activedPage,
  pagesToShow,
}: IPaginationUIProps): JSX.Element {
  return (
    <div>
      <Page onClick={onClickPrevPage}>{`<`}</Page>
      {new Array(pagesToShow).fill(1).map(
        (_, index) =>
          startPage + index <= lastPage && (
            <Page
              key={Number(startPage) + Number(index)}
              onClick={onClickPage}
              id={String(startPage + index)}
              isActive={startPage + index === activedPage}
            >
              {startPage + index}
            </Page>
          ),
      )}
      <Page onClick={onClickNextPage}>{`>`}</Page>
    </div>
  );
}
