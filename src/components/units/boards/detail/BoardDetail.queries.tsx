import { gql } from '@apollo/client';

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: Int!) {
    fetchBoard(boardId: $boardId) {
      id
      userId
      category
      isComplete
      userName
      title
      price
      contents
      address
      addressDetail
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: Int!, $token: String!) {
    deleteBoard(boardId: $boardId, token: $token)
  }
`;

export const BOARD_UPDATE_IS_COMPLETE = gql`
  mutation boardUpdateIsComplete($boardId: Int!, $token: String!) {
    boardUpdateIsComplete(boardId: $boardId, token: $token)
  }
`;

export const CREATE_CHAT_ROOM = gql`
  mutation createChatRoom($accessToken: String!, $sellerId: Int!) {
    createChatRoom(accessToken: $accessToken, sellerId: $sellerId)
  }
`;
