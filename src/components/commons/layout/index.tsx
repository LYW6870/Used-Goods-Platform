import LayoutFooter from './footer';
import LayoutHeader from './header/LayoutHeader.container';
import LayoutNavigation from './navigation';

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: ILayoutProps): JSX.Element {
  return (
    <>
      <LayoutHeader />
      <LayoutNavigation />
      <div>{children}</div>
      <LayoutFooter />
    </>
  );
}
