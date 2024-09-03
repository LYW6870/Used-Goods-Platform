import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1600px;
  margin: 100px;
  padding: 100px;
  border: none;
  box-shadow: 0px 0px 10px gray;
  background-color: #fff;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 25px;
  border: 1px solid #ece8e8;
  border-radius: 8px;
`;

export const ChatHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

export const ChatRoomTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

export const ChatMessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

export const IsRead = styled.label`
  font-size: 12px;
  color: gray;
`;

export const ChatMessage = styled.div<{
  isOwnMessage: boolean;
  isRead: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isOwnMessage }) =>
    isOwnMessage ? 'flex-end' : 'flex-start'};
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${({ isOwnMessage }) =>
    isOwnMessage ? '#FEE500' : '#e4a879'};
  border-radius: 10px;
  max-width: 80%;
  align-self: ${({ isOwnMessage }) =>
    isOwnMessage ? 'flex-end' : 'flex-start'};

  position: relative;

  // 읽음 여부를 내 메시지에만 표시
  ${({ isOwnMessage, isRead }) =>
    isOwnMessage &&
    isRead &&
    `
    margin-bottom: 25px; // 이전 메시지와의 간격 수정
    &::before {
      content: '✔ 읽힘';
      font-size: 12px;
      color: #35cc35;
      position: absolute;
      top: -20px; // 메시지 위에 위치시키기
      left: 5px;
    }
  `}
`;

export const MessageSender = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const MessageContent = styled.p`
  margin: 0;
`;

export const MessageDate = styled.span`
  font-size: 12px;
  color: gray;
  margin-top: 5px;
`;

export const MessageInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 5px;
  border-top: 1px solid #ccc;
`;

export const MessageInput = styled.input`
  width: 87%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const SendButton = styled.button`
  width: 10%;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const LeaveButton = styled.button`
  width: 15%;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #e03b4b;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c52837;
  }
`;
