import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isUserSignedInState } from '../../../../commons/globalState/index';

// 통합된 토큰 유효성 검사 API (로컬 + 카카오)
const VALIDATE_TOKEN = gql`
  query validateToken($token: String!) {
    validateToken(token: $token)
  }
`;

export default function useTokenValidityCheck() {
  const [validateToken, { data, error }] = useLazyQuery(VALIDATE_TOKEN);
  const [, setIsUserSignedIn] = useRecoilState(isUserSignedInState);
  const [isCheckingToken, setIsCheckingToken] = useState(false);
  const [retryCount, setRetryCount] = useState(0); // 일시적인 네트워크 오류시 재시도 카운트
  const MAX_RETRIES = 2; // 최대 재시도 횟수 설정
  const router = useRouter();

  // 재시도 로직을 처리하는 함수 (정상실행 확인)
  const handleRetry = () => {
    if (retryCount < MAX_RETRIES) {
      const newRetryCount = retryCount + 1;
      localStorage.setItem(
        `재시도 ${newRetryCount}회 발생 ${new Date().getSeconds()}`,
        `재시도 ${newRetryCount}회 발생`,
      );

      // 상태 업데이트 후 재시도
      setRetryCount(newRetryCount);
    } else {
      // 최대 재시도 횟수를 넘은 경우 토큰 삭제 및 로그아웃
      localStorage.setItem(
        `최대 재시도 횟수 초과 ${new Date().getSeconds()}`,
        '최대 재시도 횟수 초과: 토큰 제거 및 로그아웃',
      );
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      setIsUserSignedIn(false);
      window.location.reload();
    }
  };

  // 토큰 검증을 수행하는 함수
  const TokenValidityCheck = async () => {
    if (typeof window !== 'undefined') {
      const userToken = localStorage.getItem('userToken');

      // 이미 토큰을 확인 중이거나 중복 호출을 방지
      if (isCheckingToken || !userToken) return;

      setIsCheckingToken(true);

      try {
        // useLazyQuery로 토큰 검증 호출
        validateToken({ variables: { token: userToken } });
      } catch (err) {
        localStorage.setItem(
          '네트워크 오류 발생',
          '네트워크 오류가 발생했습니다',
        );

        if (err.networkError || err.graphQLErrors) {
          // 재시도 로직 제어: retryCount에 따라 동작
          handleRetry();
        } else {
          localStorage.setItem('기타 오류', String(err));
          setIsUserSignedIn(false);
        }
      } finally {
        setIsCheckingToken(false); // 검증 완료 후 상태 해제
      }
    }
  };

  // data가 변경될 때마다 처리하는 useEffect
  useEffect(() => {
    if (data) {
      const tokenCheckResult = data.validateToken;

      // 1: 로컬 유저, 2: 카카오 유저, 10: 유효하지 않은 토큰
      if (tokenCheckResult === 1 || tokenCheckResult === 2) {
        // 토큰이 유효하면 로그인 상태 유지 및 재시도 횟수 초기화
        setIsUserSignedIn(true);
        setRetryCount(0); // 재시도 횟수 초기화
      } else {
        // 토큰이 유효하지 않으면 로그아웃 처리
        localStorage.setItem('1번 오류(정상오류)', '1');
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        setIsUserSignedIn(false);
        window.location.reload();
      }
    }
  }, [data]); // data가 업데이트될 때 실행

  // error가 발생할 때 처리하는 useEffect
  useEffect(() => {
    if (error) {
      // 에러가 발생하면 재시도 로직 실행
      handleRetry();
    }
  }, [error]);

  // retryCount가 0일 때 최초 API 호출, 이후에는 재시도만 실행
  useEffect(() => {
    if (retryCount === 0) {
      TokenValidityCheck(); // 최초 실행 시 호출
    }

    if (retryCount > 0 && retryCount <= MAX_RETRIES) {
      // 재시도 로직 (API 호출하지 않고 상태만 업데이트)
      setTimeout(() => {
        handleRetry();
      }, 200); // 0.2초 지연 후 재시도 호출
    }

    // 라우트 변경 완료 이벤트 감지
    router.events.on('routeChangeComplete', TokenValidityCheck);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      router.events.off('routeChangeComplete', TokenValidityCheck);
    };
  }, [retryCount, validateToken, setIsUserSignedIn, router.events]);

  return null;
}
