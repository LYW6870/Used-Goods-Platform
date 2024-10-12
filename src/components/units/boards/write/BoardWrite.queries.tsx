import { gql } from '@apollo/client';

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!, $token: String!) {
    createBoard(createBoardInput: $createBoardInput, token: $token)
  }
`;

export const UPDATE_BOARD = gql`
  mutation updateBoard(
    $boardId: Int!
    $token: String!
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      token: $token
      updateBoardInput: $updateBoardInput
    )
  }
`;
