import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

// 1. 사용자가 로그인을 완료하여 인가 코드를 받음

// 2. 받은 인가 코드를 백엔드 서버로 보내기
// 백엔드 서버는 인가 코드를 사용해서 토큰을 받아야함.
// 토큰을 받아서 가입유저인지 확인하고
// 가입안되있으면 가입절차 밟고
// 가입되어있으면 로그인  + 여기서 토큰만료시간이나 재발급 관련은 나중에 생각하기.
const KAKAO_LOGIN = gql`
  mutation KAKAO_LOGIN($code: String!) {
    KAKAO_LOGIN(code: $code) {
      # 여러과정을거쳐 반환.. 어떤값들을 반환받을까..
      id
      name
    }
  }
`;

export default function KakaoCallback() {
  const router = useRouter();
  const { code } = router.query;
  // const [updateBoard] = useMutation<
  //   Pick<IMutation, 'updateBoard'>,
  //   IMutationUpdateBoardArgs
  // >(UPDATE_BOARD);

  // const [login, { data, loading, error }] = useMutation(GET_KAKAO_TOKEN);
  const [login, { data, loading, error }] = useMutation(KAKAO_LOGIN);

  console.log('랜더링됨');

  useEffect(() => {
    if (code) {
      // login({ variables: { code } });
      // console.log('code: ', code);
      const result = login({ variables: { code } });
      console.log('result: ', result);
    }
  }, [code]);

  useEffect(() => {
    if (data) {
      // 로그인 후 처리
      console.log('data: ', data);
      router.push('/');
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return null;
}
