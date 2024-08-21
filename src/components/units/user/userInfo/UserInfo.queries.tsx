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

export const UPDATE_USER_DATA = gql`
  mutation updateUserData(
    $updateUserDataInput: UpdateUserDataInput!
    $accessToken: String!
  ) {
    updateUserData(
      updateUserDataInput: $updateUserDataInput
      accessToken: $accessToken
    )
  }
`;
