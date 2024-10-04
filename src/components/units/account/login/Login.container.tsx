import { useRouter } from 'next/router';
import { useState } from 'react';
import { Modal } from 'antd';
import { useMutation } from '@apollo/client';
import { LOGIN_LOCAL_USER } from './Login.queries';
import LoginUI from './Login.presenter';
import {
  IMutation,
  IMutationLoginLocalUserArgs,
} from '../../../../commons/types/generated/types';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    id: '',
    password: '',
  });

  const [loginLocalUser] = useMutation<
    Pick<IMutation, 'loginLocalUser'>,
    IMutationLoginLocalUserArgs
  >(LOGIN_LOCAL_USER);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (formData.password.length < 6) {
      setErrors({
        ...errors,
        password: '비밀번호는 최소 6자 이상이어야 합니다.',
      });
      return;
    }

    // 로그인 요청
    try {
      const result = await loginLocalUser({
        variables: {
          ...formData,
        },
      });

      if (result.errors || result.data.loginLocalUser === null) {
        Modal.error({ content: '로그인중 문제가 발생하였습니다.' });
        return;
      }

      if (result.data.loginLocalUser === '로그인 실패') {
        Modal.error({ content: '아이디나 비밀번호가 올바르지 않습니다.' });
        return;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('userToken', result.data.loginLocalUser);
      }

      router.push('/boards'); // 임시로 메인페이지로 지정
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({ content: error.message });
      }
    }
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && formData.id && formData.password) {
      handleSubmit();
    }
  };

  const onClickSignUp = () => {
    router.push('/auth/signUp');
  };

  const onClickKakaoLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;
    router.push(kakaoAuthUrl);
  };

  return (
    <LoginUI
      formData={formData}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleEnterPress={handleEnterPress}
      onClickSignUp={onClickSignUp}
      onClickKakaoLogin={onClickKakaoLogin}
    />
  );
}
