import { IUserInfoData } from '../../../../commons/types/generated/types';

export interface IUserInfoProps {
  isEdit: boolean;
}

export interface IUserInfoUIProps {
  userData: IUserInfoData | null;
  isEdit: boolean;
  isToggleModal: boolean;
  formData: UserDataUpdatable;
  onClickMoveToPage: () => void;
  onClickUpdateUserData: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAddressComplete: (data: any) => void;
  onToggleModal: () => void;
}

// UserInfoContainer의 userDataUpdatableFields 와 같이 변경해야 함.
export type UserDataUpdatable = {
  address: string;
  // name: string;
};
