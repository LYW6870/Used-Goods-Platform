import { gql } from '@apollo/client';

export const CHECK_ID_DUPLICATION = gql`
  query checkIdDuplication($localUserId: String!) {
    checkIdDuplication(localUserId: $localUserId)
  }
`;

export const CREATE_LOCAL_USER = gql`
  mutation createLocalUser($createUserInput: CreateUserInput!) {
    createLocalUser(createUserInput: $createUserInput)
  }
`;
