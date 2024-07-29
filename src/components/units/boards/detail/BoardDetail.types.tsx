import { IQuery } from '../../../../commons/types/generated/types';

export interface IBoardDetailUIProps {
  data?: Pick<IQuery, 'fetchBoard'>;
  isUserPermission: boolean;
  onClickDelete: () => void;
  onClickUpdate: () => void;
  onClickCompleteBoard: () => void;
}
