import { atom } from 'recoil';

// 블로그에서 본 방법 (난수) // 일단 이것까지는 정상적으로 되네.
export const visitedPageState = atom({
  key: `visitedPageState_${Math.random().toString(36).slice(2, 7)}`, // 난수 키 생성
  default: '',
});

// 블로그에서 본 방법 (난수) // 일단 이것까지는 정상적으로 되네.
export const isUserSignedInState = atom({
  key: `isUserSignedInState_${Math.random().toString(36).slice(2, 7)}`, // 난수 키 생성
  default: false,
});

// 기본
// export const isUserSignedInState = atom({
//   key: `isUserSignedInState`,
//   default: false,
// });
