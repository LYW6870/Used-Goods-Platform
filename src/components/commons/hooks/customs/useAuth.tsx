import { useRouter } from 'next/router';
import { useEffect } from 'react';

// use로  시작하는 애들을 포함한 함수이면 작명시 use를 붙여준다.
export const useAuth = (): void => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('accessToken') === null) {
      alert('로그인후 이용 가능한 페이지입니다.');
      router.push('../../../../../auth/login');
    }
  }, []);
};
