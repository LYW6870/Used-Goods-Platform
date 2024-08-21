import { IUserInfoUIProps } from './UserInfo.types';
import { getDate } from '../../../../commons/libraries/utils/utils';
import * as S from './UserInfo.styles';

export default function UserInfoUI({
  userData,
  isEdit,
  formData,
  handleInputChange,
  onClickMoveToPage,
  onClickUpdateUserData,
}: IUserInfoUIProps): JSX.Element {
  return (
    <>
      <S.Wrapper>
        <S.BodyContainer>
          <S.Title>{isEdit ? '회원 정보 수정' : '회원 정보'}</S.Title>
          <S.Table>
            <tbody>
              <tr>
                <th>아이디</th>
                <td>{userData.id}</td>
              </tr>
              <tr>
                <th>회원 이름</th>
                <td>{userData.name}</td>
              </tr>
              <tr>
                <th>회원 등급</th>
                <td>{userData.rating}</td>
              </tr>
              <tr>
                <th>주소</th>
                {/* boardWrite처럼 daum post 이용해서 입력받자 상세주소까지는 말고 중간주소까지만 */}
                {isEdit ? (
                  <td>
                    <S.InputEdit
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      maxLength={60}
                      spellCheck={false}
                    />
                  </td>
                ) : (
                  <td>{userData.address}</td>
                )}
              </tr>
              <tr>
                <th>계정 생성일자</th>
                <td>{getDate(userData?.createdAt)}</td>
              </tr>
              {/* <tr>
                <th>테스트데이터</th>
                {isEdit ? (
                  <td>
                    <S.InputEdit
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      maxLength={60}
                      spellCheck={false}
                    />
                  </td>
                ) : (
                  <td>{userData.name}</td>
                )}
              </tr> */}
              {/* 추가적인 항목들을 여기에 포함 */}
            </tbody>
          </S.Table>
          <S.ButtonWrapper>
            {isEdit ? (
              <S.Button onClick={onClickUpdateUserData}>
                {' '}
                정보 수정 완료{' '}
              </S.Button>
            ) : (
              <></>
            )}
            <S.Button onClick={onClickMoveToPage}>
              {isEdit ? '정보 수정 취소' : '회원 정보 수정'}
            </S.Button>
          </S.ButtonWrapper>
        </S.BodyContainer>
      </S.Wrapper>
    </>
  );
}
