// import { useAuth } from '../../src/components/commons/hooks/customs/useAuth';
import BoardList from '../../src/components/units/boards/list/BoardList.container';

export default function BoardsPage() {
  // useAuth(); // 이것은 각 페이지(section)마다 넣는게 좋다
  return <BoardList />;
}
