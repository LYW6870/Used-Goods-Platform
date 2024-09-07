import { useEffect, useRef } from 'react';
import { IChatRoomUIProps } from './ChatRoom.types';
import { getDate } from '../../../../commons/libraries/utils/utils';
import * as S from './ChatRoom.styles';

export default function ChatRoomUI({
  chatMessagesData,
  myId,
  onChangeMessage,
  onClickSendMessage,
  onClickLeaveButton,
  handleEnterPress,
  isChatDisabled,
  message,
  otherUserName,
}: IChatRoomUIProps): JSX.Element {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 메시지가 로드되거나 업데이트될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessagesData]);

  return (
    <S.Wrapper>
      <S.BodyContainer>
        <S.ChatHeader>
          <S.ChatRoomTitle>{otherUserName} 님과의 채팅방</S.ChatRoomTitle>
          <S.LeaveButton onClick={onClickLeaveButton}>
            채팅방 나가기
          </S.LeaveButton>
        </S.ChatHeader>
        <S.ChatMessagesContainer>
          {chatMessagesData?.fetchMessages.map((el) => (
            <S.ChatMessage
              key={el.id}
              senderType={
                el.sender.id === myId ? 1 : el.sender.id === 99999 ? 3 : 2
              }
              isRead={el.isRead}
            >
              <S.MessageSender>
                {el.sender.id === myId ? '나' : el.sender.name}
              </S.MessageSender>
              <S.MessageContent>{el.content}</S.MessageContent>
              <S.MessageDate>{getDate(el.createdAt)}</S.MessageDate>
            </S.ChatMessage>
          ))}
          <div ref={messagesEndRef} />
        </S.ChatMessagesContainer>
        <S.MessageInputContainer>
          <S.MessageInput
            placeholder="메시지를 입력하세요..."
            value={message}
            onChange={onChangeMessage}
            onKeyDown={handleEnterPress}
            disabled={isChatDisabled}
          />
          <S.SendButton onClick={onClickSendMessage} disabled={isChatDisabled}>
            전송
          </S.SendButton>
        </S.MessageInputContainer>
      </S.BodyContainer>
    </S.Wrapper>
  );
}
