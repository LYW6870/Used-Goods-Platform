import { useAuth } from '../../src/components/commons/hooks/customs/useAuth';
import BoardList from '../../src/components/units/boards/list/BoardList.container';

export default function BoardsPage() {
  useAuth();
  return <BoardList />;
}
