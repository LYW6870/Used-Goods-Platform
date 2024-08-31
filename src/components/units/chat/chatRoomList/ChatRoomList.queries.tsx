import { gql } from '@apollo/client';

export const FETCH_CHAT_ROOMS = gql`
  query fetchChatRooms($accessToken: String!) {
    fetchChatRooms(accessToken: $accessToken) {
      id
      buyer {
        id
        name
      }
      seller {
        id
        name
      }
      roomName
      lastMessage
      lastMessageAt
      unreadMessageCount
    }
  }
`;
