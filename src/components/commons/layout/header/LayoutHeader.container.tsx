import { useState } from 'react';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import useTokenValidityCheck from '../../hooks/customs/useTokenValidityCheck';
import LayoutHeaderUI from './LayoutHeader.presenter';

export default function LayoutHeader(): JSX.Element {
  useTokenValidityCheck(); // 엑세스 토큰 있으면 유효성 확인, 없으면 무동작
  // 토큰이 있으면 로그인 후 (내 백엔드 서버에서)정보 가져오고 저장하기 => 정보를 어디에 저장할 것인가 => 임시로 로컬스토리지에 저장하자.
  // 정보를 저장하되, 보안이나 권한이 필요한 경우에는 토큰으로 확인을 한번 더 하기?
  // 예를들어 로그인하고 내 정보 보기를 했을 때 위에서 받아온 정보를 토대로 하는게 아니라
  // 내 토큰을 보내고 해당 토큰에 해당하는 유저 정보를 받아오기. (조작 가능성 있으니까)
  // header가 아닌 본 페이지에서는 로그인이나 접속 가능한 페이지인지 권한체크

  // isUserSignedIn 도 로컬 스토리지에 저장해야 할까? 생각해보자.
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const router = useRouter();

  const onClickLogin = () => {
    Modal.confirm({
      content: '로그인 버튼 클릭',
    });
    router.push('/auth/login');
  };

  const onClickLogout = () => {
    Modal.confirm({
      content: '로그아웃버튼 클릭',
    });
    setIsUserSignedIn(true); // 오류 거슬려서 임시로 넣은 코드
  };

  const onClickUserInfo = () => {
    Modal.confirm({
      content: '유저 정보 클릭',
    });
  };

  return (
    <>
      <LayoutHeaderUI
        isUserSignedIn={isUserSignedIn}
        onClickLogout={onClickLogout}
        onClickUserInfo={onClickUserInfo}
        onClickLogin={onClickLogin}
      />
    </>
  );
}
