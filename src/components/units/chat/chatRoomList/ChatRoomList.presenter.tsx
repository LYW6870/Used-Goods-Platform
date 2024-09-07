import { getDate } from '../../../../commons/libraries/utils/utils';
import * as S from './ChatRoomList.styles';
import { IChatRoomListUIProps } from './ChatRoomList.types';

// 나중에 스타일 전체 수정할 때 제목 넘칠경우 처리 추가하기.

export default function ChatRoomListUI({
  chatRoomListData,
  onClickChatRoom,
}: IChatRoomListUIProps): JSX.Element {
  if (!chatRoomListData) {
    return <div>Loading...</div>;
  }
  return (
    <S.Wrapper>
      <S.BodyContainer>
        <S.Title>채팅방 리스트</S.Title>
        <S.ChatListContainer>
          {chatRoomListData.fetchChatRooms.map((el) => (
            <S.ChatRoomContainer
              key={String(el.id)}
              id={String(el.id)}
              onClick={onClickChatRoom}
            >
              <S.ChatRoomHeader>
                <S.ChatRoomHeaderLeft>
                  <S.LabelName>{el.roomName} 님과의 채팅방 </S.LabelName>
                  <S.LabelDate>{getDate(el.lastMessageAt)}</S.LabelDate>
                </S.ChatRoomHeaderLeft>
                <S.UnreadCountContainer>
                  {el.unreadMessageCount}
                </S.UnreadCountContainer>
              </S.ChatRoomHeader>
              <S.ChatRoomBody>
                {el.lastMessage ? (
                  <S.Label>{el.lastMessage}</S.Label>
                ) : (
                  <S.Label>채팅 내역이 존재하지 않습니다.</S.Label>
                )}
              </S.ChatRoomBody>
            </S.ChatRoomContainer>
          ))}
        </S.ChatListContainer>
      </S.BodyContainer>
    </S.Wrapper>
  );
}
