import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useRecoilState } from 'recoil';
import { isUserSignedInState } from '../../../../commons/globalState/index';
import useTokenValidityCheck from '../../hooks/customs/useTokenValidityCheck';
import useStoreUserData from '../../hooks/customs/useStoreUserData';
import LayoutHeaderUI from './LayoutHeader.presenter';
import {
  IMutation,
  IMutationKakaoLogoutArgs,
  IUserData,
} from '../../../../commons/types/generated/types';
import { KAKAO_LOGOUT } from './LayoutHeader.queries';

// LayoutHeader에 알림을 넣을까? 새로운 채팅존재알림이라든지.. 근데 기능 추가 구현해야할듯.

export default function LayoutHeader(): JSX.Element {
  useTokenValidityCheck(); // 엑세스 토큰 있으면 유효성 확인, 없으면 무동작
  const UserData: IUserData | null = useStoreUserData(); // 이제 리턴타입 체크하고 변수 이름 정하기,

  // 로그인 상태
  const [isUserSignedIn, setIsUserSignedIn] =
    useRecoilState(isUserSignedInState);
  const router = useRouter();

  let userToken;

  if (
    typeof window !== 'undefined' &&
    UserData === null &&
    isUserSignedIn === true
  ) {
    Modal.error({ content: '유저 정보 로딩 에러 발생' });
  }

  const [kakaoLogout] = useMutation<
    Pick<IMutation, 'kakaoLogout'>,
    IMutationKakaoLogoutArgs
  >(KAKAO_LOGOUT);

  const onClickLogin = () => {
    router.push('/auth/login');
  };

  const onClickLogout = async () => {
    // 토큰 가져오기
    if (typeof window !== 'undefined') {
      userToken = localStorage.getItem('userToken');
      if (userToken === null) {
        Modal.error({ content: '유저 정보 로딩 에러 발생' });
        window.location.reload(); // 새로고침
      }
    }

    // 로그아웃 API 실행
    try {
      await kakaoLogout({
        variables: {
          accessToken: userToken,
          id: UserData?.id,
        },
      });

      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      setIsUserSignedIn(false);

      Modal.success({ content: '로그아웃이 완료되었습니다.' });
      window.location.reload(); // 새로고침
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  const onClickUserInfo = () => {
    router.push('/user/userInfo');
  };

  return (
    <>
      <LayoutHeaderUI
        isUserSignedIn={isUserSignedIn}
        UserData={UserData}
        onClickLogout={onClickLogout}
        onClickUserInfo={onClickUserInfo}
        onClickLogin={onClickLogin}
      />
    </>
  );
}
