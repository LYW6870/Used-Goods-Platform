import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useQuery } from '@apollo/client';
import {
  IQuery,
  IQueryFetchUserInfoDataArgs,
} from '../../../../commons/types/generated/types';
import { FETCH_USER_INFO_DATA } from './UserInfo.queries';
import UserInfoUI from './UserInfo.presenter';

export default function UserInfo(): JSX.Element {
  // 유저 정보 확인에서, 토큰과 유저id 보내서 토큰이 유효하고, id에 토큰이 있으면 반환 아니면 오류
  // header가 아닌 본 페이지에서는 로그인이나 접속 가능한 페이지인지 권한체크
  const [accessToken, setAccessToken] = useState('');

  const { data, error } = useQuery<
    Pick<IQuery, 'fetchUserInfoData'>,
    IQueryFetchUserInfoDataArgs
  >(FETCH_USER_INFO_DATA, {
    variables: { accessToken },
    skip: !accessToken,
  });

  useEffect(() => {
    // localStorage에서 Access Token 가져오기
    if (typeof window !== 'undefined') {
      if (accessToken === null) {
        Modal.error({ content: '유저 정보 로딩 에러 발생' });
      } else {
        setAccessToken(localStorage.getItem('accessToken'));
      }
    }
  }, []);

  console.log(data);
  console.log(data?.fetchUserInfoData);

  return (
    // fetchUserInfo API 구현하려고 생각해 보니까 fetchUserData API로도 되잖아..?
    // => 아냐, 간략정보와 상세정보 다르게 해야할듯. 거기다 여기 페이지에서는 수정 기능도 넣어야하고.

    // 현재진행: fetchUserInfo API를 작성하라.
    <>{data && <UserInfoUI userData={data.fetchUserInfoData} />}</>
  );
}
