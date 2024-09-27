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
  IMutationUserLogoutArgs,
  IUserData,
} from '../../../../commons/types/generated/types';
import { USER_LOGOUT } from './LayoutHeader.queries';

// LayoutHeader에 알림을 넣을까? 새로운 채팅존재알림이라든지.. 근데 기능 추가 구현해야할듯.

export default function LayoutHeader(): JSX.Element {
  useTokenValidityCheck(); // 엑세스 토큰 있으면 유효성 확인, 없으면 무동작
  const UserData: IUserData | null = useStoreUserData(); // 이제 리턴타입 체크하고 변수 이름 정하기,

  // 로그인 상태
  const [isUserSignedIn, setIsUserSignedIn] =
    useRecoilState(isUserSignedInState);
  const router = useRouter();

  let userToken;

  // 아래 코드 실행 타이밍이 빨라서그런가 정상일때도 실행될때가 있어서 주석처리함.
  // if (
  //   typeof window !== 'undefined' &&
  //   UserData === null &&
  //   isUserSignedIn === true
  // ) {
  //   Modal.error({ content: '유저 정보 로딩 에러 발생' });
  // }

  const [userLogout] = useMutation<
    Pick<IMutation, 'userLogout'>,
    IMutationUserLogoutArgs
  >(USER_LOGOUT);

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
      const response = await userLogout({
        variables: {
          token: userToken,
        },
      });

      const result = response.data.userLogout; // 반환받은 값을 확인

      if (result) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        setIsUserSignedIn(false);

        Modal.success({ content: '로그아웃이 완료되었습니다.' });
      } else {
        Modal.success({ content: '로그아웃 과정에서 오류가 발생하였습니다.' });
      }
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
