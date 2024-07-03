import { getDate } from '../../../../commons/libraries/utils/utils';
import * as S from './BoardList.styles';
import { IBoardListUIProps } from './BoardList.types';

export default function BoardListUI({ data }: IBoardListUIProps) {
  return (
    <S.Wrapper>
      <S.Container>
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
          <S.Row key={el._id}>
            <S.ColumnId>{el._id}</S.ColumnId>
            <S.ColumnCategory>{el.category}</S.ColumnCategory>
            <S.ColumnIsComplete>
              {el.isComplete === true ? '거래완료' : '거래중'}
            </S.ColumnIsComplete>
            <S.ColumnSaleType>{el.saleType}</S.ColumnSaleType>
            <S.ColumnTitle id={String(el._id)}>{el.title}</S.ColumnTitle>
            <S.ColumnPrice>{el.price}</S.ColumnPrice>
            <S.ColumnDate>{getDate(el.createdAt)}</S.ColumnDate>
          </S.Row>
        ))}
        <S.TableBottom />
      </S.Container>
    </S.Wrapper>
  );
}