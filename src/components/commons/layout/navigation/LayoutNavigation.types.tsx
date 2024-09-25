export interface INavigationItem {
  name: string;
  path: string;
  roles?: string[]; // user rating
}

export interface ILayoutNavigationUIProps {
  visibleItems: INavigationItem[];
  onClickNavigation: (path: string) => void;
}
