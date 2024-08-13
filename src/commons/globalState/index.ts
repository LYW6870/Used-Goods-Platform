import { atom } from 'recoil';

export const visitedPageState = atom({
  key: 'visitedPageState',
  default: '',
});

export const isUserSignedInState = atom({
  key: 'isUserSignedInState',
  default: false,
});
