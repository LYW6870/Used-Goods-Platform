import { useRecoilState } from 'recoil';
import { gql, useQuery } from '@apollo/client';
import { isUserSignedInState } from '../../../../commons/globalState/index';
import {
  IQuery,
  IQueryFetchUserDataArgs,
  IUserData,
} from '../../../../commons/types/generated/types';

const FETCH_USER_DATA = gql`
  query fetchUserData($token: String!) {
    fetchUserData(token: $token) {
      id
      name
      rating
      provider
    }
  }
`;

// 유저 정보 가져오는 Custom Hook
export default function useStoreUserData(): IUserData | null {
  // eslint-disable-next-line
  const [isUserSignedIn, setIsUserSignedIn] =
    useRecoilState(isUserSignedInState);
  let returnUserData = null;
  let token;

  // 토큰 얻기
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('userToken');
  }

  // 유저 정보 불러오기
  const { data: queryData } = useQuery<
    Pick<IQuery, 'fetchUserData'>,
    IQueryFetchUserDataArgs
  >(FETCH_USER_DATA, {
    variables: { token },
  });

  // 로그인이 되어있지 않거나 엑세스 토큰이 없으면
  if (!isUserSignedIn || !token) {
    return returnUserData;
  }

  if (typeof window !== 'undefined') {
    // 저장되어 있는 유저 정보가 없으면 불러온 유저 정보 local Storage에 저장
    if (!localStorage.getItem('userData')) {
      token = localStorage.getItem('userToken');

      // 백엔드로 부터 가져온 유저 데이터가 비어있지 않으면
      if (queryData !== undefined && queryData !== null) {
        const userData = JSON.stringify(queryData?.fetchUserData);

        localStorage.setItem('userData', userData);
      } else {
        // window.location.reload();
      }
    }

    // 유저데이터 가져오기
    const storedUserData = localStorage.getItem('userData');

    // 가져온 유저데이터를 다시 객체로 변환하여 저장
    if (storedUserData) {
      returnUserData = JSON.parse(storedUserData);
    }
  }
  return returnUserData;
}
