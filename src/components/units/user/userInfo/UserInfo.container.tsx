import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import type { Address } from 'react-daum-postcode';
import {
  IMutation,
  IMutationUpdateUserDataArgs,
  IQuery,
  IQueryFetchUserInfoDataArgs,
} from '../../../../commons/types/generated/types';
import { FETCH_USER_INFO_DATA, UPDATE_USER_DATA } from './UserInfo.queries';
import UserInfoUI from './UserInfo.presenter';
import { IUserInfoProps, UserDataUpdatable } from './UserInfo.types';

export default function UserInfo({ isEdit }: IUserInfoProps): JSX.Element {
  // 유저 정보 확인에서, 토큰과 유저id 보내서 토큰이 유효하고, id에 토큰이 있으면 반환 아니면 오류
  // header가 아닌 본 페이지에서는 로그인이나 접속 가능한 페이지인지 권한체크
  const [accessToken, setAccessToken] = useState('');
  const router = useRouter();
  const [isToggleModal, setIsToggleModal] = useState(false);

  const userDataUpdatableFields: UserDataUpdatable = { address: '' }; // .types의 UserDataUpdatable의 필드 변경시 같이 변경
  const [formData, setFormData] = useState({
    ...userDataUpdatableFields,
  });
  const [initialUserData, setInitialUserData] = useState({
    ...userDataUpdatableFields,
  });

  const { data, refetch } = useQuery<
    Pick<IQuery, 'fetchUserInfoData'>,
    IQueryFetchUserInfoDataArgs
  >(FETCH_USER_INFO_DATA, {
    variables: { accessToken },
    skip: !accessToken,
  });

  const [updateUserData] = useMutation<
    Pick<IMutation, 'updateUserData'>,
    IMutationUpdateUserDataArgs
  >(UPDATE_USER_DATA);

  /** 초기화 함수 : 필드 변경시 수동으로 변경해야 하는 것을 자동화 하였음 */
  const autoInitialize = (data2: Pick<IQuery, 'fetchUserInfoData'>) => {
    // userDataUpdatableFields가 변경되면 초기화 할 때의 setFormData와 setInitialUserData 코드를
    // 수동으로 수정해 주어야 했는데 이 과정을 자동화 하였음
    const updatedFields1 = Object.keys(userDataUpdatableFields).reduce(
      (acc, key) => {
        acc[key] = data2.fetchUserInfoData[key] || '';
        return acc;
      },
      {} as typeof userDataUpdatableFields,
    );

    const updatedFields2 = Object.keys(userDataUpdatableFields).reduce(
      (acc, key) => {
        acc[key] = data2.fetchUserInfoData[key] || '';
        return acc;
      },
      {} as typeof userDataUpdatableFields,
    );

    // updatedFields를 한개만 사용하여 두 State를 초기화하면 같은 주소의 객체를 참조하게 되어
    // FormData와 InitialUserData중 하나가 바뀌면 다른 하나도 같이 바뀌게 되기 때문에 2개로 사용해준다<div className=""></div>
    setFormData(updatedFields1);
    setInitialUserData(updatedFields2);
  };

  // userData를 받아와서 formData와 initialUserData 초기화
  useEffect(() => {
    if (data) {
      autoInitialize(data);
    }
  }, [data, refetch]);

  // 리패치를 어따 넣어야 할까

  // localStorage에서 Access Token 가져오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (accessToken === null) {
        Modal.error({ content: '유저 정보 로딩 에러 발생' });
      } else {
        setAccessToken(localStorage.getItem('accessToken'));
      }
    }
  }, []);

  // 각 입력 필드의 값이 변경될 때 호출되는 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /** 두 객체를 비교하여 변경된 키와 값을 포함하는 새로운 객체를 반환,
   * 만약 변경된 필드가 없으면 null을 반환. */
  function getUpdatedFields(
    initialData: UserDataUpdatable,
    updatedData: UserDataUpdatable,
  ): Partial<UserDataUpdatable> | null {
    const updatedFields: Partial<UserDataUpdatable> = {};

    // 모든 키를 순회하며 변경된 필드를 찾습니다.
    for (const key in initialData) {
      if (initialData[key] !== updatedData[key]) {
        updatedFields[key] = updatedData[key];
      }
    }

    // 변경된 필드가 없으면 null 반환
    return Object.keys(updatedFields).length > 0 ? updatedFields : null;
  }

  const onClickMoveToPage = (): void => {
    if (isEdit) {
      // 수정 취소 버튼 클릭시 이동페이지 임시로 boardList페이지로 이동
      router.push('/boards');
    } else if (!isEdit) {
      router.push('/user/userInfoEdit');
    } else {
      // 오류 이걸 useEffect로 처리해야 하나?
      Modal.error({ content: '오류가 발생하였습니다' });
    }
  };

  const onClickUpdateUserData = async (): Promise<void> => {
    // updateUserData API 사용
    // 기존 데이터와 수정입력 데이터 비교 후 변경 사항이 없으면 없다고
    // 변경 사항이 있으면 해당 데이터들만 API로 날리기.
    const updatedUserData = getUpdatedFields(initialUserData, formData);

    if (!updatedUserData) {
      Modal.error({ content: '수정된 항목이 없습니다.' });
    } else {
      // API 호출
      try {
        await updateUserData({
          variables: {
            updateUserDataInput: updatedUserData,
            accessToken,
          },
        });
        Modal.success({ content: '정보 수정이 완료되었습니다.' });
      } catch (error) {
        Modal.error({ content: '유저 정보 수정 오류' });
      }
      refetch({ accessToken });
      router.push('/user/userInfo');
    }
  };

  const onToggleModal = (): void => {
    setIsToggleModal((prev) => !prev);
  };

  //

  const onClickAddressComplete = (addData: Address): void => {
    formData.address = addData.address;

    onToggleModal();
  };

  return (
    <>
      {data && (
        <UserInfoUI
          userData={data.fetchUserInfoData}
          isEdit={isEdit}
          formData={formData}
          onClickMoveToPage={onClickMoveToPage}
          onClickUpdateUserData={onClickUpdateUserData}
          onClickAddressComplete={onClickAddressComplete}
          handleInputChange={handleInputChange}
          onToggleModal={onToggleModal}
          isToggleModal={isToggleModal}
        />
      )}
    </>
  );
}
