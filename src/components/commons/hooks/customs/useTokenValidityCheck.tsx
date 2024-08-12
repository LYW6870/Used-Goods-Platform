import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { Modal } from 'antd';

// 로컬 스토리지에 있는 카카오 Access Token이 유효한지 확인하는 코드
// Access Token이 없으면 아무 동작 하지않고 return 한다.
// Access Token이 유효하지 않은 경우, local Storage에서 제거 후 새로고침

const KAKAO_TOKEN_CHECK = gql`
  mutation kakaoTokenCheck($accessToken: String!) {
    kakaoTokenCheck(accessToken: $accessToken)
  }
`;

export default function useTokenValidityCheck() {
  const [kakaoTokenCheck] = useMutation(KAKAO_TOKEN_CHECK);

  console.log('임시 / 순서체크 / 토큰 유효성체크 / 원하는 순서 1번');

  useEffect(() => {
    const TokenValidityCheck = async () => {
      if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          return;
        }

        try {
          const response = await kakaoTokenCheck({
            variables: { accessToken },
          });

          if (response.data.kakaoTokenCheck === false) {
            localStorage.removeItem('accessToken');
            window.location.reload();
          }
        } catch (error) {
          Modal.error({ content: '토큰 검증 오류' });
        }
      }
    };

    TokenValidityCheck();
  }, [kakaoTokenCheck]);
}
