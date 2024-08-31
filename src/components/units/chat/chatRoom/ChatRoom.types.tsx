import { IQuery } from '../../../../commons/types/generated/types';

export interface IChatRoomUIProps {
  //   chatRoomListData?: Pick<IQuery, 'fetchChatRooms'>;
  //   onClickChatRoom: (event: React.MouseEvent<HTMLDivElement>) => void;
  chatMessagesData?: Pick<IQuery, 'fetchMessages'>;
  onChangeMessage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSendMessage: () => void;
  message: string;
  myId?: number;
  otherUserName?: string;
}
