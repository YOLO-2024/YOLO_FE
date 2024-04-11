import { atom } from 'recoil';

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: '',
});

export const refreshTokenState = atom({
  key: 'refreshTokenState',
  default: '',
});
