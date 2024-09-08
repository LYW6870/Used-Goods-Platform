import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isUserSignedInState } from '../../../../commons/globalState/index';

// 로컬 스토리지에 있는 카카오 Access Token이 유효한지 확인하는 코드
// Access Token이 없으면 아무 동작 하지않고 return 한다.
// Access Token이 유효하지 않은 경우, local Storage에서 제거 후 새로고침

// const KAKAO_TOKEN_CHECK = gql`
//   mutation kakaoTokenCheck($accessToken: String!) {
//     kakaoTokenCheck(accessToken: $accessToken)
//   }
// `;

// 카카오 엑세스 토큰 유효성 검사 API
const KAKAO_TOKEN_CHECK = gql`
  mutation kakaoTokenCheck($accessToken: String!) {
    kakaoTokenCheck(accessToken: $accessToken) {
      isValid
      userId
      expiresIn
      error
    }
  }
`;

export default function useTokenValidityCheck() {
  const [kakaoTokenCheck] = useMutation(KAKAO_TOKEN_CHECK);
  const [, setIsUserSignedIn] = useRecoilState(isUserSignedInState);
  const [isCheckingToken, setIsCheckingToken] = useState(false); // 검증 중인지 여부를 위한 상태

  const router = useRouter();

  useEffect(() => {
    const TokenValidityCheck = async () => {
      if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('accessToken');

        // 이미 토큰을 확인 중이라면 중복 검사를 막음
        if (isCheckingToken || !accessToken) return;

        setIsCheckingToken(true);

        // Access Token 유효성 검사
        try {
          console.log('일번 단계');
          const response = await kakaoTokenCheck({
            variables: { accessToken },
          });

          console.log('이번 단계', response.data.kakaoTokenCheck);

          const tokenCheckResult = response.data.kakaoTokenCheck;

          if (tokenCheckResult.isValid) {
            // 토큰이 유효하면 로그인 상태 유지
            setIsUserSignedIn(true);
          } else if (tokenCheckResult.error) {
            // 토큰이 유효하지 않으면 에러 메시지 표시 및 토큰 제거
            console.log('토큰 유효하지 않음: 토큰 제거 및 로그아웃 (1)');
            Modal.error({
              content: `토큰이 유효하지 않습니다 (1): ${tokenCheckResult.error}`,
            });

            localStorage.removeItem('accessToken');
            localStorage.removeItem('userData');
            setIsUserSignedIn(false);
            window.location.reload(); // 지우고테스트, 안지우고 테스트 한번씩 해보기
          }
        } catch (error) {
          // 오류 발생 시 토큰 제거 및 로그아웃 처리
          console.log('토큰 유효성 확인 중 오류 발생', error);
          Modal.error({
            content: '토큰 유효성 확인 중 오류가 발생했습니다.',
          });
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userData');
          setIsUserSignedIn(false);
          window.location.reload(); // 페이지 새로고침
        } finally {
          setIsCheckingToken(false); // 검증 완료 후 상태 해제
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
  }, [kakaoTokenCheck, setIsUserSignedIn, router.events]);

  return null;
}
