import { IQuery } from '../../../../commons/types/generated/types';

export interface IChatRoomListUIProps {
  chatRoomListData?: Pick<IQuery, 'fetchChatRooms'>;
  onClickChatRoom: (event: React.MouseEvent<HTMLDivElement>) => void;
}
