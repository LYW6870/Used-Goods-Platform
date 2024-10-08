import { gql } from '@apollo/client';

export const USER_LOGOUT = gql`
  mutation userLogout($token: String!) {
    userLogout(token: $token)
  }
`;
