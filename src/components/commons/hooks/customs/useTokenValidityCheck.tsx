import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';

const KAKAO_TOKEN_CHECK = gql`
  mutation kakaoTokenCheck($accessToken: String!) {
    kakaoTokenCheck(accessToken: $accessToken)
  }
`;

export default function useTokenValidityCheck() {
  const [kakaoTokenCheck] = useMutation(KAKAO_TOKEN_CHECK);

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
          console.error('토큰 검증 에러 발생', error);
        }
      }
    };

    TokenValidityCheck();
  }, [kakaoTokenCheck]);
}
