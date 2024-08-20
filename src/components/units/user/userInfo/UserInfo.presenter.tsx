import { IUserInfoUIProps } from './UserInfo.types';
import { getDate } from '../../../../commons/libraries/utils/utils';
import * as S from './UserInfo.styles';

export default function UserInfoUI({
  userData,
}: IUserInfoUIProps): JSX.Element {
  return (
    <>
      <S.Wrapper>
        <S.BodyContainer>
          <S.Title>회원 정보</S.Title>
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
                <td>{userData.address}</td>
              </tr>
              <tr>
                <th>계정 생성일자</th>
                <td>{getDate(userData?.createdAt)}</td>
              </tr>
              {/* 추가적인 항목들을 여기에 포함 */}
            </tbody>
          </S.Table>
          <div>
            <S.Button>회원 정보 수정</S.Button>
          </div>
        </S.BodyContainer>
      </S.Wrapper>
    </>
  );
}
