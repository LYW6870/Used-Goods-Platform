import * as S from './LayoutNavigation.styles';
import { ILayoutNavigationUIProps } from './LayoutNavigation.types';

export default function LayoutNavigationUI({
  visibleItems,
  onClickNavigation,
}: ILayoutNavigationUIProps): JSX.Element {
  return (
    <S.Wrapper>
      <S.Body>
        {visibleItems.map((item) => (
          <S.NavItem
            key={item.path}
            onClick={() => onClickNavigation(item.path)}
          >
            {item.name}
          </S.NavItem>
        ))}
      </S.Body>
    </S.Wrapper>
  );
}
