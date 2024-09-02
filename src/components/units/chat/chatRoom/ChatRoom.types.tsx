import { IQuery } from '../../../../commons/types/generated/types';

export interface IChatRoomUIProps {
  chatMessagesData?: Pick<IQuery, 'fetchMessages'>;
  onChangeMessage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSendMessage: () => void;
  message?: any;
  myId?: number;
  otherUserName?: string;
}
