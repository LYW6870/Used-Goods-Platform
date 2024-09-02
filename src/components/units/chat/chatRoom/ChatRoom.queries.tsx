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
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage(
    $chatRoomId: Int!
    $message: String!
    $accessToken: String!
  ) {
    sendMessage(
      chatRoomId: $chatRoomId
      message: $message
      accessToken: $accessToken
    )
  }
`;

export const MARK_MESSAGES_AS_READ = gql`
  mutation markMessagesAsRead($chatRoomId: Int!, $accessToken: String!) {
    markMessagesAsRead(chatRoomId: $chatRoomId, accessToken: $accessToken)
  }
`;
