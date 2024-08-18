import { IUserData } from '../../../../commons/types/generated/types';

export interface ILayoutHeaderUIProps {
  isUserSignedIn: boolean;
  UserData?: IUserData | null;
  onClickLogout: () => void;
  onClickUserInfo: () => void;
  onClickLogin: () => void;
}
