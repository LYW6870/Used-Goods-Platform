import { getDate } from '../../../../commons/libraries/utils/utils';
import * as S from './BoardDetail.styles';
import { IBoardDetailUIProps } from './BoardDetail.types';

export default function BoardDetailUI({
  data,
  isUserPermission,
  onClickDelete,
  onClickUpdate,
  onClickCompleteBoard,
}: IBoardDetailUIProps) {
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <S.Wrapper>
      <S.BodyContainer>
        <S.FieldContainer>
          <S.Text1>{data?.fetchBoard.category}</S.Text1>
          <S.Text1>{getDate(data?.fetchBoard.createdAt)}</S.Text1>
        </S.FieldContainer>
        <S.TitleContainer>
          <S.Text2>
            {data?.fetchBoard.isComplete ? '거래완료' : '거래중'}
          </S.Text2>
          <S.Text1>{data?.fetchBoard.title}</S.Text1>
        </S.TitleContainer>
        <S.FieldContainer>
          <S.Text1>{data?.fetchBoard.price}</S.Text1>
          <S.Text1>{data?.fetchBoard.userName}</S.Text1>
        </S.FieldContainer>
        <S.FieldContainer>
          <S.Text1>{`${data?.fetchBoard.address} ${data?.fetchBoard.addressDetail}`}</S.Text1>
        </S.FieldContainer>
        <S.ContextContainer>
          <S.ContextHtml
            dangerouslySetInnerHTML={{ __html: data?.fetchBoard.contents }}
          />
        </S.ContextContainer>
        <S.ButtonContainer>
          {isUserPermission ? (
            <S.Button onClick={onClickCompleteBoard}>거래 완료</S.Button>
          ) : null}
          {isUserPermission ? (
            <S.Button onClick={onClickUpdate}>게시글 수정</S.Button>
          ) : null}
          {isUserPermission ? (
            <S.Button onClick={onClickDelete}>게시글 삭제</S.Button>
          ) : null}
          <S.Button>채팅하기</S.Button>
        </S.ButtonContainer>
      </S.BodyContainer>
    </S.Wrapper>
  );
}
