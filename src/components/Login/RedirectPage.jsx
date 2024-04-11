import { useSocialLogin } from '../../hooks/useSocialLogin';

export default function RedirectPage() {
  // sessionStorage 또는 다른 메커니즘을 통해 저장된 socialType 가져오기
  const socialType = sessionStorage.getItem('socialType');

  // useSocialLogin 훅 사용
  useSocialLogin({ socialType });

  return <div>로그인 처리 중...</div>;
}
