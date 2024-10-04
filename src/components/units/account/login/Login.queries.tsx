import { gql } from '@apollo/client';

export const LOGIN_LOCAL_USER = gql`
  mutation loginLocalUser($id: String!, $password: String!) {
    loginLocalUser(id: $id, password: $password)
  }
`;
