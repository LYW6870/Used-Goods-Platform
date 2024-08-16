import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isUserSignedInState } from '../../../../commons/globalState/index';

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
  const [isUserSignedIn, setIsUserSignedIn] =
    useRecoilState(isUserSignedInState);

  const router = useRouter(); //

  console.log(
    '임시 / 순서체크 / 토큰 유효성체크 / 원하는 순서 1번 / isUserSignedIn값: ',
    isUserSignedIn,
  );

  useEffect(() => {
    const TokenValidityCheck = async () => {
      if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('accessToken');

        // Access Token이 없으면, 통과하지 못한다.
        if (!accessToken) {
          return;
        }

        // Access Token 유효성 검사
        try {
          const response = await kakaoTokenCheck({
            variables: { accessToken },
          });

          // 유효하지 않으면 Local Storage에서 엑세스토큰과 유저 데이터 제거
          if (response.data.kakaoTokenCheck === false) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userData');
            setIsUserSignedIn(false);
            window.location.reload();
          }

          // Access Token이 존재하고, 유효한 토큰일경우
          setIsUserSignedIn(true);
        } catch (error) {
          Modal.error({ content: '토큰 검증 오류' });
        }
      }
    };

    // Local Storage가 업데이트 된 이후에 다시 한번 실행하기.
    // 라우트 변경 완료 이벤트 감지
    router.events.on('routeChangeComplete', TokenValidityCheck);

    TokenValidityCheck();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      router.events.off('routeChangeComplete', TokenValidityCheck);
    };
  }, [kakaoTokenCheck, isUserSignedIn, router.events]);
}
