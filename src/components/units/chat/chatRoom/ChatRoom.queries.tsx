import { gql } from '@apollo/client';

export const FETCH_MESSAGES = gql`
  query fetchMessages($chatRoomId: Int!, $accessToken: String!) {
    fetchMessages(chatRoomId: $chatRoomId, accessToken: $accessToken) {
      id
      sender {
        id
        name
      }
      content
      createdAt
      isRead
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage(
    $chatRoomId: Int!
    $message: String!
    $accessToken: String!
    $isNotice: Boolean!
  ) {
    sendMessage(
      chatRoomId: $chatRoomId
      message: $message
      accessToken: $accessToken
      isNotice: $isNotice
    )
  }
`;

export const MARK_MESSAGES_AS_READ = gql`
  mutation markMessagesAsRead($chatRoomId: Int!, $accessToken: String!) {
    markMessagesAsRead(chatRoomId: $chatRoomId, accessToken: $accessToken)
  }
`;

export const LEAVE_CHAT_ROOM = gql`
  mutation leaveChatRoom($chatRoomId: Int!, $accessToken: String!) {
    leaveChatRoom(chatRoomId: $chatRoomId, accessToken: $accessToken)
  }
`;

export const FETCH_CHAT_ROOM = gql`
  query fetchChatRoom($chatRoomId: Int!, $accessToken: String!) {
    fetchChatRoom(chatRoomId: $chatRoomId, accessToken: $accessToken) {
      id
      buyer {
        id
        name
      }
      seller {
        id
        name
      }
      buyerLeft
      sellerLeft
    }
  }
`;
