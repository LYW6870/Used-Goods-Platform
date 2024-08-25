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
  mutation deleteBoard($boardId: Int!, $userId: Int!) {
    deleteBoard(boardId: $boardId, userId: $userId)
    # {boolean} 반환값?
  }
`;

export const UPDATE_IS_COMPLETE = gql`
  mutation updateIsComplete($boardId: Int!, $userId: Int!) {
    updateIsComplete(boardId: $boardId, userId: $userId)
  }
`;
