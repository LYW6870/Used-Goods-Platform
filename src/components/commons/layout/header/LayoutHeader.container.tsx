import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isUserSignedInState } from '../../../../commons/globalState/index';
import useTokenValidityCheck from '../../hooks/customs/useTokenValidityCheck';
import useStoreUserData from '../../hooks/customs/useStoreUserData';
import LayoutHeaderUI from './LayoutHeader.presenter';
import { IUserData } from '../../../../commons/types/generated/types';

export default function LayoutHeader(): JSX.Element {
  useTokenValidityCheck(); // 엑세스 토큰 있으면 유효성 확인, 없으면 무동작
  const UserData: IUserData | null = useStoreUserData(); // 이제 리턴타입 체크하고 변수 이름 정하기,

  // 유저 정보 확인에서, 토큰과 유저id 보내서 토큰이 유효하고, id에 토큰이 있으면 반환 아니면 오류
  // header가 아닌 본 페이지에서는 로그인이나 접속 가능한 페이지인지 권한체크

  // 로그인 상태
  const [isUserSignedIn, setIsUserSignedIn] =
    useRecoilState(isUserSignedInState);
  const router = useRouter();

  if (
    typeof window !== 'undefined' &&
    UserData === null &&
    isUserSignedIn === true
  ) {
    Modal.error({ content: '유저 정보 로딩 에러 발생' });
  }

  const onClickLogin = () => {
    router.push('/auth/login');
  };

  const onClickLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    setIsUserSignedIn(false);

    Modal.confirm({
      content: '로그아웃이 완료되었습니다.',
    });
  };

  const onClickUserInfo = () => {
    router.push('/user/UserInfo');
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
