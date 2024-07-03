import { IQuery } from '../../../../commons/types/generated/types';

export interface IBoardListUIProps {
  data?: Pick<IQuery, 'fetchBoards'>;
}
