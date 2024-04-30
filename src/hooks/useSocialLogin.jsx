import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/customAxios';

export const useSocialLogin = ({ socialType }) => {
  const navigate = useNavigate();
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');

  useEffect(() => {
    const params = new URL(document.URL).searchParams;
    const code = params.get('code');
    const state = params.get('state');

    if (code !== null) {
      api
        .post(`/api/v1/auth/${socialType}`, {
          authorizationCode: code,
          ...(socialType === 'naver' && { state: state }), // 네이버의 경우 state를 추가
        })
        .then((response) => {
          // accessToken과 refreshToken을 sessionStorage에 저장
          const { accessToken, refreshToken } = response.data.data.token;
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);

          // 프로필 정보 확인
          return api.get('/api/v1/member/profile', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        })
        .then((profileResponse) => {
          console.log('프로필 정보:', profileResponse.data);
          // 프로필에 닉네임, 위치, 관심사가 모두 있으면 바로 메인페이지로
          if (
            profileResponse.data.data.profileInfo.nickname &&
            profileResponse.data.data.profileInfo.location &&
            profileResponse.data.data.profileInfo.interestList
          ) {
            navigate('/main-page');
          } else {
            navigate('/addinfo');
          }
        })
        .catch((error) => {
          console.error('로그인 실패 또는 프로필 정보 로드 실패:', error);
          navigate('/addinfo'); // 에러 발생 시, 추가 정보 입력 페이지로 리다이렉트
        });
    }
  }, [socialType, navigate]); // setAccessToken, setRefreshToken은 실제로 사용되지 않으므로 제거

  return null;
};

/*
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/customAxios';
import { accessTokenState, refreshTokenState } from '../state/AuthState';
import { useSetRecoilState } from 'recoil';

export const useSocialLogin = ({ socialType }) => {
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation(
    ({ code, state }) =>
      api.post(`/api/v1/auth/${socialType}`, {
        authorizationCode: code,
        ...(socialType === 'naver' && { state: state }),
      }),
    {
      onSuccess: (response) => {
        const { accessToken, refreshToken } = response.data.data.token;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        // 프로필 정보 불러오기
        queryClient
          .fetchQuery('profile', () =>
            api.get('/api/v1/member/profile', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }),
          )
          .then((profileResponse) => {
            console.log('프로필 정보:', profileResponse.data);
            // 프로필에 필요한 정보가 있으면 메인 페이지로
            if (
              profileResponse.data.data.profileInfo.nickname &&
              profileResponse.data.data.profileInfo.location &&
              profileResponse.data.data.profileInfo.interestList
            ) {
              navigate('/main-page');
            } else {
              navigate('/addinfo');
            }
          })
          .catch((error) => {
            console.error('프로필 정보 로드 실패:', error);
            navigate('/addinfo');
          });
      },
      onError: (error) => {
        console.error('로그인 실패:', error);
        navigate('/addinfo');
      },
    },
  );

  useEffect(() => {
    const params = new URL(document.URL).searchParams;
    const code = params.get('code');
    const state = params.get('state');

    if (code !== null) {
      loginMutation.mutate({ code, state });
    }
  }, [socialType]);

  return null;
};

*/
