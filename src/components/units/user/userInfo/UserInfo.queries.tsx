import { gql } from '@apollo/client';

export const FETCH_USER_INFO_DATA = gql`
  query fetchUserInfoData($accessToken: String!) {
    fetchUserInfoData(accessToken: $accessToken) {
      id
      name
      rating
      address
      createdAt
      provider
    }
  }
`;

// export const UPDATE_BOARD = gql`
//   mutation updateBoard(
//     $boardId: Int!
//     $userId: Int!
//     $updateBoardInput: UpdateBoardInput!
//   ) {
//     updateBoard(
//       boardId: $boardId
//       userId: $userId
//       updateBoardInput: $updateBoardInput
//     ) {
//       id
//     }
//   }
// `;
