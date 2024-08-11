import { useEffect } from 'react';
import Pagination from '../../../commons/pagination/Pagination.container';
import * as S from './BoardList.styles';
import { IBoardListUIProps } from './BoardList.types';

// prettier-ignore
const categoryList = [ '전체', '디지털기기', '취미/게임', '생활가전', '가구/인테리어', '의류', '화장품', '도서', '기타' ];

export default function BoardListUI({
  data,
  category,
  handleChangeCategory,
  handleChangeComplete,
  handleChangeSearch,
  onClickSearchButton,
  onClickWriteButton,
  onClickBoardItem,
  searchTerm,
  refetch,
  count,
  checkComplete,
  setPage,
}: IBoardListUIProps) {
  useEffect(() => {}, [data, refetch, searchTerm]);
  return (
    <S.Wrapper>
      <S.BodyContainer>
        <S.FilterContainer>
          <S.Label>카테고리 선택 </S.Label>
          <S.CategorySelect value={category} onChange={handleChangeCategory}>
            {[...categoryList].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </S.CategorySelect>
          <S.Label>거래중인 게시글만 보기</S.Label>
          <S.Checkbox type="checkbox" onChange={handleChangeComplete} />
        </S.FilterContainer>
        <S.ListContainer>
          {data?.fetchBoards.map((el) => (
            <S.BoardItem
              key={String(el.id)}
              id={String(el.id)}
              onClick={onClickBoardItem}
            >
              <S.BoardImage
                src={el.images[0] ? el.images[0] : '/ImageNone.png'}
              />
              <S.BoardInfo>
                <S.Label>{el.isComplete ? '거래완료' : '거래중'}</S.Label>
                <S.TitleLabel>{el.title}</S.TitleLabel>
                <S.Label>금액: {el.price}</S.Label>
              </S.BoardInfo>
            </S.BoardItem>
          ))}
        </S.ListContainer>
        <S.BottomContainer>
          <S.SearchContainer>
            <S.SearchInput
              onChange={handleChangeSearch}
              placeholder="제목에서 검색할 단어를 입력하세요"
            />
            <S.SearchButton onClick={onClickSearchButton}>
              검색
            </S.SearchButton>
          </S.SearchContainer>
          <S.WriteBtnContainer>
            <S.WriteButton onClick={onClickWriteButton}>
              거래글 작성
            </S.WriteButton>
          </S.WriteBtnContainer>
        </S.BottomContainer>
        <S.PaginationContainer>
          <Pagination
            refetch={refetch}
            count={count}
            category={category}
            setPage={setPage}
            searchTerm={searchTerm}
            checkComplete={checkComplete}
          />
        </S.PaginationContainer>
      </S.BodyContainer>
    </S.Wrapper>
  );
}
