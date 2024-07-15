import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useMoveToPage } from '../../../../src/components/commons/hooks/customs/useMoveToPage';

// 1. 사용자가 로그인을 완료하여 인가 코드를 받음

// 2. 받은 인가 코드를 백엔드 서버로 보내기
// 백엔드 서버는 인가 코드를 사용해서 토큰을 받아야함.
// 토큰을 받아서 가입유저인지 확인하고
// 가입안되있으면 가입절차 밟고
// 가입되어있으면 로그인  + 여기서 토큰만료시간이나 재발급 관련은 나중에 생각하기.
const KAKAO_LOGIN = gql`
  mutation kakaoLogin($code: String!) {
    kakaoLogin(code: $code) {
      # 여러과정을거쳐 반환.. 어떤값들을 반환받을까..
      id
      name
      socialAccount {
        accessToken
      }
    }
  }
`;

export default function KakaoCallback() {
  const router = useRouter();
  const { onClickMoveToPage, visitedPage } = useMoveToPage();
  const { code } = router.query;
  const [login, { data, loading, error }] = useMutation(KAKAO_LOGIN);

  useEffect(() => {
    if (code) {
      login({ variables: { code } });
    }
  }, [code]);

  useEffect(() => {
    if (data) {
      // 로그인 후 처리
      localStorage.setItem(
        'accessToken',
        data.kakaoLogin.socialAccount.accessToken,
      );
      if (visitedPage) {
        onClickMoveToPage(visitedPage); // 미작동
      } else {
        onClickMoveToPage('/boards'); // 미작동
      }
      window.history.go(-2); // 다른걸로 대체하기
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return null;
}
