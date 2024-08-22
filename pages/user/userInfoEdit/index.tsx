import { useAuth } from '../../../src/components/commons/hooks/customs/useAuth';
import UserInfo from '../../../src/components/units/user/userInfo/UserInfo.container';

export default function UserInfoPage() {
  useAuth();
  const isEdit = true;
  return (
    <>
      <UserInfo isEdit={isEdit} />
    </>
  );
}