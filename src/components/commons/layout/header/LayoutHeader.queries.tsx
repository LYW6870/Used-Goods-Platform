import { gql } from '@apollo/client';

export const LOGOUT_USER = gql`
  mutation logoutUser($accessToken: String!, $id: Int!) {
    logoutUser(accessToken: $accessToken, id: $id)
  }
`;
