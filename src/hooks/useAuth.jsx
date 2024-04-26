import Apis, { initializeInterceptors } from '../apis/axios';
import { useSetRecoilState } from 'recoil';
import { tokenState } from '../utils/recoilState';

const useAuth = () => {
  const setToken = useSetRecoilState(tokenState);
  // 인터셉터 초기화
  initializeInterceptors(setToken);
};

export default useAuth;
