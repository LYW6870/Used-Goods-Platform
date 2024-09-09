import { IQuery } from '../../../../commons/types/generated/types';

export interface IBoardDetailUIProps {
  data?: Pick<IQuery, 'fetchBoard'>;
  userPermission: number;
  onClickDelete: () => void;
  onClickUpdate: () => void;
  onClickCompleteBoard: () => void;
  onClickCreateChatRoom: () => void;
}
