import { IUserInfoUIProps } from './UserInfo.types';

export default function UserInfoUI({
  userData,
}: IUserInfoUIProps): JSX.Element {
  return (
    <>
      <div>UserInfoPage</div>
      <div>{userData?.name}</div>
    </>
  );
}
