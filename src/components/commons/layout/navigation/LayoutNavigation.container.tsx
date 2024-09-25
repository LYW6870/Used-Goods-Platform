import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { isUserSignedInState } from '../../../../commons/globalState/index';
import LayoutNavigationUI from './LayoutNavigation.presenter';
import { INavigationItem } from './LayoutNavigation.types';

const navigationItems: INavigationItem[] = [
  { name: '메인페이지', path: '/boards', roles: ['0', '1', '2'] },
  {
    name: '거래하기',
    path: '/boards',
    roles: ['0', '1', '2'],
  },
  {
    name: '내 채팅방 목록',
    path: '/chat/chatRoomList',
    roles: ['1', '2'],
  },
];

export default function LayoutNavigation(): JSX.Element {
  const router = useRouter();
  const isUserSignedIn = useRecoilValue(isUserSignedInState);
  const [userRole, setUserRole] = useState<string>('0');

  // 표시할 항목 필터링
  const visibleItems = navigationItems.filter((item) => {
    if (item.roles && !item.roles.includes(userRole)) return false;
    return true;
  });

  const onClickNavigation = (path: string) => {
    router.push(path);
  };

  // 로그인 및 유저 등급에 따라 role 설정
  useEffect(() => {
    const ud = JSON.parse(localStorage.getItem('userData'));
    setUserRole(ud?.rating ? String(ud.rating) : '0');
  }, [isUserSignedIn]);

  return (
    <LayoutNavigationUI
      visibleItems={visibleItems}
      onClickNavigation={onClickNavigation}
    />
  );
}
