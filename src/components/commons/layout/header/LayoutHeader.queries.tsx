import { gql } from '@apollo/client';

export const KAKAO_LOGOUT = gql`
  mutation kakaoLogout($accessToken: String!, $id: Int!) {
    kakaoLogout(accessToken: $accessToken, id: $id)
  }
`;
