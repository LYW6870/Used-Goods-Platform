// import { getDate } from '../../../../commons/libraries/utils/utils';
// import Pagination from '../../../commons/pagination/Pagination.container';
import * as S from './BoardList.styles';
import { IBoardListUIProps } from './BoardList.types';

// prettier-ignore
const categoryList = [ '디지털기기', '취미/게임', '생활가전', '가구/인테리어', '의류', '화장품', '도서', '기타' ];

// export default function BoardListUI({
//   data,
//   onClickMoveToBoardDetail,
//   onClickMoveToBoardNew,
//   count,
//   refetch,
// }: IBoardListUIProps) {
export default function BoardListUI({
  category,
  handleChangeCategory,
  handleChangeComplete,
}: IBoardListUIProps) {
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
          {/* 맵으로 뿌리기 */}
          <S.BoardItem>
            <S.BoardImage />
            <S.BoardInfo>
              <S.Label>판매중</S.Label>
              <S.TitleLabel>
                가나다라마바사가나다라마바사가나다라마바사가나다라마바사
              </S.TitleLabel>
              <S.Label>금액: 15000</S.Label>
            </S.BoardInfo>
          </S.BoardItem>
        </S.ListContainer>
        {/* <S.PaginationContainer>
          <Pagination refetch={refetch} count={count} />
        </S.PaginationContainer> */}
      </S.BodyContainer>
    </S.Wrapper>
  );
}

/* <S.TableContainer>
<S.TableTop />
<S.Row>
  <S.ColumnHeaderId>ID</S.ColumnHeaderId>
  <S.ColumnHeaderCategory>카테고리</S.ColumnHeaderCategory>
  <S.ColumnHeaderIsComplete>거래상태</S.ColumnHeaderIsComplete>
  <S.ColumnHeaderSaleType>판매여부</S.ColumnHeaderSaleType>
  <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
  <S.ColumnHeaderPrice>가격</S.ColumnHeaderPrice>
  <S.ColumnHeaderDate>날짜</S.ColumnHeaderDate>
</S.Row>
{data?.fetchBoards.map((el) => (
  <S.Row key={String(el._id)}>
    <S.ColumnId>{el._id}</S.ColumnId>
    <S.ColumnCategory>{el.category}</S.ColumnCategory>
    <S.ColumnIsComplete>
      {el.isComplete === true ? '거래완료' : '거래중'}
    </S.ColumnIsComplete>
    <S.ColumnSaleType>{el.saleType}</S.ColumnSaleType>
    <S.ColumnTitle
      id={String(el._id)}
      onClick={onClickMoveToBoardDetail}
    >
      {el.title}
    </S.ColumnTitle>
    <S.ColumnPrice>{el.price}</S.ColumnPrice>
    <S.ColumnDate>{getDate(el.createdAt)}</S.ColumnDate>
  </S.Row>
))}
<S.TableBottom />
</S.TableContainer> */
