import { IQuery } from '../../../../commons/types/generated/types';

export interface IChatRoomUIProps {
  chatMessagesData?: Pick<IQuery, 'fetchMessages'>;
  onChangeMessage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnterPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClickSendMessage: () => void;
  onClickLeaveButton: () => void;
  message?: any;
  myId?: number;
  isChatDisabled?: boolean;
  otherUserName?: string;
}
