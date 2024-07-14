import { useAuth } from '../../src/components/commons/hooks/customs/useAuth';
import useTokenValidityCheck from '../../src/components/commons/hooks/customs/useTokenValidityCheck';
import BoardList from '../../src/components/units/boards/list/BoardList.container';

export default function BoardsPage() {
  useTokenValidityCheck();
  useAuth();
  return <BoardList />;
}
