import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

// 이쪽 설정 해줘야 할 듯
const LOGIN_MUTATION = gql`
  mutation Login($code: String!) {
    login(code: $code) {
      id
      name
    }
  }
`;

export default function KakaoCallback() {
  const router = useRouter();
  const { code } = router.query;
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  console.log('랜더링됨');

  useEffect(() => {
    if (code) {
      login({ variables: { code } });
      console.log('code: ', code);
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
