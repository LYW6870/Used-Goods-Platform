import { gql } from '@apollo/client';

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput)
  }
`;

export const UPDATE_BOARD = gql`
  mutation updateBoard(
    $boardId: Int!
    $userId: Int!
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      userId: $userId
      updateBoardInput: $updateBoardInput
    ) {
      id
    }
  }
`;
