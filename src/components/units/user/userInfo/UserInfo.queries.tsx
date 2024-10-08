import { gql } from '@apollo/client';

export const FETCH_USER_INFO_DATA = gql`
  query fetchUserInfoData($token: String!) {
    fetchUserInfoData(token: $token) {
      id
      name
      rating
      address
      createdAt
      provider
    }
  }
`;

export const UPDATE_USER_DATA = gql`
  mutation updateUserData(
    $updateUserDataInput: UpdateUserDataInput!
    $token: String!
  ) {
    updateUserData(updateUserDataInput: $updateUserDataInput, token: $token)
  }
`;
