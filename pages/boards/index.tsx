// import { useAuth } from '../../src/components/commons/hooks/customs/useAuth';
// import useTokenValidityCheck from '../../src/components/commons/hooks/customs/useTokenValidityCheck';
import BoardList from '../../src/components/units/boards/list/BoardList.container';

export default function BoardsPage() {
  // useTokenValidityCheck(); // 레이아웃 헤더에 성공적으로 이식하면 지워도됨
  // useAuth();
  return <BoardList />;
}
