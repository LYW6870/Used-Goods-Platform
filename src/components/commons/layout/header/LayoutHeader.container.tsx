import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { useEffect, useRef, useState } from 'react';
import { isUserSignedInState } from '../../../../commons/globalState/index';
import useTokenValidityCheck from '../../hooks/customs/useTokenValidityCheck';
import useStoreUserData from '../../hooks/customs/useStoreUserData';
import LayoutHeaderUI from './LayoutHeader.presenter';
import { IUserData } from '../../../../commons/types/generated/types';

export default function LayoutHeader(): JSX.Element {
  useTokenValidityCheck(); // 엑세스 토큰 있으면 유효성 확인, 없으면 무동작
  const UserData: IUserData | null = useStoreUserData(); // 이제 리턴타입 체크하고 변수 이름 정하기,
  // const UserData = useRef<IUserData | null>(useStoreUserData());

  // useStoreUserData 시연할만한거: 유저 데이터 지우고 새로고침하면 유저 데이터 다시 채워지는데 토큰지우고 새로고침하면 유저데이터까지 지워짐
  // useStoreUserData()를 실행해서 받아온 데이터가 정상적인지(그냥 return이 실행되어 널값등을 받지는 않았는지 체크)
  // 예를들어 로그인하고 내 정보 보기를 했을 때 위에서 받아온 정보를 토대로 하는게 아니라
  // 내 토큰을 보내고 해당 토큰에 해당하는 유저 정보를 받아오기. (조작 가능성 있으니까)
  // header가 아닌 본 페이지에서는 로그인이나 접속 가능한 페이지인지 권한체크

  // 로그인 상태
  const [isUserSignedIn, setIsUserSignedIn] =
    useRecoilState(isUserSignedInState);
  const router = useRouter();

  const onClickLogin = () => {
    router.push('/auth/login');
  };

  const onClickLogout = () => {
    Modal.confirm({
      content: '로그아웃버튼 클릭',
    });
    console.log('테스트: ', UserData);
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
