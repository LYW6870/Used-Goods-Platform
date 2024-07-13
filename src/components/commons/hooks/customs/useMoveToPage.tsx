import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { visitedPageState } from '../../../../commons/globalState/index';

interface IUseMoveToPageReturn {
  onClickMoveToPage: (path: string) => () => void;
  visitedPage: string;
}

const EXCLUDED_PAGES = ['/auth/kakao/callback', '/auth/login'];

export const useMoveToPage = (): IUseMoveToPageReturn => {
  const router = useRouter();
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);

  const onClickMoveToPage = (path: string) => () => {
    if (!EXCLUDED_PAGES.includes(path)) {
      setVisitedPage(path);
    } // 일부는 저장 제외
    router.push(path);
  };

  return {
    onClickMoveToPage,
    visitedPage,
  };
};
